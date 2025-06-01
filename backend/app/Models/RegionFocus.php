<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegionFocus extends Model
{
    use HasFactory;

    protected $table = 'region_focus';
    protected $primaryKey = 'region_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'preference_id',
        'focus_area',
    ];
}