<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
   
    /**
     * Lấy danh sách comment của 1 post (có thể phân trang)
     */
    public function index(Request $request, $postId)
    {
        $comments = Comment::with('user')
            ->where('post_id', $postId)
            ->orderBy('created_at', 'asc')
            ->paginate(10);

        return response()->json($comments);
    }

    /**
     * Thêm mới comment cho 1 post
     */
    public function store(Request $request, $postId)
    {
        $request->validate([
            'content'           => 'required|string',
            'parent_comment_id' => 'nullable|integer|exists:comments,comment_id',
        ]);

        $user = Auth::user();
        $post = Post::find($postId);
        if (!$post) {
            return response()->json(['message'=>'Post không tồn tại'], 404);
        }

        $comment = Comment::create([
            'post_id'           => $post->post_id,
            'user_id'           => $user->user_id,
            'content'           => $request->content,
            'parent_comment_id' => $request->parent_comment_id,
            'heart_count'       => 0,
        ]);

        // Tăng comments_count trên post
        $post->comments_count += 1;
        $post->save();

        return response()->json($comment, 201);
    }

    /**
     * Hiển thị chi tiết 1 comment
     */
    public function show($postId, $commentId)
    {
        $comment = Comment::with('user','replies')
                          ->where('post_id', $postId)
                          ->where('comment_id', $commentId)
                          ->first();
        if (!$comment) {
            return response()->json(['message'=>'Comment không tồn tại'], 404);
        }
        return response()->json($comment);
    }

    /**
     * Cập nhật comment (chỉ author hoặc admin)
     */
    public function update(Request $request, $postId, $commentId)
    {
        $comment = Comment::where('post_id', $postId)
                          ->where('comment_id', $commentId)
                          ->first();
        if (!$comment) {
            return response()->json(['message'=>'Comment không tồn tại'], 404);
        }

        $user = Auth::user();
        if ($comment->user_id !== $user->user_id && $user->role !== 'admin') {
            return response()->json(['message'=>'Không có quyền sửa comment'], 403);
        }

        $request->validate([
            'content' => 'required|string',
        ]);

        $comment->content = $request->content;
        $comment->save();

        return response()->json($comment);
    }

    /**
     * Xóa comment (chỉ author hoặc admin)
     */
    public function destroy($postId, $commentId)
    {
        $comment = Comment::where('post_id', $postId)
                          ->where('comment_id', $commentId)
                          ->first();
        if (!$comment) {
            return response()->json(['message'=>'Comment không tồn tại'], 404);
        }

        $user = Auth::user();
        if ($comment->user_id !== $user->user_id && $user->role !== 'admin') {
            return response()->json(['message'=>'Không có quyền xóa comment'], 403);
        }

        // Giảm comments_count trên post
        $post = Post::find($postId);
        if ($post) {
            $post->comments_count = max(0, $post->comments_count - 1);
            $post->save();
        }

        $comment->delete();
        return response()->json(['message'=>'Xóa comment thành công']);
    }
}
