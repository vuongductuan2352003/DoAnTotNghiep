<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BmiCategoryController;
use App\Http\Controllers\MetricsController;
use App\Http\Controllers\BodyMeasurementController;  
use App\Http\Controllers\FitnessGoalController;
use App\Http\Controllers\TrainingPreferenceController;
use App\Http\Controllers\TrainingActivityController;
use App\Http\Controllers\WeeklySessionController;
use App\Http\Controllers\OtherActivityController;
use App\Http\Controllers\RegionFocusController;
use App\Http\Controllers\SportController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\FoodPreferenceController;
use App\Http\Controllers\PreferredFoodController;
use App\Http\Controllers\CurrentHealthMetricsController;
use App\Http\Controllers\LifestyleHabitController;
use App\Http\Controllers\ProjectedHealthMetricController;
use App\Http\Controllers\UserProblemsGoalController;
use App\Http\Controllers\ProjectedMetricsController;
use App\Http\Controllers\UserFullInfoController;
use App\Http\Controllers\UserController;

use App\Http\Controllers\UserAdminController;
use App\Http\Controllers\BmiCategoryAdminController;


use App\Http\Controllers\PostController;
use App\Http\Controllers\HeartController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentHeartController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\NotificationController;
// ==================== PUBLIC ROUTES ====================
Route::prefix('auth')->group(function () {
    Route::get('check-username', [AuthController::class, 'checkUsername']);
    Route::post('register/send-otp', [AuthController::class, 'sendOTP']);
    Route::post('register/resend-otp', [AuthController::class, 'resendCode']);
    Route::post('register/verify-otp', [AuthController::class, 'VerifyRegister']);
    Route::post('register/set-password', [AuthController::class, 'setPassword']);
    Route::post('login', [AuthController::class, 'login']);
    // Forgot password
    Route::post('password/forgot/send-otp', [AuthController::class, 'sendForgotPasswordOtp']);
    Route::post('password/forgot/resend-otp', [AuthController::class, 'resendForgotPasswordOtp']);
    Route::post('password/forgot/verify', [AuthController::class, 'verifyForgotPasswordOtp']);
    Route::post('password/forgot/reset', [AuthController::class, 'resetPassword']);
});

// Các API công khai khác (nếu có)
Route::prefix('v1')->group(function () {
    Route::get('bmi-categories', [BmiCategoryController::class, 'index']);
    Route::get('bmi-categories/{id}', [BmiCategoryController::class, 'show'])->whereNumber('id');
    Route::get('bmi', [BmiCategoryController::class, 'byValue']);
    Route::get('metrics', [MetricsController::class, 'compute']);
    Route::post('body-measurements', [BodyMeasurementController::class, 'store']);
    Route::post('fitness-goals', [FitnessGoalController::class, 'store']);
    Route::post('training-preferences', [TrainingPreferenceController::class, 'store']);
    Route::post('training-activities', [TrainingActivityController::class, 'store']);
    Route::post('weekly-sessions', [WeeklySessionController::class, 'store']);
    Route::post('other-activities', [OtherActivityController::class, 'store']);
    Route::post('region-focus', [RegionFocusController::class, 'store']);
    Route::post('sports', [SportController::class, 'store']);
    Route::post('equipment', [EquipmentController::class, 'store']);
    Route::post('food-preferences', [FoodPreferenceController::class, 'store']);
    Route::post('preferred-foods', [PreferredFoodController::class, 'store']);
    Route::post('current-health-metrics', [CurrentHealthMetricsController::class, 'store']);
    Route::post('lifestyle-habits', [LifestyleHabitController::class, 'store']);
    Route::post('projected-metrics', [ProjectedMetricsController::class, 'compute']);
    Route::post('projected-health-metrics', [ProjectedHealthMetricController::class, 'store']);
    Route::post('user-problems-goals', [UserProblemsGoalController::class, 'store']);
    
});

// ==================== PROTECTED ROUTES (CẦN LOGIN) ====================
Route::middleware('auth:api')->prefix('user')->group(function () {
    // --------- Các route sẵn có cho User Profile, Authentication ---------
    Route::post('password/old/verify', [AuthController::class, 'verifyOldPassword']);
    Route::post('password/change',     [AuthController::class, 'changePassword']);
    Route::post('refresh',             [AuthController::class, 'refresh']);
    Route::post('logout',              [AuthController::class, 'logout']);
    Route::get('profile',              [UserController::class, 'profile']);
    Route::get('{user_id}/full-info',  [UserFullInfoController::class, 'show']);

    // ========== NHÓM ROUTES CHO SOCIAL MODULE (Posts, Hearts, Comments, Follows, Notifications) ==========

    // 1) POSTS
    //    GET    /user/posts                 => danh sách bài viết (index)
    //    GET    /user/posts/{id}            => chi tiết 1 bài viết (show)
    //    POST   /user/posts                 => tạo bài viết mới (store)
    //    PUT    /user/posts/{id}            => cập nhật bài viết (update)
    //    DELETE /user/posts/{id}            => xóa bài viết (destroy)
    Route::get('/posts',        [PostController::class, 'index']);
    Route::get('/posts/{id}',   [PostController::class, 'show']);
    Route::post('/posts',       [PostController::class, 'store']);
    Route::put('/posts/{id}',   [PostController::class, 'update']);
    Route::delete('/posts/{id}',[PostController::class, 'destroy']);

    // 2) HEARTS (toggle tim cho bài viết)
    //    POST /user/hearts/toggle          => thả tim / bỏ tim cho bài viết
    Route::post('/hearts/toggle', [HeartController::class, 'toggle']);

    // 3) COMMENTS (theo cấp độ post)
    //    GET    /user/posts/{postId}/comments                 => danh sách comment của post (index)
    //    GET    /user/posts/{postId}/comments/{commentId}     => chi tiết 1 comment (show)
    //    POST   /user/posts/{postId}/comments                 => tạo comment (store)
    //    PUT    /user/posts/{postId}/comments/{commentId}     => cập nhật comment (update)
    //    DELETE /user/posts/{postId}/comments/{commentId}     => xóa comment (destroy)
    Route::get('/posts/{postId}/comments',                   [CommentController::class, 'index']);
    Route::get('/posts/{postId}/comments/{commentId}',       [CommentController::class, 'show']);
    Route::post('/posts/{postId}/comments',                  [CommentController::class, 'store']);
    Route::put('/posts/{postId}/comments/{commentId}',       [CommentController::class, 'update']);
    Route::delete('/posts/{postId}/comments/{commentId}',    [CommentController::class, 'destroy']);

    // 4) COMMENT HEARTS (toggle tim cho comment)
    //    POST /user/comment-hearts/toggle    => thả tim / bỏ tim cho comment
    Route::post('/comment-hearts/toggle', [CommentHeartController::class, 'toggle']);

    // 5) FOLLOWS (theo dõi / bỏ theo dõi)
    //    GET  /user/follows/following    => danh sách những ai bạn đang follow
    //    GET  /user/follows/followers    => danh sách những ai đang follow bạn
    //    POST /user/follows/toggle       => toggle follow/unfollow
    Route::get('/follows/following', [FollowController::class, 'followingList']);
    Route::get('/follows/followers', [FollowController::class, 'followerList']);
    Route::post('/follows/toggle',    [FollowController::class, 'toggle']);

    // 6) NOTIFICATIONS (Thông báo)
    //    GET    /user/notifications             => lấy danh sách thông báo
    //    PUT    /user/notifications/{id}/read   => đánh dấu 1 thông báo đã đọc
    //    DELETE /user/notifications/{id}        => xóa 1 thông báo
    Route::get('/notifications',               [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read',     [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{id}',       [NotificationController::class, 'destroy']);
});

// ==================== ADMIN ROUTES (CẦN ROLE=admin) ====================
Route::middleware(['auth:api'])->prefix('admin')->group(function () {
    // Quản lý Người dùng
    Route::get('users',             [UserAdminController::class, 'index']);
    Route::get('users/{id}',        [UserAdminController::class, 'show'])->whereNumber('id');
    Route::post('users',            [UserAdminController::class, 'store']);
    Route::put('users/{id}',        [UserAdminController::class, 'update'])->whereNumber('id');
    Route::delete('users/{id}',     [UserAdminController::class, 'destroy'])->whereNumber('id');

    // Quản lý BMI Categories
    Route::get('bmi-categories',          [BmiCategoryAdminController::class, 'index']);
    Route::get('bmi-categories/{id}',     [BmiCategoryAdminController::class, 'show'])->whereNumber('id');
    Route::post('bmi-categories',         [BmiCategoryAdminController::class, 'store']);
    Route::put('bmi-categories/{id}',     [BmiCategoryAdminController::class, 'update'])->whereNumber('id');
    Route::delete('bmi-categories/{id}',  [BmiCategoryAdminController::class, 'destroy'])->whereNumber('id');
});