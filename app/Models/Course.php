<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Course extends Model
{

    public function videos()
    {
        return $this->hasMany(Video::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('enrollment_date', 'progress_percentage', 'completion_status')
            ->withTimestamps();
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function teachingmethods(): BelongsToMany {
        return $this->BelongsToMany(TeachingMethod::class, 'course_teaching_methods');
    }

    public function prerequisites() {
        return $this->hasMany(Prerequisites::class);
    }

    public function getCourseStatistics()
    {
        $courses = Course::with('videos', 'students')->get();

        $coursesWithStats = $courses->map(function ($course) {
            $course->duration = $course->videos->sum('duration');
            $course->videos_count = $course->videos->count();
            $course->students_count = $course->students->count();
            return $course;
        });

        return $coursesWithStats;
    }

    public function description() {
        return $this->hasOne(Description::class);
    }

    protected $fillable = ['titre', 'description', 'image'];

}
