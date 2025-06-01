<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreferredFood extends Model
{
    // Bắt buộc map đúng tên bảng
    protected $table = 'preferred_foods';

    protected $primaryKey = 'pref_food_id';

    protected $fillable = [
        'food_pref_id',
        'food_category',
        'food_item',
    ];
}
