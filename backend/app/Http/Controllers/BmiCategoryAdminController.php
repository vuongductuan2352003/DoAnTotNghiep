<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BmiCategory;

class BmiCategoryAdminController extends Controller
{
    /**
     * Hiển thị danh sách BMI categories
     */
    public function index()
    {
        // Lấy hết các bản ghi trong bảng bmi_categories
        $categories = BmiCategory::orderBy('id', 'asc')->get();
        return response()->json($categories);
    }

    /**
     * Hiển thị chi tiết một BMI category
     */
    public function show($id)
    {
        $cat = BmiCategory::find($id);
        if (!$cat) {
            return response()->json([
                'message' => 'BMI Category không tồn tại'
            ], 404);
        }
        return response()->json($cat);
    }

    /**
     * Tạo mới BMI category
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_label' => 'required|string|max:255',
            'bmi_min'        => 'nullable|numeric',
            'bmi_max'        => 'nullable|numeric',
            // Vì model cast 2 cột risk_male/risk_female thành array,
            // nên ta validate là array (nếu gửi JSON array trong body). 
            'risk_male'      => 'nullable|array',
            'risk_female'    => 'nullable|array',
            'advice_male'    => 'nullable|array',
            'advice_female'  => 'nullable|array',
        ]);

        $cat = BmiCategory::create([
            'category_label' => $request->category_label,
            'bmi_min'        => $request->bmi_min,
            'bmi_max'        => $request->bmi_max,
            'risk_male'      => $request->risk_male ?? [],
            'risk_female'    => $request->risk_female ?? [],
            'advice_male'    => $request->advice_male ?? [],
            'advice_female'  => $request->advice_female ?? [],
        ]);

        return response()->json($cat, 201);
    }

    /**
     * Cập nhật BMI category
     */
    public function update(Request $request, $id)
    {
        $cat = BmiCategory::find($id);
        if (!$cat) {
            return response()->json([
                'message' => 'BMI Category không tồn tại'
            ], 404);
        }

        $request->validate([
            'category_label' => 'sometimes|string|max:255',
            'bmi_min'        => 'nullable|numeric',
            'bmi_max'        => 'nullable|numeric',
            'risk_male'      => 'nullable|array',
            'risk_female'    => 'nullable|array',
            'advice_male'    => 'nullable|array',
            'advice_female'  => 'nullable|array',
        ]);

        $fields = $request->only([
            'category_label',
            'bmi_min',
            'bmi_max',
            'risk_male',
            'risk_female',
            'advice_male',
            'advice_female',
        ]);

        // Nếu không có trong request, giữ nguyên dữ liệu cũ
        if (isset($fields['risk_male'])) {
            $cat->risk_male = $fields['risk_male'];
        }
        if (isset($fields['risk_female'])) {
            $cat->risk_female = $fields['risk_female'];
        }
        if (isset($fields['advice_male'])) {
            $cat->advice_male = $fields['advice_male'];
        }
        if (isset($fields['advice_female'])) {
            $cat->advice_female = $fields['advice_female'];
        }
        if (isset($fields['category_label'])) {
            $cat->category_label = $fields['category_label'];
        }
        if (isset($fields['bmi_min'])) {
            $cat->bmi_min = $fields['bmi_min'];
        }
        if (isset($fields['bmi_max'])) {
            $cat->bmi_max = $fields['bmi_max'];
        }

        $cat->save();

        return response()->json($cat);
    }

    /**
     * Xóa BMI Category
     */
    public function destroy($id)
    {
        $cat = BmiCategory::find($id);
        if (!$cat) {
            return response()->json([
                'message' => 'BMI Category không tồn tại'
            ], 404);
        }

        $cat->delete();
        return response()->json([
            'message' => 'Xóa BMI Category thành công.'
        ]);
    }
}
