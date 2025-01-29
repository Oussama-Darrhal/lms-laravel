import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

const textSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3 } },
};

const Hero = () => (
    <div className="w-full bg-gradient-to-b from-[#f8f9ff] to-[#e6e9ff] min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                {/* Text Section */}
                <motion.div
                    variants={textSectionVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="lg:w-1/2 space-y-8"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#2a2d72] to-[#6366f1] bg-clip-text text-transparent leading-tight">
                        Unlock Your Potential with TOTC
                    </h1>
                    <p className="text-[#4a4b6d]/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                        Master in-demand tech skills through interactive learning experiences
                        and AI-powered mentorship. Transform your career today.
                    </p>

                    <motion.div
                        variants={buttonVariants}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/courses"
                            className="px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <PlayCircle className="w-6 h-6" />
                            Start Learning Free
                        </motion.a>
                        <motion.a
                            whileHover={{ x: 5 }}
                            href="/path"
                            className="flex items-center gap-2 text-[#4a4b6d] hover:text-[#6366f1] text-lg font-medium group"
                        >
                            Explore Learning Paths
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </motion.a>
                    </motion.div>

                    {/* Stats & Notifications */}
                    <motion.div
                        variants={cardVariants}
                        className="space-y-6 mt-12"
                    >
                        <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-[#e0e7ff]">
                            <span className="text-[#6366f1] font-semibold text-lg">
                                250,000+ Successful Students
                            </span>
                        </div>

                        <motion.div
                            whileHover={{ y: -2 }}
                            className="bg-[#6366f1]/10 p-6 rounded-2xl border border-[#6366f1]/20 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-[#6366f1] text-white p-3 rounded-lg">
                                    🎉
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#2a2d72]">
                                        Admission Confirmed!
                                    </h3>
                                    <p className="text-[#4a4b6d]">
                                        You're enrolled in UX Masterclass
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -2 }}
                            className="bg-white/80 p-6 rounded-2xl border border-[#e0e7ff] backdrop-blur-sm flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-semibold text-[#2a2d72]">
                                    Live Session Starting Soon
                                </h3>
                                <p className="text-[#4a4b6d]">Today at 12:00 PM · UX Design</p>
                            </div>
                            <button className="px-6 py-2 bg-[#6366f1] text-white rounded-full flex items-center gap-2 hover:bg-[#4f46e5] transition-colors">
                                Join Now <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Interactive Demo Section */}
                <motion.div
                    variants={cardVariants}
                    className="lg:w-1/2 mt-12 lg:mt-0"
                >
                    <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#e0e7ff]">
                        <div className="flex gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>

                        <div className="space-y-4 animate-pulse">
                            {[...Array(9)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 rounded-full bg-gradient-to-r from-[#e0e7ff] to-[#f0f4ff]"
                                    style={{ width: `${Math.random() * 40 + 60}%` }}
                                />
                            ))}
                        </div>

                        <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-5 rounded-2xl shadow-lg">
                            <div className="text-white text-3xl">🚀</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
);

export default Hero;

// const LandingPage = () => {
//     return (
//         <div className="min-h-screen bg-teal-400 relative">
//             {/* Navigation */}
//             <nav className="container mx-auto px-6 py-4">
//                 <div className="flex items-center justify-between">
//                     <div className="text-white text-2xl font-bold">TOTC</div>
//                     <div className="hidden md:flex space-x-8">
//                         <a href="#" className="text-white">Home</a>
//                         <a href="#" className="text-white">Courses</a>
//                         <a href="#" className="text-white">Careers</a>
//                         <a href="#" className="text-white">Blog</a>
//                         <a href="#" className="text-white">About Us</a>
//                     </div>
//                     <div className="flex space-x-4">
//                         <button className="bg-white text-teal-400 px-6 py-2 rounded-full">Login</button>
//                         <button className="bg-white text-teal-400 px-6 py-2 rounded-full">Sign Up</button>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <div className="container mx-auto px-6 pt-20 pb-40">
//                 <div className="flex flex-col md:flex-row items-center justify-between">
//                     {/* Left Content */}
//                     <div className="md:w-1/2">
//                         <h1 className="text-5xl font-bold mb-6">
//                             <span className="text-orange-500">Studying</span> Online is now<br />
//                             much easier
//                         </h1>
//                         <p className="text-white mb-8">
//                             TOTC is an interesting platform that will teach you in more an interactive way
//                         </p>
//                         <div className="flex space-x-4">
//                             <button className="bg-white text-teal-400 px-8 py-3 rounded-full">
//                                 Join for free
//                             </button>
//                             <button className="flex items-center space-x-2 text-white">
//                                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
//                                     <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
//                                     </svg>
//                                 </div>
//                                 <span>Watch how it works</span>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Right Content with Student Image and Floating Cards */}
//                     <div className="md:w-1/2 relative mt-12 md:mt-0">
//                         <img
//                             src="/api/placeholder/500/600"
//                             alt="Student"
//                             className="w-full"
//                         />

//                         {/* Floating Cards */}
//                         <div className="absolute top-4 right-4 bg-white rounded-xl p-4 shadow-lg">
//                             <div className="flex items-center space-x-2">
//                                 <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
//                                 </svg>
//                                 <div>
//                                     <div className="text-lg font-semibold">250k</div>
//                                     <div className="text-sm text-gray-500">Assisted Student</div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="absolute bottom-20 right-8 bg-white rounded-xl p-4 shadow-lg">
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
//                                 <div>
//                                     <div className="font-semibold">User Experience Class</div>
//                                     <div className="text-sm text-gray-500">Today at 12.00 PM</div>
//                                     <button className="mt-2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm">
//                                         Join Now
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="absolute top-20 right-0 bg-white rounded-xl p-4 shadow-lg">
//                             <div className="flex items-center space-x-2">
//                                 <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                                 </svg>
//                                 <div>
//                                     <div className="font-semibold">Congratulations</div>
//                                     <div className="text-sm text-gray-500">Your admission completed</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Curved Bottom Shape */}
//             <div className="absolute bottom-0 left-0 right-0">
//                 <svg viewBox="0 0 1440 320" className="w-full">
//                     <path
//                         fill="#ffffff"
//                         fillOpacity="1"
//                         d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
//                     />
//                 </svg>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;
