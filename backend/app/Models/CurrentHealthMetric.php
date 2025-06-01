<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrentHealthMetric extends Model
{
    use HasFactory;

    protected $primaryKey = 'metric_id';
    protected $table = 'current_health_metrics';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'user_id',
        'measurement_date',
        'bmi',
        'bmr',
        'tdee',
        'body_fat_pct',
        'fat_mass_kg',
        'lean_mass_kg',
        'waist_hip_ratio',
        'advice',
        'risks',
    ];
    
}
