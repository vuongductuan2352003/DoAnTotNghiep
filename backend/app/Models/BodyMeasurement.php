<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BodyMeasurement extends Model
{
    protected $primaryKey = 'measurement_id';

    // cho phép mass-assign những cột này
    protected $fillable = [
        'user_id',
        'height_cm',
        'weight_kg',
        'waist_cm',
        'neck_cm',
        'hip_cm',
        'chest_cm',
        'wrist_cm',
        'arm_cm',
        'thigh_cm',
        'ankle_cm',
        'skinfold_mm',
        'blood_pressure',
        'resting_heart_rate',
        'blood_glucose',
        'lipid_profile',
        'body_fat_category',
        'body_fat_percent',
        'activity_level',
    ];
    
}
