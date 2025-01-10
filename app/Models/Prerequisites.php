<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prerequisites extends Model
{
    protected $fillable = ["Essential_Requirements", "Recommended_Background" , "course_id"];

    protected $casts = [
        'Essential_Requirements' => 'array',
        'Recommended_Background' => 'array',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }

}
