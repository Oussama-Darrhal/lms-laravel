<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = "testimonials";  // This is the name of the table in the database

    protected $fillable = [
        'course_id',
        'user_id',
        'testimonial',
        'rating',
    ];   // These are the columns that can be filled by the user

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
