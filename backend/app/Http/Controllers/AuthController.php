<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class AuthController extends Controller
{
    //điểu kiện otpotp
    protected function ensureOtpCanBeSent(string $email)
{
    // Key phân biệt theo ngày
    $today       = Carbon::today()->toDateString(); // "2025-05-07"
    $countKey    = "otp_daily_count_{$email}_{$today}";
    $lastSentKey = "otp_last_sent_{$email}";

    // 1) Khởi tạo bộ đếm nếu chưa có, hết hạn đúng lúc 00:00 ngày mai
    if (! Cache::has($countKey)) {
        Cache::put($countKey, 0, Carbon::now()->endOfDay());
    }

    // 2) Giới hạn 6 OTP/ngày
    $sentToday = Cache::get($countKey);
    if ($sentToday >= 36) {
        throw new HttpResponseException(response()->json([
            'message' => 'Bạn đã gửi OTP quá 6 lần hôm nay.'
        ], 429));
    }

    // 3) Giới hạn 1 OTP mỗi 60s
    if (Cache::has($lastSentKey)) {
        $diff = Carbon::now()->diffInSeconds(Carbon::parse(Cache::get($lastSentKey)));
        if ($diff < 60) {
            throw new HttpResponseException(
                response()->json([
                    'message' => 'Vui lòng chờ ít nhất 1 phút trước khi gửi lại OTP.'
                ], 429)
            );
        }
    }

    // 4) Tăng bộ đếm và lưu timestamp lần này (TTL 60s)
    Cache::increment($countKey);
    Cache::put($lastSentKey, Carbon::now()->toDateTimeString(), now()->addSeconds(60));
}
    //check username
    public function checkUsername(Request $request)
    {
        $request->validate([
            'username' => 'required|alpha_dash|max:30',
        ], [
            'username.required'    => 'Tên người dùng không được bỏ trống.',
            'username.alpha_dash'  => 'Tên người dùng chỉ được chứa chữ cái, số, dấu gạch ngang và dấu gạch dưới.',
            'username.max'         => 'Tên người dùng không được vượt quá 30 ký tự.',
        ]);

        $exists = User::where('username', $request->username)->exists();

        return response()->json([
            'available' => ! $exists,
        ], 200);
    }

    // gửi mã otp khi đăng kýký
    public function sendOTP(Request $request)
    {
        $data = $request->validate([
            'username' => 'required|alpha_dash|max:30|unique:users,username',
            'email'    => 'required|email',
            'name'     => 'required|string|max:255',
            'birth'    => 'required|date',
        ], [
            // Username
            'username.required'    => 'Vui lòng nhập tên người dùng.',
            'username.alpha_dash'  => 'Tên người dùng chỉ được chứa chữ cái, số, gạch ngang và gạch dưới.',
            'username.max'         => 'Tên người dùng không được vượt quá :max ký tự.',
            'username.unique'      => 'Tên người dùng này đã tồn tại.',
        
            // Email
            'email.required'       => 'Vui lòng nhập email.',
            'email.email'          => 'Định dạng email không hợp lệ.',
        
            // Name
            'name.required'        => 'Vui lòng nhập họ và tên.',
            'name.string'          => 'Họ và tên phải là chuỗi ký tự.',
            'name.max'             => 'Họ và tên không được vượt quá :max ký tự.',
        
            // Birth
            'birth.required'       => 'Vui lòng nhập ngày sinh.',
            'birth.date'           => 'Định dạng ngày sinh không hợp lệ.',
        ]);
        

        if (User::where('email', $data['email'])->exists()) {
            return response()->json(['message' => 'Email này đã tồn tại.'], 422);
        }

        // Đảm bảo OTP có thể gửi
        $this->ensureOtpCanBeSent($data['email']);

        // Sinh mã OTP và lưu cache
        $code     = random_int(100000, 999999);
        $cacheKey = 'register_' . $data['email'];
        $cacheKeyOtp = 'otp_' . $data['email'];
        Cache::put($cacheKeyOtp, ['code'  => $code,], now()->addMinutes(2));
        Cache::put($cacheKey, [
            'username'  => $data['username'],
            'name'  => $data['name'],
            'birth' => $data['birth'],
        ], now()->addMinutes(60));

        // Gửi email OTP
        Mail::raw("Mã OTP xác thực đăng ký: $code", function ($message) use ($data) {
            $message->to($data['email'])
                ->subject('OTP Xác Thực Đăng Ký');
        });

        return response()->json(['message' => 'OTP đã được gửi.'], 200);
    }
    //gửi lại mã otpotp
    public function resendCode(Request $request)
    {
        $data = $request->validate(['email' => 'required|email']);

        // // Kiểm tra email từng gửi OTP
        // if (!Cache::has('otp_register_' . $data['email'])) {
        //     return response()->json(['message' => 'Chưa có OTP gửi trước đó.'], 400);
        // }

        // Đảm bảo OTP có thể gửi (1 phút + 6 lần/ngày)
        $this->ensureOtpCanBeSent($data['email']);

        // Sinh mã mới và cập nhật cache
        $code     = random_int(100000, 999999);
        $cacheKeyOtp = 'otp_' . $data['email'];
        Cache::put($cacheKeyOtp, ['code'  => $code,], now()->addMinutes(3));

        // Gửi lại email OTP
        Mail::raw("Mã OTP xác thực đăng ký (gửi lại): $code", function ($message) use ($data) {
            $message->to($data['email'])
                ->subject('OTP Xác Thực Đăng Ký (Resend)');
        });

        return response()->json(['message' => 'OTP đã được gửi lại.'], 200);
    }
    //xác nhận mã đăng ký và tạo tài khoản 
    public function verifyRegister(Request $request)
    {
        // 1) Validate đầu vào
        $data = $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|digits:6',
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email'    => 'Định dạng email không hợp lệ.',
            'otp.required'   => 'Vui lòng nhập mã OTP.',
            'otp.digits'     => 'Mã OTP phải gồm :digits chữ số.',
        ]);
    
        $email      = strtolower(trim($data['email']));
        $regKey     = "register_{$email}";
        $otpKey     = "otp_{$email}";
        $verifyKey  = "otp_verified_register_{$email}";
        $extendMin  = 10;  // thêm 10 phút cho phép đặt mật khẩu
    
        // 2) Lấy thông tin đăng ký, nếu không có → hết phiên đăng ký
        $regInfo = Cache::get($regKey);
        if (! $regInfo) {
            return response()->json([
                'message' => 'Phiên đăng ký đã hết hạn. Vui lòng đăng ký lại.'
            ], 400);
        }
    
        // 3) Lấy và kiểm tra OTP
        $otpData = Cache::get($otpKey);
        if (! $otpData) {
            return response()->json([
                'message' => 'Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại mã OTP.'
            ], 400);
        }
        if ($otpData['code'] != $data['otp']) {
            return response()->json([
                'message' => 'Mã OTP không đúng. Vui lòng thử lại.'
            ], 400);
        }
    
        // 4) Đánh dấu đã verify OTP: TTL = X phút
        Cache::put($verifyKey, true, now()->addMinutes($extendMin));
    
        // 5) Kéo dài thời gian lưu trữ thông tin đăng ký thêm X phút
        //    (Override cache để reset lại TTL)
        Cache::put($regKey, $regInfo, now()->addMinutes($extendMin));
    
        return response()->json([
            'message' => "Xác thực OTP thành công! Bạn có {$extendMin} phút để đặt mật khẩu."
        ], 200);
    }
    
    //bước để đặt mật khẩu 
 

    public function setPassword(Request $request)
    {
        // 1) Validate email + password
        $validator = Validator::make($request->all(), [
            'email'     => 'required|email',
            'password'  => 'required|min:8|confirmed',
        ], [
            'email.required'       => 'Vui lòng nhập email.',
            'email.email'          => 'Định dạng email không hợp lệ.',
            'password.required'    => 'Vui lòng nhập mật khẩu.',
            'password.min'         => 'Mật khẩu phải có ít nhất :min ký tự.',
            'password.confirmed'   => 'Xác nhận mật khẩu không khớp.',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => implode(' ', $validator->errors()->all())
            ], 422);
        }
    
        $email      = strtolower(trim($request->email));
        $cacheKey   = "register_{$email}";
        $otpVerKey  = "otp_verified_register_{$email}";
    
        // 2) Đảm bảo user đã xác thực OTP
        if (! Cache::get($otpVerKey)) {
            return response()->json([
                'message' => 'Phiên đăng ký đã hết hạn. Vui lòng quay lại bước đăng ký để đăng ký lại thông tin.'
            ], 400);
        }
    
        // 3) Kiểm tra thông tin đăng ký còn lưu trong cache không
        $regInfo = Cache::get($cacheKey);
        if (! $regInfo) {
            return response()->json([
                'message' => 'Phiên đăng ký đã hết hạn. Vui lòng thực hiện đăng ký lại từ đầu.'
            ], 400);
        }
    
        // 4) Tạo user mới kèm password
        $user = User::create([
            'username'           => $regInfo['username'],
            'name'               => $regInfo['name'],
            'email'              => $email,
            'birth'              => $regInfo['birth'],
            'password'           => Hash::make($request->password),
            'email_verified_at'  => now(),
        ]);
    
        // 5) Dọn sạch cache liên quan
        Cache::forget($cacheKey);
        Cache::forget("otp_register_{$email}");
        Cache::forget($otpVerKey);
    
        // 6) Phát token và trả về
        $token = JWTAuth::fromUser($user);
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => JWTAuth::factory()->getTTL() * 60,
            'message'      => 'Đăng ký hoàn tất! Bạn có thể sử dụng tài khoản ngay bây giờ.'
        ], 201);
    }
    


    //bước đăng nhập 
    public function login(Request $request)
    {
        // 1) Validate input
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        // 2) Kiểm tra tài khoản đã đăng ký chưa
        if (! User::where('email', $data['email'])->exists()) {
            return response()->json([
                'message' => 'Tài khoản chưa được đăng ký. Vui lòng đăng ký tài khoản!'
            ], 404);
        }

        // 3) Thử đăng nhập
        if (! $token = JWTAuth::attempt($data)) {
            return response()->json([
                'message' => 'Mật khẩu không chính xác.'
            ], 401);
        }

        // 4) Trả về token khi thành công
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => JWTAuth::factory()->getTTL() * 60,
            'success' => true,
            'message' => 'Đăng nhập thành công!'
        ], 200);
    }


    // quên mật khẩu khi chua dang nhap

    public function sendForgotPasswordOtp(Request $request)
    {
        $data  = $request->validate(['email' => 'required|email'], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email'    => 'Định dạng email không hợp lệ.',
        
        ]);
        $email = $data['email'];

        if (! User::where('email', $email)->exists()) {
            return response()->json(['message' => 'Email chưa được đăng ký. Vui lòng kiểm tra lại.'], 404);
        }

        // Kiểm soát spam chung
        $this->ensureOtpCanBeSent($email);

        // Sinh OTP và lưu cache (3  phút)
        $code = random_int(100000, 999999);
        Cache::put("otp_forgot_{$email}", $code, now()->addMinutes(3));

        Mail::raw("Mã OTP đặt lại mật khẩu của bạn là: $code", function ($message) use ($email) {
            $message->to($email)
                ->subject('OTP Đặt Lại Mật Khẩu');
        });

        return response()->json(['message' => 'OTP đặt lại mật khẩu đã được gửi.'], 200);
    }

    /**
     * Quên mật khẩu - Gửi lại OTP nếu cần
     */
    public function resendForgotPasswordOtp(Request $request)
    {
        $data  = $request->validate(['email' => 'required|email']);
        $email = $data['email'];

        if (! User::where('email', $email)->exists()) {
            return response()->json(['message' => 'Email chưa được đăng ký.'], 404);
        }

        // Kiểm soát spam chung
        $this->ensureOtpCanBeSent($email);

        // Sinh OTP mới và cập nhật cache
        $code = random_int(100000, 999999);
        Cache::put("otp_forgot_{$email}", $code, now()->addMinutes(5));

        Mail::raw("Mã OTP quên mật khẩu mới của bạn là: $code", function ($message) use ($email) {
            $message->to($email)
                ->subject('OTP Quên Mật Khẩu (Resend)');
        });

        return response()->json(['message' => 'OTP quên mật khẩu đã được gửi lại.'], 200);
    }

    /**
     * Quên mật khẩu - Bước 2: Xác nhận OTP
     */
    public function verifyForgotPasswordOtp(Request $request)
    {
       
        $data = $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|digits:6',
        ], [
            'email.required' => 'Vui lòng nhập email.',
            'email.email'    => 'Định dạng email không hợp lệ.',
            'otp.required'   => 'Vui lòng nhập mã OTP.',
            'otp.digits'     => 'Mã OTP phải gồm :digits chữ số.',
        ]);
        $email = $data['email'];

        $cachedOtp = Cache::get("otp_forgot_{$email}");
        if (! $cachedOtp) {
            return response()->json(['message' => 'Phiên OTP đã hết hạn. Vui lòng gửi lại.'], 400);
        }
        if ($cachedOtp != $data['otp']) {
            return response()->json(['message' => 'OTP không đúng.'], 400);
        }

        Cache::put("otp_forgot_verified_{$email}", true, now()->addMinutes(10));
        return response()->json(['message' => 'OTP hợp lệ. Vui lòng đặt mật khẩu mới.'], 200);
    }

    /**
     * Quên mật khẩu - Bước 3: Đặt lại mật khẩu
     */
    public function resetPassword(Request $request)
    {$data = $request->validate([
        'email'                      => 'required|email|exists:users,email',
        'new_password'               => 'required|min:8|confirmed',
        'new_password_confirmation'  => 'required',
    ], [
        'email.required'             => 'Vui lòng nhập email.',
        'email.email'                => 'Định dạng email không hợp lệ.',
        'email.exists'               => 'Email này chưa được đăng ký.',
        'new_password.required'      => 'Vui lòng nhập mật khẩu mới.',
        'new_password.min'           => 'Mật khẩu mới phải có ít nhất :min ký tự.',
        'new_password.confirmed'     => 'Xác nhận mật khẩu không khớp.',
        'new_password_confirmation.required' 
                                     => 'Vui lòng nhập lại mật khẩu để xác nhận.',
    ]);
        $email = $data['email'];

        if (! Cache::get("otp_forgot_verified_{$email}")) {
            return response()->json(['message' => 'Phiên xác thực OTP đã hết hạn.'], 400);
        }

        $user = User::where('email', $email)->first();
        $user->password = Hash::make($data['new_password']);
        $user->save();

        // Xóa cache liên quan
        Cache::forget("otp_forgot_{$email}");
        Cache::forget("otp_forgot_verified_{$email}");

        return response()->json(['message' => 'Đặt lại mật khẩu thành công.'], 200);
    }



    // thay đổi mật khẩu 

    /**
     * Bước 1: Xác thực mật khẩu cũ
     */
    public function verifyOldPassword(Request $request)
    {
        // 1. Validate input
        $request->validate([
            'old_password' => 'required|string',
        ]);

        // 2. Lấy user từ token
        $user = Auth::user();

        // 3. Check mật khẩu cũ
        if (! Hash::check($request->old_password, $user->password)) {
            return response()->json([
                'message' => 'Mật khẩu cũ không đúng.'
            ], 400);
        }

        // 4. Đánh dấu đã xác thực (lưu cache 10 phút)
        Cache::put('password_change_verified_' . $user->id, true, now()->addMinutes(10));

        return response()->json([
            'message' => 'Xác thực mật khẩu cũ thành công. Bạn có 10 phút để nhập mật khẩu mới.'
        ], 200);
    }

    /**
     * Bước 2: Nhập mật khẩu mới và đổi
     */
    public function changePassword(Request $request)
    {
        // 1. Lấy user từ token
        $user = Auth::user();

        // 2. Kiểm tra đã verify mật khẩu cũ chưa
        if (! Cache::get('password_change_verified_' . $user->id)) {
            return response()->json([
                'message' => 'Bạn chưa xác thực mật khẩu cũ hoặc phiên đã hết hạn.'
            ], 400);
        }

        // 3. Validate new password (với confirmed sẽ tự động yêu cầu trường new_password_confirmation)
        $request->validate([
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        // 4. Lưu mật khẩu mới
        $user->password = Hash::make($request->new_password);
        $user->save();

        // 5. Xóa flag cache
        Cache::forget('password_change_verified_' . $user->id);

        return response()->json([
            'message' => 'Đổi mật khẩu thành công.'
        ], 200);
    }













    /**
     * Refresh access token
     */
    public function refresh()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            return response()->json([
                'access_token' => $newToken,
                'token_type'   => 'bearer',
                'expires_in'   => JWTAuth::factory()->getTTL() * 60,
            ], 200);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'Session đã hết hiệu lực, vui lòng đăng nhập lại.'], 401);
        }
    }

    /**
     * Logout và invalidate token
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Đã đăng xuất.']);
    }
}
