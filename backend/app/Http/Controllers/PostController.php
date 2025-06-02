<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
 
    /**
     * Hiển thị danh sách bài viết (có thể phân trang)
     */
    public function index()
    {
        // Lấy tất cả post, kèm info user, ordered by mới nhất
        $posts = Post::with('user')
                     ->orderBy('created_at', 'desc')
                     ->paginate(10);

        return response()->json($posts);
    }

    /**
     * Hiển thị chi tiết 1 post (kèm hearts, comments count)
     */
    public function show($id)
    {
        $post = Post::with(['user','hearts','comments'])->find($id);
        if (!$post) {
            return response()->json(['message'=>'Post không tồn tại'], 404);
        }
        return response()->json($post);
    }

    /**
     * Tạo mới post
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'nullable|string',
            'images'  => 'nullable|array',
            'videos'  => 'nullable|array',
            'privacy' => 'required|in:public,private,followers',
        ]);

        $user = Auth::user();

        $post = Post::create([
            'user_id'        => $user->user_id,
            'content'        => $request->content,
            'images'         => $request->images,
            'videos'         => $request->videos,
            'privacy'        => $request->privacy,
            'heart_count'    => 0,
            'comments_count' => 0,
        ]);

        return response()->json($post, 201);
    }

    /**
     * Cập nhật post (chỉ tác giả mới sửa được)
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message'=>'Post không tồn tại'], 404);
        }

        // Kiểm tra quyền: chỉ author mới được sửa
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message'=>'Không có quyền sửa bài này'], 403);
        }

        $request->validate([
            'content' => 'nullable|string',
            'images'  => 'nullable|array',
            'videos'  => 'nullable|array',
            'privacy' => 'sometimes|in:public,private,followers',
        ]);

        $post->fill($request->only(['content','images','videos','privacy']));
        $post->save();

        return response()->json($post);
    }

    /**
     * Xóa post (chỉ tác giả hoặc admin mới được)
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message'=>'Post không tồn tại'], 404);
        }

        // Chỉ author hoặc admin mới xóa
        $user = Auth::user();
        if ($post->user_id !== $user->user_id && $user->role !== 'admin') {
            return response()->json(['message'=>'Không có quyền xóa bài này'], 403);
        }

        $post->delete();
        return response()->json(['message'=>'Xóa post thành công']);
    }
}
