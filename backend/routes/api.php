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
    Route::post('password/old/verify', [AuthController::class, 'verifyOldPassword']);
    Route::post('password/change', [AuthController::class, 'changePassword']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [UserController::class, 'profile']); // <-- ĐÚNG NHẤT
    Route::get('/{user_id}/full-info', [UserFullInfoController::class, 'show']);
});
