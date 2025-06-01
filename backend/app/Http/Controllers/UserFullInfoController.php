<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserFullInfoController extends Controller
{
    public function show($user_id)
    {
        $user = User::with([
            'bodyMeasurements',
            'fitnessGoals',
            'trainingPreferences.trainingActivities',
            'trainingPreferences.weeklySessions',
            'trainingPreferences.regionFocus',
            'trainingPreferences.sports',
            'trainingPreferences.otherActivities',
            'trainingPreferences.equipment',
            'foodPreferences.preferredFoods',
            'lifestyleHabits',
            'currentHealthMetrics',
            'projectedHealthMetrics',
            'userProblemsGoals',
        ])->findOrFail($user_id);

        return response()->json($user);
    }
}
