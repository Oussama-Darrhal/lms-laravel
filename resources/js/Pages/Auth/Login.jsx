import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("login"); // State to manage active tab

    useEffect(() => {
        // Determine the active tab based on the current URL or route
        const currentPath = window.location.pathname; // Get current path
        if (currentPath.includes("register")) {
            setActiveTab("register");
        } else {
            setActiveTab("login");
        }
    }, []); // Runs once when the component mounts

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
                <div className="hidden md:flex md:w-1/2 relative m-10 bg-teal-600 rounded-3xl overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80"
                        alt="Classroom"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-teal-600/40" />
                    <div className="absolute bottom-16 left-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">Lorem Ipsum is simply</h2>
                        <p className="text-xl">Lorem Ipsum is simply</p>
                    </div>
                </div>

                {/* Right Half - Form Section */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold mb-2">Welcome to lorem..!</h1>
                            <p className="text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>

                        {/* Tab Section */}
                        <div className="flex justify-center p-1 bg-[#E8F2EF] rounded-full gap-1 mb-8 mx-auto max-w-xs">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'login'
                                    ? 'bg-[#63C5B5] text-white'
                                    : 'text-[#63C5B5]'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('register')}
                                className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'register'
                                    ? 'bg-[#63C5B5] text-white'
                                    : 'text-[#63C5B5]'
                                    }`}
                            >
                                Register
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">User name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your User name"
                                    className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your Password"
                                        className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-[#63C5B5] focus:ring-[#63C5B5]"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-gray-600 hover:text-[#63C5B5]"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-[#63C5B5] text-white rounded-full hover:bg-[#51a898] transition-colors text-sm font-medium"
                            >
                                {activeTab === 'login' ? 'Login' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
