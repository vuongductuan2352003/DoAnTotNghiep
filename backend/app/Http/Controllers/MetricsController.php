<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MetricsController extends Controller
{
    public function compute(Request $request)
    {
        // 1. Validate: bắt buộc height, weight, age, gender; optional: activity_level, body_fat_pct, waist, hip
        $data = $request->validate([
            'height'         => 'required|numeric|min:0',
            'weight'         => 'required|numeric|min:0',
            'age'            => 'required|integer|min:0',
            'gender'         => 'required|in:male,female',
            'activity_level' => 'nullable|integer|between:1,5',
            'body_fat_pct'   => 'nullable|numeric|min:0|max:100',

            // —— Chỉnh lại validation để nếu field này có present nhưng rỗng hoặc không phải số, controller
            // sẽ coi như “trường không có” (skip) và không báo lỗi. —— 
            'waist'          => 'sometimes|nullable|numeric|min:0',
            'hip'            => 'sometimes|nullable|numeric|min:0',
        ]);

        // 2. Gán dữ liệu, mặc định null nếu không có
        $height        = $data['height'];
        $weight        = $data['weight'];
        $age           = $data['age'];
        $gender        = $data['gender'];
        $activityLevel = $data['activity_level'] ?? null;
        $bodyFatPct    = $data['body_fat_pct']   ?? null;

        // Nếu client gửi waist/hip nhưng rỗng hoặc chuỗi không phải số, nó đã bị bỏ qua ở validate, 
        // nên ở đây chỉ cần lấy nếu có (hoặc null).
        $waist         = $data['waist'] ?? null;
        $hip           = $data['hip']   ?? null;

        // 3. Tính BMI
        $m   = $height / 100;
        $bmi = $m > 0 ? round($weight / ($m * $m), 1) : null;

        // 4. Tính BMR
        if ($gender === 'female') {
            $bmr = round(447.593 + 9.247 * $weight + 3.098 * $height - 4.330 * $age);
        } else {
            $bmr = round(88.362  + 13.397 * $weight + 4.799 * $height - 5.677 * $age);
        }

        // 5. TDEE
        $tdee = null;
        if ($activityLevel !== null) {
            $multipliers = [1.2, 1.375, 1.55, 1.725, 1.9];
            $mult = $multipliers[$activityLevel - 1] ?? 1.2;
            $tdee = round($bmr * $mult);
        }

        // 6. Fat Mass & Lean Mass
        $fatMass  = $bodyFatPct !== null ? round($weight * ($bodyFatPct / 100), 1) : null;
        $leanMass = $fatMass !== null ? round($weight - $fatMass, 1) : null;

        // 7. Waist–Hip Ratio
        $waistHipRatio = null;
        if ($waist !== null && $hip !== null && $hip > 0) {
            $waistHipRatio = round($waist / $hip, 2);
        }

        // 8. Chuẩn bị response, không phụ thuộc waist/hip để trả các fields khác
        $response = [
            'bmi'            => $bmi,
            'bmr'            => $bmr,
            'tdee'           => $tdee,
            'body_fat_pct'   => $bodyFatPct,
            'fat_mass'       => $fatMass,
            'lean_mass'      => $leanMass,
        ];
        if ($waistHipRatio !== null) {
            $response['waist_hip_ratio'] = $waistHipRatio;
        }

        return response()->json($response);
    }
}
