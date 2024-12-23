<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{

    public function videos()
    {
        return $this->hasMany(Video::class);
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

    protected $fillable = ['titre', 'description', 'image'];

}
