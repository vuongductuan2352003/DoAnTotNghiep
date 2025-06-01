<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
 protected $primaryKey = 'user_id'; 
    protected $fillable = [
        'username',
        
        'name',
       'gender',
       'age',
        'bio',
        'avatar_path',
        'website',
        'is_private',
        'followers_count',
        'following_count',
        'posts_count',
        'birth',
        'email',
        'password',
        'email_verified_at',

        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth'             => 'date',
            'is_private'        => 'boolean',
        ];
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // 2) Phương thức trả về custom claims (nếu có), ở đây để trống
    public function getJWTCustomClaims(): array
    {
        return [];
    }
    
    public function bodyMeasurements() { return $this->hasMany(BodyMeasurement::class, 'user_id'); }
public function fitnessGoals() { return $this->hasMany(FitnessGoal::class, 'user_id'); }
public function trainingPreferences() { return $this->hasMany(TrainingPreference::class, 'user_id'); }
public function foodPreferences() { return $this->hasMany(FoodPreference::class, 'user_id'); }
public function lifestyleHabits() { return $this->hasMany(LifestyleHabit::class, 'user_id'); }
public function currentHealthMetrics() { return $this->hasMany(CurrentHealthMetric::class, 'user_id'); }
public function projectedHealthMetrics() { return $this->hasMany(ProjectedHealthMetric::class, 'user_id'); }
public function userProblemsGoals() { return $this->hasMany(UserProblemsGoal::class, 'user_id'); }

}
