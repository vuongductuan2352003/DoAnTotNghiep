<?php

namespace App\Http\Controllers;

use App\Models\RegionFocus;
use Illuminate\Http\Request;

class RegionFocusController extends Controller
{
    /**
     * Store a newly created region focus.
     * Endpoint: POST /api/v1/region-focus
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'preference_id' => 'required|exists:training_preferences,preference_id',
            'focus_area'    => 'required|string|max:255',
        ]);

        $focus = RegionFocus::create($data);

        return response()->json([
            'message' => 'Region focus saved',
            'focus'   => $focus,
        ], 201);
    }
}