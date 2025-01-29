<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    // Display a list of all courses
    public function index(Request $request)
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $query = Course::query();

        if ($search) {
            $query->where('titre', 'like', "%{$search}%") // Adjust column name if needed
                ->orWhere('description', 'like', "%{$search}%"); // Adjust column name if needed
        }

        if ($category) {
            $query->where('category_id', $category);
        }

        $courses = $query->get();

        $categories = Category::all();

        return Inertia::render('Course/Index', [
            'courses' => $courses,
            'categories' => $categories,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Courses', 'url' => '/courses'],
            ],
        ]);
    }

    // Display a success page for enrolling in a course
    public function enrolled($id)
    {
        $course = Course::findOrFail($id);

        return Inertia::render(
            'Course/Success',
            [
                "course" => $course,
            ]
        );
    }

    // Display the details of a specific course by ID
    public function show($id)
    {
        // Find the course by ID
        $course = Course::findOrFail($id);

        // Find the Teacher by ID
        $user = User::findOrFail($course->teacher_id);

        // Find The Number Of Courses Made By The Teacher
        $user_courses = Course::where("teacher_id", $user->id)->count();

        // Find The Number Of Users Enrolled In The Course
        $userCount = $course->enrollments()->count();

        // Add user_courses and userCount as an element of the $user variable
        $user->setAttribute('user_courses', $user_courses);
        $user->setAttribute('userCount', $userCount);

        // load the testimonials for the course with their associated user data (name and role)
        $testimonials = $course->testimonials()->with('user:id,name,role,profile_picture')->get();

        // load the prerequisites of the course
        $prerequisites = $course->prerequisites()->get()->first();

        // load the description of the course
        $description = $course->description()->get()->first();

        // Return the 'Course/Show' view with the course data, testimonials, and breadcrumb navigation
        return Inertia::render(
            'Course/Show',
            [
                'course' => $course,
                'user' => $user,
                'testimonials' => $testimonials,
                'prerequisites' => $prerequisites,
                'description' => $description,
                'teachingMethods' => $course->teachingmethods,
                'breadcrumbs' => [
                    ['label' => 'Home', 'url' => '/'],
                    ['label' => 'Courses', 'url' => '/courses'],
                    ['label' => $course->titre, 'url' => $course->titre],
                ],
            ]
        );
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
