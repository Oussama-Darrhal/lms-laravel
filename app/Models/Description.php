<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Description extends Model
{
    protected $fillable = ["content" ,"course_id"];

    public function course() {
        return $this->belongsTo(Course::class);
    }

}
