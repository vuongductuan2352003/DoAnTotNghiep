<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    
    /**
     * Danh sách những user mà hiện tại user đang follow
     */
    public function followingList()
    {
        $user = Auth::user();
        $follows = Follow::with('followee')
                         ->where('follower_id', $user->user_id)
                         ->get();

        return response()->json($follows);
    }

    /**
     * Danh sách followers của user hiện tại
     */
    public function followerList()
    {
        $user = Auth::user();
        $followers = Follow::with('follower')
                           ->where('followee_id', $user->user_id)
                           ->get();

        return response()->json($followers);
    }

    /**
     * Toggle follow / unfollow
     * Nếu chưa follow => create; đã follow => unfollow (xóa record)
     */
    public function toggle(Request $request)
    {
        $request->validate([
            'followee_id' => 'required|integer|exists:users,user_id',
        ]);

        $user = Auth::user();
        $targetId = $request->followee_id;

        // Không cho follow chính mình
        if ($user->user_id == $targetId) {
            return response()->json(['message'=>'Không thể follow chính mình'], 400);
        }

        // Kiểm tra target có tồn tại và role = 'user' hay không (nếu bạn chỉ follow user, không follow admin)
        $targetUser = User::find($targetId);
        if (!$targetUser || $targetUser->role !== 'user') {
            return response()->json(['message'=>'Không tìm thấy người dùng hợp lệ để follow'], 404);
        }

        // Kiểm tra đã follow chưa
        $existing = Follow::where('follower_id', $user->user_id)
                          ->where('followee_id', $targetId)
                          ->first();

        if ($existing) {
            // Unfollow
            $existing->delete();
            return response()->json(['message'=>'Unfollow thành công','following'=>false]);
        } else {
            // Follow
            Follow::create([
                'follower_id' => $user->user_id,
                'followee_id' => $targetId,
            ]);
            return response()->json(['message'=>'Follow thành công','following'=>true], 201);
        }
    }
}
