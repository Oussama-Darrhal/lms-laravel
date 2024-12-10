import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { GoArrowLeft } from "react-icons/go";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex flex-col p-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold w-fit"
                >
                    <GoArrowLeft className="text-2xl" />
                    <span className="text-gray-600">HomePage</span>
                </Link>

                <div className="flex flex-col md:flex-row flex-1 mt-4 bg-gray-200">
                    {/* Left Half - Image Section */}
                    <div className="relative w-full md:w-1/2 min-h-[300px] md:h-auto">
                        <div className="absolute inset-0 bg-[url('/images/lukas-blazek-GnvurwJsKaY-unsplash.jpg')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-[#1d1f53] bg-opacity-70" />
                        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Welcome Back to Learning!
                            </h3>
                            <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-lg">
                                Log in to access your courses, track your
                                progress, and continue your learning journey
                                with us.
                            </p>
                        </div>
                    </div>

                    {/* Right Half - Form Section */}
                    <div className="w-full md:w-1/2 bg-[#1d1f53] p-6 md:p-12 flex flex-col justify-center">
                        <div className="max-w-md w-full mx-auto">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Login
                            </h1>
                            <p className="text-sm md:text-base text-gray-300 mb-8">
                                Access your account to continue learning.
                            </p>
                            <form onSubmit={submit} className="space-y-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center text-sm text-gray-300">
                                        <Checkbox
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                        <span className="ml-2">
                                            Remember Me
                                        </span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-[#fcd881] underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#fcd881] text-[#1d1f53] font-bold p-3 md:p-4 rounded-lg hover:bg-[#fcd881]/90 transition-colors mt-6"
                                >
                                    Log In
                                </button>
                                <p className="text-center text-white text-sm md:text-base mt-4">
                                    Don't Have An Account?{" "}
                                    <Link
                                        href="/register"
                                        className="text-[#fcd881] underline"
                                    >
                                        Register Here!
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
