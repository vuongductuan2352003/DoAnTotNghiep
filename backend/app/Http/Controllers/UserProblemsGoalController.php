<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProblemsGoal;

class UserProblemsGoalController extends Controller
{
    // Lưu 1 mục problem hoặc extra_goal
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'    => 'required|exists:users,user_id',
            'type'       => 'required|in:problem,extra_goal',
            'description'=> 'required|string',
        ]);

        $item = UserProblemsGoal::create($data);

        return response()->json([
            'message' => 'Lưu thành công',
            'data'    => $item
        ], 201);
    }
}
