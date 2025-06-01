<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FitnessGoal extends Model
{
    protected $primaryKey = 'goal_id';
    protected $fillable = [
        'user_id',
        'goal_type',
        'target_weight_kg',
        'target_date',
        'fitness_level',
        'activity_level_projected'
    ];
    
}
