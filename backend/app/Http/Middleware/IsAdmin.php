<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth; 
use Illuminate\Http\Request;

class Authenticate
{
    /**
     * Handle an incoming request: xác thực JWT, gắn user vào Request.
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['message' => 'Token đã hết hạn'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['message' => 'Token không hợp lệ'], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Không tìm thấy hoặc không hợp lệ Bearer token'], 401);
        }

        // Nếu cần, bạn có thể gán $request->user = $user ở đây
        return $next($request);
    }
}
