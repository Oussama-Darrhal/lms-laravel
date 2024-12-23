<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    // Display a list of all courses
    public function index()
    {
        // Fetch all courses from the database
        $courses = Course::all();

        // Return the 'Course/Index' view with the courses data and breadcrumb navigation
        return Inertia::render('Course/Index', [
            'courses' => $courses,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Courses', 'url' => '/courses'],
            ],
        ]);
    }

    // Display a success page for enrolling in a course
    public function enrolled()
    {
        // Return the 'Course/Success' view to indicate successful enrollment
        return Inertia::render('Course/Success');
    }

    // Display the details of a specific course by ID
    public function show($id)
    {
        // Find the course by ID, or fail if not found
        $course = Course::findOrFail($id);

        // Eager load the testimonials for the course with their associated user data (name and role)
        $testimonials = $course->testimonials()->with('user:id,name,role')->get();

        // Return the 'Course/Show' view with the course data, testimonials, and breadcrumb navigation
        return Inertia::render('Course/Show', [
            'course' => $course,
            'testimonials' => $testimonials,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Courses', 'url' => '/courses'],
                ['label' => $course->titre, 'url' => $course->titre],
            ],
        ]);
    }

    // Store a new course in the database
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string|max:255', // Ensure title is a string and not longer than 255 characters
            'description' => 'required|string',  // Ensure description is a string
        ]);

        // Create a new course in the database with the validated data
        Course::create($request->all());

        // Redirect the user to the course index page with a success message
        return redirect()->route('courses.index')->with('success', 'Course created successfully!');
    }
}
