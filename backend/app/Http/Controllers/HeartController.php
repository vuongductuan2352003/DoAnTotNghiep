<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Heart;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class HeartController extends Controller
{
  
    /**
     * Thả tim cho 1 post (nếu chưa có)
     * if already hearted thì bỏ tim
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'post_id' => 'required|integer|exists:posts,post_id',
        ]);

        $user = Auth::user();
        $post = Post::find($request->post_id);

        // Kiểm tra đã thả tim chưa
        $existing = Heart::where('post_id', $post->post_id)
                         ->where('user_id', $user->user_id)
                         ->first();

        if ($existing) {
            // Nếu đã có, bỏ tim
            $existing->delete();
            // Giảm count trên post
            $post->heart_count = max(0, $post->heart_count - 1);
            $post->save();

            return response()->json([
                'message'      => 'Bỏ tim thành công',
                'heart_count'  => $post->heart_count,
                'hearted'      => false
            ]);
        } else {
            // Nếu chưa có, tạo mới tim
            Heart::create([
                'post_id' => $post->post_id,
                'user_id' => $user->user_id,
            ]);
            // Tăng count trên post
            $post->heart_count += 1;
            $post->save();

            return response()->json([
                'message'      => 'Thả tim thành công',
                'heart_count'  => $post->heart_count,
                'hearted'      => true
            ], 201);
        }
    }
}
