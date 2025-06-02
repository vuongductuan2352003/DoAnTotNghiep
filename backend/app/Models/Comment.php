<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
use App\Models\User;
use App\Models\CommentHeart;

class Comment extends Model
{
    use HasFactory;

    protected $primaryKey = 'comment_id';

    protected $fillable = [
        'post_id',
        'user_id',
        'content',
        'parent_comment_id',
        'heart_count',
    ];

    // Quan hệ: 1 Comment thuộc về 1 Post
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id', 'post_id');
    }

    // Quan hệ: 1 Comment do 1 User tạo
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Quan hệ: Comment có thể có “reply” (parent_comment_id)
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id', 'comment_id');
    }

    // Quan hệ: 1 Comment có con (nhiều reply)
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id', 'comment_id');
    }

    // Quan hệ: 1 Comment có nhiều CommentHeart (tim cho comment)
    public function hearts()
    {
        return $this->hasMany(CommentHeart::class, 'comment_id', 'comment_id');
    }
}
