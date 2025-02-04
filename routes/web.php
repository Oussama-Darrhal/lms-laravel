<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index'); // Show all courses
Route::get('/courses/{id}/enrolled', [CourseController::class, 'enrolled'])->name('courses.enrolled'); // Enroll in a course
Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create'); // Create a new course (admin/teacher only)
Route::post('/courses', [CourseController::class, 'store'])->name('courses.store'); // Save a new course
Route::get('/courses/{id}', [CourseController::class, 'show'])->name('courses.show'); // Show a specific course
Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->name('courses.edit'); // Edit a specific course
Route::put('/courses/{id}', [CourseController::class, 'update'])->name('courses.update'); // Update a specific course
Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy'); // Delete a course (admin only)
Route::post('/courses/{course}/bookmark', [CourseController::class, 'bookmark'])->name('courses.bookmark');
Route::post('/courses/{course}/unbookmark', [CourseController::class, 'unbookmark'])->name('courses.unbookmark');

Route::post('/create-checkout-session', [StripeController::class, 'createCheckoutSession']);
Route::get('/payment/{id}/success', [StripeController::class, 'success'])->name('payment.success');
Route::get('/payment/{id}/cancel', [StripeController::class, 'cancel'])->name('payment.cancel');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');
Route::get('/dashboard/courses', [CourseController::class, 'enrolled_index'])->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Routes for Testimonails
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
});

require __DIR__ . '/auth.php';
