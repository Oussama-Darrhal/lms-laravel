<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['guest'])->group(function () {
    // Courses
    Route::get('/courses', [CourseController::class, 'index'])->name('courses.index'); // Show all courses
    Route::get('/courses/enrolled', [CourseController::class, 'enrolled'])->name('courses.enrolled'); // Enroll in a course
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create'); // Create a new course (admin/teacher only)
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store'); // Save a new course
    Route::get('/courses/{id}', [CourseController::class, 'show'])->name('courses.show'); // Show a specific course
    Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->name('courses.edit'); // Edit a specific course
    Route::put('/courses/{id}', [CourseController::class, 'update'])->name('courses.update'); // Update a specific course
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy'); // Delete a course (admin only)
});

// Routes for Testimonails
Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
