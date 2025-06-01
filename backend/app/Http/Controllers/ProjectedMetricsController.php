<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProjectedMetricsController extends Controller
{
    public function compute(Request $request)
    {
        // Validate: target_weight, height, age, gender, activity_level_projected, body_fat_pct_projected, waist_projected, hip_projected
        $data = $request->validate([
            'height'                  => 'required|numeric|min:0',
            'target_weight'           => 'required|numeric|min:0',
            'age'                     => 'required|integer|min:0',
            'gender'                  => 'required|in:Nam,Nữ',
            'activity_level_projected'=> 'nullable|integer|between:1,5',
            'body_fat_pct_projected'  => 'nullable|numeric|min:0|max:100',
            'waist_projected'         => 'nullable|numeric|min:0',
            'hip_projected'           => 'nullable|numeric|min:0',
        ]);

        $height           = $data['height'];
        $targetWeight     = $data['target_weight'];
        $age              = $data['age'];
        $gender           = $data['gender'];
        $activityLevel    = $data['activity_level_projected'] ?? null;
        $bodyFatPct       = $data['body_fat_pct_projected'] ?? null;
        $waist            = $data['waist_projected'] ?? null;
        $hip              = $data['hip_projected'] ?? null;

        // Tính BMI dự kiến
        $m   = $height / 100;
        $bmi = $m > 0 ? round($targetWeight / ($m * $m), 2) : null;

        // Tính BMR dự kiến
        if ($gender === 'Nữ') {
            $bmr = round(447.593 + 9.247 * $targetWeight + 3.098 * $height - 4.330 * $age);
        } else {
            $bmr = round(88.362  + 13.397 * $targetWeight + 4.799 * $height - 5.677 * $age);
        }

        // TDEE dự kiến
        $tdee = null;
        if ($activityLevel !== null) {
            $multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
            $mult = $multipliers[$activityLevel - 1] ?? 1.2;
            $tdee = round($bmr * $mult);
        }

        // Fat Mass & Lean Mass dự kiến
        $fatMass  = $bodyFatPct !== null ? round($targetWeight * ($bodyFatPct / 100), 2) : null;
        $leanMass = $fatMass !== null ? round($targetWeight - $fatMass, 2) : null;

        // Waist–Hip Ratio dự kiến
        $waistHipRatio = null;
        if ($waist !== null && $hip !== null && $hip > 0) {
            $waistHipRatio = round($waist / $hip, 2);
        }

        // Response
        $response = [
            'bmi_projected'             => $bmi,
            'bmr_projected'             => $bmr,
            'tdee_projected'            => $tdee,
            'body_fat_pct_projected'    => $bodyFatPct,
            'fat_mass_kg_projected'     => $fatMass,
            'lean_mass_kg_projected'    => $leanMass,
        ];
        if ($waistHipRatio !== null) {
            $response['waist_hip_ratio_projected'] = $waistHipRatio;
        }

        return response()->json($response);
    }
}
