<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectedHealthMetric extends Model
{
    protected $table = 'projected_health_metrics';
    protected $primaryKey = 'projected_metric_id';
    protected $fillable = [
        'user_id',
        'bmi_projected',
        'bmr_projected',
        'tdee_projected',
        'body_fat_pct_projected',
        'fat_mass_kg_projected',
        'lean_mass_kg_projected',
        'improve_risk',
        'calculation_date',
    ];
    public $timestamps = true;
    
}
