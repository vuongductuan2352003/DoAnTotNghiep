<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeeklySession extends Model
{
    use HasFactory;

    protected $primaryKey = 'session_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'preference_id',
        'day_of_week',
    ];
}