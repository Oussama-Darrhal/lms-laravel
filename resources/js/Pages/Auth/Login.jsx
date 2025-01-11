import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex">
                {/* Left Half - Image Section */}
                <div className="hidden md:flex md:w-1/2 relative">
                    <div className="absolute inset-0 bg-blue-600 opacity-40" />
                    <div className="flex justify-center items-center h-full py-16"> {/* Added padding for spacing */}
                        <img
                            src="/images/classroom.jpg"
                            alt="Classroom"
                            className="object-cover max-h-[80%] rounded-lg" // Adjust max-height and added border radius
                        />
                    </div>
                    <div className="absolute bottom-16 left-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">Lorem Ipsum is simply</h2>
                        <p className="text-xl">Lorem Ipsum is simply</p>
                    </div>
                </div>

                {/* Right Half - Form Section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold mb-2">Welcome to lorem..!</h1>
                            <p className="text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>

                        <div className="flex justify-center space-x-4 mb-8">
                            <button className="px-8 py-2 bg-teal-400 text-white rounded-full">
                                Login
                            </button>
                            <Link
                                href={route("register")}
                                className="px-8 py-2 bg-teal-100 text-teal-600 rounded-full"
                            >
                                Register
                            </Link>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">User name</label>
                                <input
                                    type="email"
                                    placeholder="Enter your User name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your Password"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={data.remember}
                                        onChange={(e) => setData("remember", e.target.checked)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-gray-600 hover:underline"
                                    >
                                        Forgot Password ?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-teal-400 text-white py-3 rounded-lg hover:bg-teal-500 transition-colors"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
