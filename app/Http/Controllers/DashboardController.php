<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Fetch all courses the user is enrolled in with progress
        $enrolledCourses = $user->courses()->withPivot('progress_percentage')->get();

        // Initialize variables for calculating overall progress
        $totalProgress = 0;
        $totalCourses = $enrolledCourses->count();
        $courseProgressData = [];

        // Calculate total progress and prepare course-wise progress data
        foreach ($enrolledCourses as $course) {
            $percentageCompleted = $course->pivot->progress_percentage; // Progress from pivot table
            $courseProgressData[] = [
                'course_id' => $course->id,
                'course_title' => $course->title,
                'progress' => $percentageCompleted,
            ];

            $totalProgress += $percentageCompleted;
        }

        // Calculate overall progress
        $overallProgress = $totalCourses > 0 ? $totalProgress / $totalCourses : 0;

        return Inertia::render(
            'Dashboard',
            [
                "overallProgress" => $overallProgress,
            ]
        );
    }
}
