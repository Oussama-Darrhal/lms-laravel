<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cart' => function () use ($request) {
                $cart = $this->getCart($request);
                if (!$cart)
                    return null;

                return [
                    'items' => $cart->items()
                        ->with('course:id,titre,price,image')
                        ->get()
                        ->map(fn($item) => [
                            'id' => $item->id,
                            'course' => [
                                'id' => $item->course->id,
                                'titre' => $item->course->titre,
                                'price' => $item->course->price,
                                'image' => $item->course->image,
                            ],
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'total' => $item->price * $item->quantity,
                        ]),
                    'total' => $cart->total(),
                ];
            },
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }

    protected function getCart(Request $request)
    {
        if ($request->user()) {
            return $request->user()->cart;
        }

        if ($sessionId = $request->session()->get('cart_session_id')) {
            return \App\Models\Cart::where('session_id', $sessionId)->first();
        }

        return null;
    }

}
