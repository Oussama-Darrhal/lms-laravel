<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::all();
        return Inertia::render('Course/Index', [
            'courses' => $courses,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Courses', 'url' => '/courses'],
            ],
        ]);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        $title = $course->titre;
        return Inertia::render('Course/Show', [
            'course' => $course,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Courses', 'url' => '/courses'],
                ['label' => $title, 'url' => $title],
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Course::create($request->all());

        return redirect()->route('courses.index')->with('success', 'Course created successfully!');
    }
}
