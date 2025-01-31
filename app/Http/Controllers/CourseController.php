<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    // Display a list of all courses
    public function index(Request $request)
    {
        // Retrieve search and category from the request query
        $search = $request->query('search');
        $category = $request->query('category');

        // Start the query for courses
        $query = Course::with('users:id,name,email'); // Eager load users with selected fields

        // If there's a category selected, filter courses by category first
        if ($category) {
            $query->where('category_id', $category);
        }

        // If there's a search term, apply the search filter (title or description)
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('titre', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Get the filtered courses
        $courses = $query->get();

        // Retrieve all categories
        $categories = Category::all();

        // Return the view with the courses and categories data
        return Inertia::render('Course/Index', [
            'courses' => $courses,
            'categories' => $categories,
            'breadcrumbs' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Courses', 'url' => '/courses'],
            ],
            'search' => $search,  // Pass search term to the view for re-populating the search bar
            'category' => $category,  // Pass selected category to the view for re-populating the category filter
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

        // Find The Users Enrolled In The Course
        $EnrolledUsers = $course->users;

        // Add user_courses and userCount as an element of the $user variable
        $user->setAttribute('user_courses', $user_courses);
        $user->setAttribute('userCount', $userCount);

        // load the testimonials for the course with their associated user data (name and role)
        $testimonials = $course->testimonials()->with('user:id,name,role,profile_picture')->get();

        // load the prerequisites of the course
        $prerequisites = $course->prerequisites()->get()->first();

        // load the description of the course
        $description = $course->description()->get()->first();

        $category = Category::findOrFail($course->category_id);

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
                "category_name" => $category->name,
                "EnrolledUsers" => $EnrolledUsers,
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

    // Bookmark a course
    public function bookmark(Course $course, Request $request)
    {
        $userId = $request->user()->id;

        // Add the user ID to the bookmarks array
        $bookmarks = $course->bookmarks ?? [];
        if (!in_array($userId, $bookmarks)) {
            $bookmarks[] = $userId;
            DB::table('courses')
                ->where('id', $course->id)
                ->update(['bookmarks' => $bookmarks]);
        }

        return redirect()->back();
    }

    // Unbookmark a course
    public function unbookmark(Course $course, Request $request)
    {
        $userId = $request->user()->id;

        // Remove the user ID from the bookmarks array
        $bookmarks = $course->bookmarks ?? [];
        $bookmarks = array_filter($bookmarks, fn($id) => $id !== $userId);

        DB::table('courses')
            ->where('id', $course->id)
            ->update(['bookmarks' => $bookmarks]);

        return redirect()->back();
    }

}
