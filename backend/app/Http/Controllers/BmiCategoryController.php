<?php
// app/Http/Controllers/Api/BmiCategoryController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BmiCategory;

class BmiCategoryController extends Controller
{
    /**
     * GET /api/bmi-categories
     * Trả về toàn bộ danh sách categories
     */
    public function index()
    {
        $all = BmiCategory::orderBy('bmi_min')->get();
        return response()->json($all);
    }

    /**
     * GET /api/bmi-categories/{id}
     * Trả về 1 category theo id
     */
    public function show($id)
    {
        $cat = BmiCategory::find($id);
        if (! $cat) {
            return response()->json(['message'=>'Not Found'], 404);
        }
        return response()->json($cat);
    }

    /**
     * GET /api/bmi?bmi=23.5&gender=female
     * Tự động xác định category theo giá trị BMI và giới tính,
     * rồi chỉ return risk + advice tương ứng.
     */
    public function byValue(Request $req)
    {
        $value  = $req->query('bmi');
        $gender = $req->query('gender','male');

        if (! is_numeric($value)) {
            return response()->json([
                'message'=>'Bạn phải truyền bmi (số) trong query string'
            ], 400);
        }
        $value = (float)$value;

        $cat = BmiCategory::where(function($q) use($value){
                $q->whereNull('bmi_min')
                  ->orWhere('bmi_min','<=',$value);
            })
            ->where(function($q) use($value){
                $q->whereNull('bmi_max')
                  ->orWhere('bmi_max','>',$value);
            })
            ->first();

        if (! $cat) {
            return response()->json(['message'=>'No category found'], 404);
        }

        return response()->json([
            'id'             => $cat->id,
            'label'          => $cat->category_label,
            'bmi_min'        => $cat->bmi_min,
            'bmi_max'        => $cat->bmi_max,
            'risk'           => $gender==='female'
                                ? $cat->risk_female
                                : $cat->risk_male,
            'advice'         => $gender==='female'
                                ? $cat->advice_female
                                : $cat->advice_male,
        ]);
    }
}
