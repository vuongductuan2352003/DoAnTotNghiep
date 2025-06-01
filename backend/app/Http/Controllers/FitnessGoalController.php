<?php

namespace App\Http\Controllers;

use App\Models\FitnessGoal;
use Illuminate\Http\Request;

class FitnessGoalController extends Controller
{
    /**
     * Store a newly created fitness goal.
     */
    public function store(Request $request)
    {
        // 1. Validate incoming JSON
       $data= $validated = $request->validate([
            'user_id'                => 'required|exists:users,user_id',
           'goal_type'               => 'required|string',
            'target_weight_kg'            => 'nullable|numeric',
            'target_date'              => 'nullable|date',
           'fitness_level'             => 'nullable|string',
           'activity_level_projected'    => 'nullable|integer',
        ]);

      
        // 3. Create record
        $goal = FitnessGoal::create($data);

        // 4. Return JSON response
        return response()->json([
            'message' => 'Fitness goal saved',
            'goal'    => $goal
        ], 201);
    }
}
