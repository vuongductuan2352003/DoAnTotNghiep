<?php
namespace App\Http\Controllers;

use App\Models\Sport;
use Illuminate\Http\Request;

class SportController extends Controller
{
    /**
     * Store a newly created sport activity.
     * Endpoint: POST /api/v1/sports
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'preference_id' => 'required|exists:training_preferences,preference_id',
            'sport_name'    => 'required|string|max:255',
        ]);

        $sport = Sport::create($data);

        return response()->json([
            'message' => 'Sport saved',
            'sport'   => $sport,
        ], 201);
    }
}