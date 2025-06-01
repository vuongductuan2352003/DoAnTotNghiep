<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingActivity extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_detail_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'preference_id',
        'activity_name',
        'is_liked',
    ];
    
}
