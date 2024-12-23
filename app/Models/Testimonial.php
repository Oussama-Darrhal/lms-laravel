<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = "testimonials";  // This is the name of the table in the database

    protected $fillable = ['name', 'email', 'message', 'course_id'];  // These are the columns that can be filled by the user

    public function course()
    {
        return $this->belongsTo(Course::class); // This is the relationship between the testimonial and course
    }

    public function user()
    {
        return $this->belongsTo(User::class); // This is the relationship between the testimonial and the user
    }

}
