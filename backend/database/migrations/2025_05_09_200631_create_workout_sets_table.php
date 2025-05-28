<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('workout_sets', function (Blueprint $t) {
            $t->id();
            $t->foreignId('session_id')->constrained('workout_sessions')
              ->cascadeOnDelete();

            $t->string('exercise_name');                 // “Bench Press”
            $t->tinyInteger('set_order');                // 1,2,3…
            $t->decimal('weight_kg', 5, 2)->nullable();  // 0 nếu body-weight
            $t->tinyInteger('reps')->nullable();         // số lần lặp
            $t->tinyInteger('rpe')->nullable();          // RPE cho hiệp
            $t->unsignedSmallInteger('rest_sec')->nullable(); // nghỉ giây

            $t->timestamps();
            $t->unique(['session_id', 'set_order']);     // 1 hiệp → duy nhất trong buổi
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workout_sets');
    }
};
