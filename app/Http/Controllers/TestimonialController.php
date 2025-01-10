<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'user_id' => 'required|numeric',
            'rating' => 'required|numeric|min:1|max:6',
            'testimonial' => 'required|string|max:500',
        ]);

        // // Return the number back as a response
        // return response()->json([
        //     'success' => true,
        //     'user_id' => $validated['user_id'],
        //     'course_id' => $validated['course_id'],
        //     'rating' => $validated['rating'],
        //     'testimonial' => $validated['testimonial'],
        // ]);

        // Check if the user has already submitted a testimonial for the course
        $existingTestimonial = Testimonial::where('course_id', $validated['course_id'])
            ->where('user_id', auth()->id())
            ->first();

        if ($existingTestimonial) {
            // If a testimonial already exists, update it
            $existingTestimonial->update([
                'testimonial' => $validated['testimonial'],
                'rating' => $validated['rating'],
            ]);

            // Calculate the new average rating for the course and update it
            $averageRating = Testimonial::where('course_id', $validated['course_id'])->avg('rating');
            Course::where('id', $validated['course_id'])->update(['rating' => round($averageRating, 1)]);

            return redirect()->back()->with('success', 'Your testimonial has been updated!');
        }

        // Store the new testimonial
        Testimonial::create([
            'course_id' => $validated['course_id'],
            'user_id' => $validated['user_id'],
            'testimonial' => $validated['testimonial'],
            'rating' => $validated['rating'],
        ]);

        // Calculate the new average rating for the course and update it
        $averageRating = Testimonial::where('course_id', $validated['course_id'])->avg('rating');
        Course::where('id', $validated['course_id'])->update(['rating' => round($averageRating, 1)]);

        return redirect()->back()->with('success', 'Your testimonial has been submitted!');
    }
}
