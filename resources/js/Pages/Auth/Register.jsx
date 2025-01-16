import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Head, useForm } from "@inertiajs/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import InputError from "@/Components/InputError";
import { router } from '@inertiajs/react';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.7, ease: "easeInOut" },
    },
};

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("register");

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex overflow-hidden">
                {/* Left Half - Image Section */}
                <motion.div
                    className="hidden md:flex md:w-1/2 relative m-10 bg-teal-600 rounded-3xl overflow-hidden"
                    variants={sectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <img
                        src="images/lukas-blazek-GnvurwJsKaY-unsplash.jpg"
                        alt="Classroom"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-teal-600/40" />
                    <div className="absolute bottom-16 left-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">Join Us Today!</h2>
                        <p className="text-xl">Start your learning journey.</p>
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
                            <h1 className="text-2xl font-semibold mb-2">Create Your Account</h1>
                            <p className="text-gray-600">Join us to access tailored courses and guidance.</p>
                        </div>

                        <div className="flex justify-center p-1 bg-[#E8F2EF] rounded-full gap-1 mb-8 mx-auto max-w-xs">
                            <motion.button
                                onClick={() => {
                                    setActiveTab('login');
                                    router.visit('/login'); // Redirect to login page
                                }}
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Full Name:</label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="text"
                                    placeholder="Enter your Full Name"
                                    className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Email:</label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="email"
                                    placeholder="Enter your Email"
                                    className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Password</label>
                                <div className="relative">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
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
                                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-gray-600 text-sm mb-2">Confirm Password</label>
                                <div className="relative">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your Password"
                                        className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                    </button>
                                </div>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                type="submit"
                                className="w-full px-6 py-3 bg-[#63C5B5] text-white rounded-full hover:bg-[#51a898] transition-colors text-sm font-medium"
                            >
                                Sign Up
                            </motion.button>
                        </form>

                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Register;
