<?php
// app/Models/BmiCategory.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BmiCategory extends Model
{
    // nếu bạn để migrations trong schema fitness_health_db, 
    // hãy chắc chắn trong .env có đúng DB_DATABASE=fitness_health_db
    protected $table = 'bmi_categories';

    protected $fillable = [
        'category_label',
        'bmi_min',
        'bmi_max',
        'risk_male',
        'risk_female',
        'advice_male',
        'advice_female',
    ];

    // tự động cast JSON column thành mảng PHP
    protected $casts = [
        'risk_male'    => 'array',
        'risk_female'  => 'array',
        'advice_male'  => 'array',
        'advice_female'=> 'array',
    ];
}
