<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Follow extends Model
{
    use HasFactory;

    protected $fillable = [
        'follower_id',
        'followee_id',
    ];

    // Quan hệ: 1 Follow (follower → followee)
    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id', 'user_id');
    }

    public function followee()
    {
        return $this->belongsTo(User::class, 'followee_id', 'user_id');
    }
}
