<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserProfilesTable extends Migration
{
  public function up(): void
  {
    Schema::create('user_profiles', function (Blueprint $t) {
      $t->foreignId('user_id')
        ->primary()
        ->constrained()
        ->cascadeOnDelete()
        ->comment('ID người dùng, đồng thời là khóa chính');

      // Thông tin sinh học cố định
      $t->date('dob')
        ->nullable()
        ->comment('Ngày sinh');
      $t->enum('gender', ['male', 'female', 'other'])
        ->nullable()
        ->comment('Giới tính');

      // Thói quen & lịch tập
      $t->enum('experience_level', ['beginner', 'intermediate', 'advanced'])
        ->default('beginner')
        ->comment('Trình độ tập luyện');
      // trong migration user_profiles
      $t->json('workout_days')
        ->nullable()
        ->comment('Các ngày tập trong tuần, ví dụ ["monday","wednesday","friday"]');

      $t->smallInteger('session_duration_min')
        ->nullable()
        ->comment('Thời lượng mỗi buổi tập (phút)');
      $t->enum('preferred_time', ['morning', 'afternoon', 'evening', 'night'])
        ->nullable()
        ->comment('Khung giờ tập ưa thích');
      $t->enum('location', ['gym', 'home', 'mixed'])
        ->nullable()
        ->comment('Địa điểm tập');

      // Tùy chọn mở rộng
      $t->json('equipment')
        ->nullable()
        ->comment('Danh sách thiết bị tập');
      $t->json('health_condition')
        ->nullable()
        ->comment('Tình trạng sức khỏe đặc biệt');
      $t->string('dietary_preference')
        ->nullable()
        ->comment('Chế độ ăn uống ưa thích');
      $t->tinyInteger('sleep_hours')
        ->nullable()
        ->comment('Giờ ngủ trung bình mỗi đêm');
      $t->tinyInteger('hydration_level')
        ->nullable()
        ->comment('Mức độ uống nước hàng ngày');

      $t->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('user_profiles');
  }
}
