<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $request->course_name,
                        ],
                        'unit_amount' => $request->course_price * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('payment.success', parameters: $request->course_id),
            'cancel_url' => route('courses.show', $request->course_id),
        ]);

        return Inertia::location($session->url); // Redirect to Stripe Checkout
    }

    public function success($id)
    {
        $course = Course::findOrFail($id);

        return Inertia::render(
            'Course/Success',
            [
                "course" => $course,
            ]
        );
    }
}
