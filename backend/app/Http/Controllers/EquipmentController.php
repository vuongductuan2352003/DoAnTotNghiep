<?php
namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    /**
     * Store a newly created equipment item.
     *
     * Endpoint: POST /api/v1/equipment
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'preference_id'  => 'required|exists:training_preferences,preference_id',
            'equipment_name' => 'required|string|max:255',
        ]);

        $equipment = Equipment::create($data);

        return response()->json([
            'message'   => 'Equipment saved',
            'equipment' => $equipment,
        ], 201);
    }
}