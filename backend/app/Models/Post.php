<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Heart;
use App\Models\Comment;

class Post extends Model
{
    use HasFactory;

    protected $primaryKey = 'post_id';

    protected $fillable = [
        'user_id',
        'content',
        'images',
        'videos',
        'privacy',
        'heart_count',
        'comments_count',
    ];

    protected $casts = [
        'images'    => 'array',
        'videos'    => 'array',
        'privacy'   => 'string',
        'heart_count'     => 'integer',
        'comments_count'  => 'integer',
    ];

    // Quan hệ: 1 Post thuộc về 1 User (tác giả)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Quan hệ: 1 Post có nhiều Heart (tim)
    public function hearts()
    {
        return $this->hasMany(Heart::class, 'post_id', 'post_id');
    }

    // Quan hệ: 1 Post có nhiều Comment
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'post_id');
    }
}
