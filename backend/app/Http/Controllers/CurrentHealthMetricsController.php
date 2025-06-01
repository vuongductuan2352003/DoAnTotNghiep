<?php
namespace App\Http\Controllers;

use App\Models\CurrentHealthMetric;
use Illuminate\Http\Request;

class CurrentHealthMetricsController extends Controller
{
    /**
     * Store a newly created current health metric.
     * Endpoint: POST /api/v1/current-health-metrics
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'          => 'required|exists:users,user_id',
            'measurement_date' => 'nullable|date',
            'bmi'              => 'nullable|numeric',
            'bmr'              => 'nullable|integer',
            'tdee'             => 'nullable|integer',
            'body_fat_pct'     => 'nullable|numeric',
            'fat_mass_kg'      => 'nullable|numeric',
            'lean_mass_kg'     => 'nullable|numeric',
            'waist_hip_ratio'  => 'nullable|numeric',
            'advice'           => 'nullable|string',
            'risks'            => 'nullable|string',
        ]);

        $metric = CurrentHealthMetric::create($data);

        return response()->json([
            'message' => 'Current health metric saved',
            'metric'  => $metric,
        ], 201);
    }
}
