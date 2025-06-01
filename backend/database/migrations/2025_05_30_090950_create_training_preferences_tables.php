<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 4. Bảng sở thích tập luyện (training_preferences)
        Schema::create('training_preferences', function (Blueprint $table) {
            $table->increments('preference_id');
            $table->integer('user_id')->unsigned();
            $table->string('location', 255)->nullable();
            $table->string('training_frequency_past', 100)->nullable();
            $table->string('duration_minutes', 50)->nullable();
            $table->string('time_preference', 50)->nullable();
            $table->string('pushups_range', 50)->nullable();
            $table->string('pullups_ability', 255)->nullable();
            $table->string('daily_routine', 255)->nullable();
            $table->text('injuries')->nullable(); // Lưu dưới dạng chuỗi JSON hoặc chuỗi phân tách
            $table->text('problems')->nullable(); // Lưu dưới dạng chuỗi JSON hoặc chuỗi phân tách
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        // 5. Bảng chi tiết sở thích tập luyện (training_activities)
        Schema::create('training_activities', function (Blueprint $table) {
            $table->increments('activity_detail_id');
            $table->integer('preference_id')->unsigned();
            $table->string('activity_name', 100);
            $table->boolean('is_liked')->nullable();
            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
            $table->timestamps();
        });

        // 6. Bảng tuần tập luyện (weekly_sessions)
        Schema::create('weekly_sessions', function (Blueprint $table) {
            $table->increments('session_id');
            $table->integer('preference_id')->unsigned();
            $table->string('day_of_week', 50);
            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
            $table->timestamps();
        });

        // 7. Bảng khu vực tập trung (region_focus)
        Schema::create('region_focus', function (Blueprint $table) {
            $table->increments('region_id');
            $table->integer('preference_id')->unsigned();
            $table->string('focus_area', 255);
            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
            $table->timestamps();
        });

        // 8. Bảng thể thao (sports)
        Schema::create('sports', function (Blueprint $table) {
            $table->increments('sport_id');
            $table->integer('preference_id')->unsigned();
            $table->string('sport_name', 255);
            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
            $table->timestamps();
        });

        // 9. Bảng hoạt động khác (other_activities)
        Schema::create('other_activities', function (Blueprint $table) {
            $table->increments('other_activity_id');
            $table->integer('preference_id')->unsigned();
            $table->string('activity_name', 255);
            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
            $table->timestamps();
        });

        // 10. Bảng dụng cụ tập luyện (equipment)
        Schema::create('equipment', function (Blueprint $table) {
            $table->increments('equipment_id');
            $table->integer('preference_id')->unsigned();
            $table->string('equipment_name', 255);
            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
        Schema::dropIfExists('other_activities');
        Schema::dropIfExists('sports');
        Schema::dropIfExists('region_focus');
        Schema::dropIfExists('weekly_sessions');
        Schema::dropIfExists('training_activities');
        Schema::dropIfExists('training_preferences');
    }
};