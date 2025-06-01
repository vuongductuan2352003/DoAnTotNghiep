<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserProblemsGoal extends Model
{
    protected $table = 'user_problems_goals';
    protected $fillable = [
        'user_id',
        'type',           // 'problem' hoặc 'extra_goal'
        'description'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
}
