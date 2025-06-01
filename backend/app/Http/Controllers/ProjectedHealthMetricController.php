<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProjectedHealthMetric;

class ProjectedHealthMetricController extends Controller
{
    // Lưu chỉ số mục tiêu dự đoán
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'                   => 'required|exists:users,user_id',
            'bmi_projected'             => 'nullable|numeric',
            'bmr_projected'             => 'nullable|integer',
            'tdee_projected'            => 'nullable|integer',
            'body_fat_pct_projected'    => 'nullable|numeric',
            'fat_mass_kg_projected'     => 'nullable|numeric',
            'lean_mass_kg_projected'    => 'nullable|numeric',
            'improve_risk'              => 'nullable|string',
            'calculation_date'          => 'nullable|date',
        ]);

        // Nếu không truyền calculation_date thì sẽ lấy ngày hiện tại
        if (empty($data['calculation_date'])) {
            $data['calculation_date'] = now();
        }

        $metric = ProjectedHealthMetric::create($data);

        return response()->json([
            'message' => 'Lưu chỉ số mục tiêu thành công',
            'data' => $metric
        ], 201);
    }
}
