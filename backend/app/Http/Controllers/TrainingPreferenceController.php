<?php

namespace App\Http\Controllers;

use App\Models\TrainingPreference;
use Illuminate\Http\Request;

class TrainingPreferenceController extends Controller
{
    /**
     * Store a newly created Training Preference in storage.
     *
     * Endpoint: POST /api/v1/training-preferences
     */
    public function store(Request $request)
    {
        // 1. Validate incoming JSON using snake_case keys matching DB columns
        $data = $request->validate([
            'user_id'                  => 'required|exists:users,user_id',
            'location'                 => 'nullable|string',
            'training_frequency_past'  => 'nullable|string',
            'duration_minutes'         => 'nullable|string',
            'time_preference'          => 'nullable|string',
            'pushups_range'            => 'nullable|string',
            'pullups_ability'          => 'nullable|string',
            'daily_routine'            => 'nullable|string',
            'injuries'                 => 'nullable|string',
            'problems'                 => 'nullable|string',
        ]);

        // 2. Create the record
        $preference = TrainingPreference::create($data);

        // 3. Return JSON response
        return response()->json([
            'message'    => 'Training preference saved',
            'preference' => $preference,
        ], 201);
    }
}

