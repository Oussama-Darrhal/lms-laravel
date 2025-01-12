import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Head, useForm } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.7, ease: "easeInOut" } },
};

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("register")) {
            setActiveTab("register");
        } else {
            setActiveTab("login");
        }

        // Hide overflow when the component mounts
        document.body.style.overflow = "hidden";

        // Cleanup function to restore overflow when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

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
                <motion.div
                    className="hidden md:flex md:w-1/2 relative m-10 bg-teal-600 rounded-3xl overflow-hidden"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <img
                        src="images/classroom.jpg"
                        alt="Classroom"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-teal-600/40" />
                    <div className="absolute bottom-16 left-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">Lorem Ipsum is simply</h2>
                        <p className="text-xl">Lorem Ipsum is simply</p>
                    </div>
                </motion.div>

                {/* Right Half - Form Section */}
                <motion.div
                    className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold mb-2">Welcome to lorem..!</h1>
                            <p className="text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                        </div>

                        <div className="flex justify-center p-1 bg-[#E8F2EF] rounded-full gap-1 mb-8 mx-auto max-w-xs">
                            <motion.button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'login' ? 'bg-[#63C5B5] text-white' : 'text-[#63C5B5]'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                Login
                            </motion.button>
                            <motion.button
                                onClick={() => setActiveTab('register')}
                                className={`flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'register' ? 'bg-[#63C5B5] text-white' : 'text-[#63C5B5]'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                Register
                            </motion.button>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Email:</label>
                                <motion.input
                                    type="text"
                                    placeholder="Enter your Email"
                                    className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Password</label>
                                <div className="relative">
                                    <motion.input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your Password"
                                        className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        whileFocus={{ scale: 1.02 }}
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

                            <motion.button
                                type="submit"
                                className="w-full px-6 py-3 bg-[#63C5B5] text-white rounded-full hover:bg-[#51a898] transition-colors text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                            >
                                {activeTab === 'login' ? 'Login' : 'Register'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Login;
