<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class TeachingMethod extends Model
{
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_teaching_methods');
    }
}
