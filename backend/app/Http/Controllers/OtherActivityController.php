<?php

namespace App\Http\Controllers;

use App\Models\OtherActivity;
use Illuminate\Http\Request;

class OtherActivityController extends Controller
{
    /**
     * Store a newly created other activity.
     *
     * Endpoint: POST /api/v1/other-activities
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $data = $request->validate([
            'preference_id' => 'required|exists:training_preferences,preference_id',
            'activity_name' => 'required|string|max:255',
        ]);

        // Create record
        $activity = OtherActivity::create($data);

        // Return JSON response
        return response()->json([
            'message' => 'Other activity saved',
            'activity' => $activity,
        ], 201);
    }
}