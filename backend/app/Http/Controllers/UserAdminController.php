<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserAdminController extends Controller
{
    /**
     * Hiển thị danh sách tất cả user có role = 'user'
     */
    public function index()
    {
        // Lọc chỉ lấy những tài khoản có role = 'user'
        $users = User::where('role', 'user')
                     ->orderBy('created_at', 'desc')
                     ->get();

        return response()->json($users);
    }

    /**
     * Hiển thị chi tiết một user (chỉ khi role = 'user')
     */
    public function show($id)
    {
        // Tìm user theo user_id và role = 'user'
        $user = User::where('user_id', $id)
                    ->where('role', 'user')
                    ->first();

        if (!$user) {
            return response()->json([
                'message' => 'User không tồn tại hoặc không có quyền xem.'
            ], 404);
        }

        return response()->json($user);
    }

    /**
     * Tạo mới user (Admin có thể tạo user)
     */
    public function store(Request $request)
    {
        $request->validate([
            'username'    => 'required|string|max:50|unique:users,username',
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email',
            'password'    => 'required|string|min:6',
            'role'        => ['required', Rule::in(['user','admin'])],
            // Các trường bổ sung nếu cần
            'gender'      => 'nullable|string|in:Nam,Nữ,Khác',
            'age'         => 'nullable|integer|min:0|max:150',
            'is_private'  => 'nullable|boolean',
            'birth'       => 'nullable|date',
        ]);

        $user = User::create([
            'username'    => $request->username,
            'name'        => $request->name,
            'email'       => $request->email,
            'password'    => bcrypt($request->password),
            'role'        => $request->role,
            'gender'      => $request->gender ?? null,
            'age'         => $request->age ?? null,
            'is_private'  => $request->is_private ?? false,
            'birth'       => $request->birth ?? null,
            'is_active'   => 1,
        ]);

        return response()->json($user, 201);
    }

    /**
     * Cập nhật thông tin user (Admin có thể đổi role, active/inactive, v.v.)
     */
    public function update(Request $request, $id)
    {
        // Tìm bất kỳ user nào (role có thể là 'user' hoặc 'admin')
        $user = User::where('user_id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'User không tồn tại'
            ], 404);
        }

        $request->validate([
            'username'    => ['sometimes','string','max:50', Rule::unique('users','username')->ignore($user->user_id, 'user_id')],
            'name'        => 'sometimes|string|max:255',
            'email'       => ['sometimes','email', Rule::unique('users','email')->ignore($user->user_id, 'user_id')],
            'role'        => ['sometimes', Rule::in(['user','admin'])],
            'is_active'   => 'sometimes|boolean',
            'gender'      => 'nullable|string|in:Nam,Nữ,Khác',
            'age'         => 'nullable|integer|min:0|max:150',
            'is_private'  => 'nullable|boolean',
            'birth'       => 'nullable|date',
            'password'    => 'sometimes|string|min:6',
        ]);

        $fields = $request->only([
            'username',
            'name',
            'email',
            'role',
            'is_active',
            'gender',
            'age',
            'is_private',
            'birth'
        ]);

        if ($request->filled('password')) {
            $fields['password'] = bcrypt($request->password);
        }

        $user->fill($fields);
        $user->save();

        return response()->json($user);
    }

    /**
     * Xóa user (Admin only)
     */
    public function destroy($id)
    {
        $user = User::where('user_id', $id)->first();
        if (!$user) {
            return response()->json([
                'message' => 'User không tồn tại'
            ], 404);
        }

        $user->delete();
        return response()->json([
            'message' => 'Xóa user thành công.'
        ]);
    }
}
