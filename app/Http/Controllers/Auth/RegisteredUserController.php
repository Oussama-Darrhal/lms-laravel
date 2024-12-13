<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\WhitelistedEmail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function createTeacher(): Response
    {
        return Inertia::render('Auth/TeacherRegister');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    public function storeTeacher(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'subject' => 'required|string|max:255',
            'experience' => 'required|string|max:255',
        ]);

        $existingUser = User::where('email', $request->input('email'))->first();

        if ($existingUser) {
            // If the email already exists, send a message with instructions to contact support
            return back()->withErrors(['email' => 'This email is already registered. Please contact support for further assistance.']);
        }

        $email = $request->input('email');
        $whitelistedEmail = WhitelistedEmail::where('email', $email)->first();

        if (!$whitelistedEmail) {
            return back()->withErrors(['email' => 'This email is not authorized to register as a teacher.']);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'teacher',
            'subject' => 'required|string|max:255',
            'experience' => 'required|string|max:255',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
