<?php
namespace App\Http\Controllers;

use App\Models\WeeklySession;
use Illuminate\Http\Request;

class WeeklySessionController extends Controller
{
    /**
     * Store a newly created weekly session.
     * Method: POST /api/v1/weekly-sessions
     */
    public function store(Request $request)
    {
        // 1. Validate incoming data
        $data = $request->validate([
            'preference_id' => 'required|exists:training_preferences,preference_id',
            'day_of_week'   => 'required|string|max:50',
        ]);

        // 2. Create record
        $session = WeeklySession::create($data);

        // 3. Response JSON
        return response()->json([
            'message' => 'Weekly session saved',
            'session' => $session,
        ], 201);
    }
}
