<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;
use App\Models\User;

class Heart extends Model
{
    use HasFactory;

    protected $primaryKey = 'heart_id';

    protected $fillable = [
        'post_id',
        'user_id',
    ];

    // Quan hệ: 1 Heart thuộc về 1 Post
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id', 'post_id');
    }

    // Quan hệ: 1 Heart do 1 User tạo
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
