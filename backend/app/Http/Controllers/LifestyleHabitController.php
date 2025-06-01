<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LifestyleHabit;

class LifestyleHabitController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'      => 'required|integer|exists:users,user_id',
            'sugar_habit'  => 'nullable|string',
            'water_intake' => 'nullable|string',
            'sleep_hours'  => 'nullable|string',
        ]);

        $habit = LifestyleHabit::create($data);

        return response()->json([
            'message' => 'Lifestyle habit saved',
            'habit'   => $habit
        ], 201);
    }
}
