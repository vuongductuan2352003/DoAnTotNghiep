<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingPreference extends Model
{
    use HasFactory;

    protected $primaryKey = 'preference_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'location',
        'training_frequency_past',
        'duration_minutes',
        'time_preference',
        'pushups_range',
        'pullups_ability',
        'daily_routine',
        'injuries',
        'problems',
    ];
     public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Quan hệ với các bảng liên kết
    public function trainingActivities()
    {
        return $this->hasMany(TrainingActivity::class, 'preference_id');
    }
    public function weeklySessions()
    {
        return $this->hasMany(WeeklySession::class, 'preference_id');
    }
    public function regionFocus()
    {
        return $this->hasMany(RegionFocus::class, 'preference_id');
    }
    public function otherActivities()
    {
        return $this->hasMany(OtherActivity::class, 'preference_id');
    }
    public function sports()
    {
        return $this->hasMany(Sport::class, 'preference_id');
    }
    public function equipment()
    {
        return $this->hasMany(Equipment::class, 'preference_id');
    }
}

