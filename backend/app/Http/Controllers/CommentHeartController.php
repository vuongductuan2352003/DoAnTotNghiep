<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\CommentHeart;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentHeartController extends Controller
{
   
    /**
     * Toggle thả tim / bỏ tim cho comment
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|integer|exists:comments,comment_id',
        ]);

        $user = Auth::user();
        $comment = Comment::find($request->comment_id);
        if (!$comment) {
            return response()->json(['message'=>'Comment không tồn tại'], 404);
        }

        $existing = CommentHeart::where('comment_id', $comment->comment_id)
                                ->where('user_id', $user->user_id)
                                ->first();

        if ($existing) {
            // Bỏ tim
            $existing->delete();
            $comment->heart_count = max(0, $comment->heart_count - 1);
            $comment->save();

            return response()->json([
                'message'       => 'Bỏ tim comment thành công',
                'heart_count'   => $comment->heart_count,
                'hearted'       => false
            ]);
        } else {
            // Thả tim
            CommentHeart::create([
                'comment_id' => $comment->comment_id,
                'user_id'    => $user->user_id,
            ]);
            $comment->heart_count += 1;
            $comment->save();

            return response()->json([
                'message'       => 'Thả tim comment thành công',
                'heart_count'   => $comment->heart_count,
                'hearted'       => true
            ], 201);
        }
    }
}
