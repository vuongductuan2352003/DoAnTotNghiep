<?php

namespace App\Http\Controllers;

use App\Models\FoodPreference;
use Illuminate\Http\Request;

class FoodPreferenceController extends Controller
{
    /**
     * Store a newly created food preference.
     *
     * Endpoint: POST /api/v1/food-preferences
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'              => 'required|exists:users,user_id',
            'diet_type'            => 'nullable|string|max:100',
            'meal_time_duration'   => 'nullable|string|max:100',
            'auto_choose_food'     => 'nullable|boolean',
        ]);

        $pref = FoodPreference::create($data);

        return response()->json([
            'message'        => 'Food preference saved',
            'foodPreference' => $pref,
        ], 201);
    }
}