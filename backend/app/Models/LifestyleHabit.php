<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LifestyleHabit extends Model
{
    protected $table = 'lifestyle_habits';
    protected $primaryKey = 'habit_id';
    protected $fillable = [
        'user_id',
        'sugar_habit',
        'water_intake',
        'sleep_hours',
    ];
    public $timestamps = true;
    
}
