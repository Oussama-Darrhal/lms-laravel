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

export default Hero;
