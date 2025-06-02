<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    

    /**
     * Lấy danh sách notifications của user (mới nhất trước)
     */
    public function index()
    {
        $user = Auth::user();
        $notifs = Notification::where('user_id', $user->user_id)
                              ->orderBy('created_at', 'desc')
                              ->paginate(20);

        return response()->json($notifs);
    }

    /**
     * Đánh dấu 1 notification là đã đọc
     */
    public function markAsRead(Request $request, $notificationId)
    {
        $user = Auth::user();
        $notif = Notification::where('notification_id', $notificationId)
                             ->where('user_id', $user->user_id)
                             ->first();
        if (!$notif) {
            return response()->json(['message'=>'Notification không tồn tại'], 404);
        }

        $notif->is_read = true;
        $notif->save();

        return response()->json(['message'=>'Đã đánh dấu là đã đọc']);
    }

    /**
     * Xóa 1 notification (nếu muốn)
     */
    public function destroy($notificationId)
    {
        $user = Auth::user();
        $notif = Notification::where('notification_id', $notificationId)
                             ->where('user_id', $user->user_id)
                             ->first();
        if (!$notif) {
            return response()->json(['message'=>'Notification không tồn tại'], 404);
        }

        $notif->delete();
        return response()->json(['message'=>'Xóa notification thành công']);
    }
}
