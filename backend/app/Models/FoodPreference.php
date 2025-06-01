<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodPreference extends Model
{
    use HasFactory;

    protected $primaryKey = 'food_pref_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'user_id',
        'diet_type',
        'meal_time_duration',
        'auto_choose_food',
    ];
     public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function preferredFoods()
    {
        return $this->hasMany(PreferredFood::class, 'food_pref_id');
    }
    
}