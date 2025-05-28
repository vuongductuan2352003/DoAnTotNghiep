<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BmiCategoryController;
use App\Http\Controllers\MetricsController;
// Gửi mã xác thực 


Route::prefix('auth')->group(function () {
     // ---- Register flow ----
     //check usernameusername
     Route::get('check-username', [AuthController::class, 'checkUsername']);
     // 1. Gửi OTP đăng ký
     Route::post('register/send-otp',   [AuthController::class, 'sendOTP']);
     // 2. Resend OTP đăng ký
     Route::post('register/resend-otp', [AuthController::class, 'resendCode']);
     // 3. Verify OTP & tạo user tạm (chưa set mật khẩu)
     Route::post('register/verify-otp', [AuthController::class, 'VerifyRegister']);
     // 4. Set password sau khi verify OTP
     Route::post('register/set-password', [AuthController::class, 'setPassword']);
 
     // ---- Login ----
     // Đăng nhập, trả về JWT
     Route::post('login', [AuthController::class, 'login']);
 
     // ---- Forgot Password flow ----
     // 1. Gửi OTP quên mật khẩu
     Route::post('password/forgot/send-otp',   [AuthController::class, 'sendForgotPasswordOtp']);
     // 2. Resend OTP quên mật khẩu
     Route::post('password/forgot/resend-otp', [AuthController::class, 'resendForgotPasswordOtp']);
     // 3. Verify OTP quên mật khẩu
     Route::post('password/forgot/verify',     [AuthController::class, 'verifyForgotPasswordOtp']);
     // 4. Reset password sau khi verify OTP
     Route::post('password/forgot/reset',      [AuthController::class, 'resetPassword']);
 });
 
 
 /*
 |--------------------------------------------------------------------------
 | Protected (User) Routes
 |--------------------------------------------------------------------------
 | - Các route chỉ dùng được khi đã đăng nhập JWT
 | - Dùng cho: đổi mật khẩu, refresh token, logout…
 */
 
 Route::middleware('auth:api')->prefix('user')->group(function () {
     // 1. Xác thực mật khẩu cũ trước khi cho đổi
     Route::post('password/old/verify', [AuthController::class, 'verifyOldPassword']);
     // 2. Đổi mật khẩu mới (yêu cầu new_password + new_password_confirmation)
     Route::post('password/change',     [AuthController::class, 'changePassword']);
 
     // 3. Refresh lại JWT token
     Route::post('refresh', [AuthController::class, 'refresh']);
     // 4. Logout & invalidate token
     Route::post('logout',  [AuthController::class, 'logout']);
 });
 Route::prefix('v1')->group(function () {
    // Lấy toàn bộ các category BMI
    Route::get('bmi-categories', [BmiCategoryController::class, 'index']);
    // Lấy thông tin 1 category theo id
    Route::get('bmi-categories/{id}', [BmiCategoryController::class, 'show'])
         ->whereNumber('id');
    // Tự động xác định category theo giá trị BMI và gender
    // VD: GET /api/v1/bmi?bmi=27.5&gender=female
    Route::get('bmi', [BmiCategoryController::class, 'byValue']);
    Route::get('metrics', [MetricsController::class, 'compute']);
});