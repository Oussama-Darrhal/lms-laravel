<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $table = "course_user";

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
