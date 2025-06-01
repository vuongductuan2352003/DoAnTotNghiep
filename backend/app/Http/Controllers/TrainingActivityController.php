<?php
namespace App\Http\Controllers;

use App\Models\TrainingActivity;
use Illuminate\Http\Request;

class TrainingActivityController extends Controller
{
    
    public function store(Request $request)
    {
        // 1. Validate incoming data
        $data = $request->validate([
            'preference_id'  => 'required|exists:training_preferences,preference_id',
            'activity_name'  => 'required|string|max:100',
            'is_liked'       => 'nullable|boolean',
        ]);

        // 2. Create record
        $activity = TrainingActivity::create($data);

        // 3. Response JSON
        return response()->json([
            'message'  => 'Training activity saved',
            'activity' => $activity,
        ], 201);
    }
}