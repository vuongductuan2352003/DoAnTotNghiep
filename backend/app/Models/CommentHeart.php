<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;
use App\Models\User;

class CommentHeart extends Model
{
    use HasFactory;

    protected $table = 'comment_hearts';
    protected $primaryKey = 'id'; // tự động đặt

    protected $fillable = [
        'comment_id',
        'user_id',
    ];

    // Quan hệ: 1 CommentHeart thuộc về 1 Comment
    public function comment()
    {
        return $this->belongsTo(Comment::class, 'comment_id', 'comment_id');
    }

    // Quan hệ: 1 CommentHeart do 1 User tạo
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
