<?php
namespace App\Http\Controllers;

use App\Models\PreferredFood;
use Illuminate\Http\Request;

class PreferredFoodController extends Controller
{
    /**
     * Store a newly created preferred food.
     * Endpoint: POST /api/v1/preferred-foods
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'food_pref_id'  => 'required|exists:food_preferences,food_pref_id',
            'food_category' => 'required|string|max:100',
            'food_item'     => 'required|string|max:255',
        ]);

        $preferred = PreferredFood::create($data);

        return response()->json([
            'message'       => 'Preferred food saved',
            'preferredFood' => $preferred,
        ], 201);
    }
}