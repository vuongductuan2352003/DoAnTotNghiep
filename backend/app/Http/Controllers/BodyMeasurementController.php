<?php

namespace App\Http\Controllers;

use App\Models\BodyMeasurement;
use Illuminate\Http\Request;

class BodyMeasurementController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'            => 'required|exists:users,user_id',
            'height_cm'          => 'nullable|numeric',
            'weight_kg'          => 'nullable|numeric',
            'waist_cm'           => 'nullable|numeric',
            'neck_cm'            => 'nullable|numeric',
            'hip_cm'             => 'nullable|numeric',
            'chest_cm'           => 'nullable|numeric',
            'wrist_cm'           => 'nullable|numeric',
            'arm_cm'             => 'nullable|numeric',
            'thigh_cm'           => 'nullable|numeric',
            'ankle_cm'           => 'nullable|numeric',
            'skinfold_mm'        => 'nullable|numeric',
            'blood_pressure'     => 'nullable|string',
            'resting_heart_rate' => 'nullable|integer',
            'blood_glucose'      => 'nullable|numeric',
            'lipid_profile'      => 'nullable|string',
            'body_fat_category'  => 'nullable|string',
            'body_fat_percent'   => 'nullable|numeric',
            'activity_level'     => 'nullable|integer',
        ]);

        $measurement = BodyMeasurement::create($data);

        return response()->json([
            'message'     => 'Body measurement recorded',
            'measurement' => $measurement
        ], 201);
    }
}
