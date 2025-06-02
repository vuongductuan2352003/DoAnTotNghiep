<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth; // Nếu bạn dùng tymon/jwt-auth
use Illuminate\Http\Request;

class IsAdmin
{
    /**
     * Handle an incoming request.
     * Nếu user không có role = 'admin', trả về 403.
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            // Lấy user từ JWT token
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Token không hợp lệ hoặc đã hết hạn'
            ], 401);
        }

        if (!$user || $user->role !== 'admin') {
            return response()->json([
                'message' => 'Không có quyền truy cập (Chỉ Admin).'
            ], 403);
        }

        return $next($request);
    }
}
