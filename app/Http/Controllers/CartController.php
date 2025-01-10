<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function index()
    {
        $cart = $this->getOrCreateCart();

        return Inertia::render('Cart/Index', [
            'cart' => [
                'items' => $cart->items()->with('course')->get(),
                'total' => $cart->total()
            ]
        ]);
    }

    public function addItem(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = $this->getOrCreateCart();
        $course = Course::findOrFail($request->course_id);

        $existingItem = $cart->items()->where('course_id', $course->id)->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $request->quantity
            ]);
        } else {
            $cart->items()->create([
                'course_id' => $course->id,
                'quantity' => $request->quantity,
                'price' => $course->price
            ]);
        }

        return back()->with('success', 'Course added to cart');
    }

    public function removeItem(Request $request)
    {
        $cart = $this->getOrCreateCart();
        $cart->items()->where('id', $request->cart_item_id)->delete();

        return back()->with('success', 'Item removed from cart');
    }

    public function updateQuantity(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = $this->getOrCreateCart();
        $cart->items()->where('id', $request->cart_item_id)->update([
            'quantity' => $request->quantity
        ]);

        return back()->with('success', 'Cart updated');
    }

    protected function getOrCreateCart()
    {
        if (auth()->check()) {
            return Cart::firstOrCreate([
                'user_id' => auth()->id()
            ]);
        }

        $sessionId = session()->get('cart_session_id');
        if (!$sessionId) {
            $sessionId = Str::uuid();
            session()->put('cart_session_id', $sessionId);
        }

        return Cart::firstOrCreate([
            'session_id' => $sessionId
        ]);
    }

    public function mergeGuestCart()
    {
        if (!auth()->check() || !session()->has('cart_session_id')) {
            return;
        }

        $guestCart = Cart::where('session_id', session()->get('cart_session_id'))->first();
        if (!$guestCart) {
            return;
        }

        $userCart = Cart::firstOrCreate([
            'user_id' => auth()->id()
        ]);

        foreach ($guestCart->items as $item) {
            $existingItem = $userCart->items()->where('course_id', $item->course_id)->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantity' => $existingItem->quantity + $item->quantity
                ]);
            } else {
                $userCart->items()->create([
                    'course_id' => $item->course_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price
                ]);
            }
        }

        $guestCart->delete();
        session()->forget('cart_session_id');
    }
}
