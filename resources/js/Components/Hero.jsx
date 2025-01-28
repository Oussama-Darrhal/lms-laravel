import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Define reusable animation variants for the Hero section
const textSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3 } },
};

const Hero = () => (
    <div className="w-full bg-[#1d1f53] text-white">
        <div className="mx-auto max-w-[200rem] px-4 sm:px-6 lg:px-8 pt-16 pb-24">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-52">
                {/* Text Section */}
                <motion.div
                    variants={textSectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
                    className="lg:w-1/2 space-y-6"
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                        Unlock Your Potential with Instructly
                    </h1>
                    <p className="text-white/80 text-lg sm:text-xl">
                        [Instructly] offers a comprehensive, free online
                        training platform designed to help you acquire the
                        skills necessary for a successful career in technology.
                        Join us and take the next step toward your professional
                        growth.
                    </p>
                    <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                    >
                        <a
                            href="/courses"
                            className="px-6 py-3 bg-[#fdd981] text-[#1d1f53] rounded font-medium hover:bg-[#fdd981]/90 text-center w-full sm:w-auto"
                        >
                            Explore Courses
                        </a>
                        <a
                            href="/path"
                            className="flex items-center justify-center sm:justify-start gap-2 text-white hover:text-white/80 text-center w-full sm:w-auto"
                        >
                            View Learning Path{" "}
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Image or Illustration Section */}
                <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="lg:w-1/2 pr-[1.4rem] mt-8 lg:mt-0 hidden lg:block"
                >
                    <div className="relative">
                        {/* Background Overlay Container */}
                        <div className="relative bg-white/10 rounded-lg p-6 shadow-lg">
                            {/* Status Dots (for a more technical or professional look) */}
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-[#ff605c]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd44]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#00ca4e]"></div>
                            </div>
                            {/* Placeholder Content for Progress or Loading */}
                            <div className="space-y-3">
                                <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                <div className="h-2 bg-white/20 rounded w-2/3"></div>
                                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                                <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                                <div className="h-2 bg-white/20 rounded w-2/3"></div>
                                <div className="h-2 bg-white/20 rounded w-1/2"></div>
                                <div className="h-2 bg-white/20 rounded w-2/3"></div>
                                <div className="h-2 bg-white/20 rounded w-3/4"></div>
                            </div>
                        </div>
                        {/* Icon/Illustration Container */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#fdd981] rounded-lg flex items-center justify-center text-2xl">
                            {/* Example Icon or Illustration */}
                            <span className="text-[#1d1f53]">🚀</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
);


const FullDesign = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-12">
                            <h1 className="text-3xl font-bold text-gray-800">TOTC</h1>
                            <div className="hidden lg:flex space-x-8">
                                {['Home', 'Courses', 'Careers', 'Blog', 'About Us'].map((item) => (
                                    <a key={item} className="text-gray-600 hover:text-blue-600 transition-colors">
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <button className="text-gray-600 hover:text-blue-600">Login</button>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Section */}
            <main className="max-w-7xl mx-auto px-4 py-12 lg:flex lg:gap-12">
                {/* Left Content */}
                <div className="lg:w-1/2 mb-12 lg:mb-0 space-y-8">
                    <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                        Studying Online is Now Much Easier
                    </h1>

                    <p className="text-lg text-gray-600">
                        TOTC is an interesting platform that will teach you in more an interactive way
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
                            Join for free
                        </button>
                        <button className="border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-400">
                            Watch how it works
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mt-12">
                        <span className="text-4xl font-bold text-gray-800">250k</span>
                        <span className="text-lg text-gray-600">Assisted Student</span>
                    </div>
                </div>

                {/* Right Section with Character and Notifications */}
                <div className="lg:w-1/2 relative bg-[#49babc] rounded-3xl min-h-[600px] overflow-hidden">
                    {/* Floating Notifications */}
                    <div className="absolute top-20 left-8 animate-float">
                        <div className="bg-white p-4 rounded-xl shadow-lg w-48">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-semibold">Admission Confirmed</span>
                            </div>
                            <p className="text-xs text-gray-600">UX Course</p>
                        </div>
                    </div>

                    <div className="absolute top-48 right-8 animate-float delay-100">
                        <div className="bg-white p-4 rounded-xl shadow-lg w-48">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-semibold">New Lesson Added</span>
                            </div>
                            <p className="text-xs text-gray-600">Check schedule</p>
                        </div>
                    </div>

                    <div className="absolute bottom-32 left-1/4 animate-float delay-200">
                        <div className="bg-white p-4 rounded-xl shadow-lg w-48">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm font-semibold">Deadline Reminder</span>
                            </div>
                            <p className="text-xs text-gray-600">Assignment 1</p>
                        </div>
                    </div>

                    {/* Thinking Girl Character */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80">
                        <img
                            src="/thinking-girl.png" // Replace with your image path
                            alt="Thinking girl"
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Modern Half Circle Design */}
                    <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-[#49babc] rounded-full"></div>
                </div>
            </main>

            {/* Custom Animations */}
            <style jsx global>{`
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(-2deg); }
                50% { transform: translateY(-20px) rotate(2deg); }
            }
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
            .delay-100 {
                animation-delay: 1s;
            }
            .delay-200 {
                animation-delay: 2s;
            }
        `}</style>
        </div>
    );
};

export default FullDesign;
