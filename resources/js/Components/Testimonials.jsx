import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const testimonialData = [
    {
        quote: "The courses were detailed and easy to follow, helping me understand complex topics step by step.",
        author: "David Wilson",
        role: "Student",
        image: "/images/pfp-2.jpg",
    },
    {
        quote: "Instructly provides a fantastic platform for delivering engaging and effective lessons to students.",
        author: "Sarah Chen",
        role: "Instructor",
        image: "/images/pfp-1.jpg",
    },
    {
        quote: "I gained the confidence to apply for tech roles after completing the beginner-friendly courses.",
        author: "David Kim",
        role: "Student",
        image: "/images/pfp-3.jpg",
    },
    {
        quote: "Teaching on Instructly has been an amazing experience, thanks to their supportive team and intuitive tools.",
        author: "Michael Torres",
        role: "Instructor",
        image: "/images/pfp-4.jpg",
    },
    {
        quote: "The practical exercises and real-world examples made learning enjoyable and effective.",
        author: "Linda Ahmed",
        role: "Student",
        image: "/images/pfp-5.jpg",
    },
];

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleDotClick = (index) => {
        setActiveIndex(index);
    };

    const testimonialStyle = {
        cursor: isDragging ? "grabbing" : "grab",
    };

    return (
        <div className="bg-[#eef5fb] py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-start justify-between gap-12 md:gap-44">
                    {/* Left Section */}
                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.7, ease: "easeInOut" }}
                            className="text-4xl font-extrabold mb-4 text-gray-900"
                        >
                            What People Say About Instructly
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1.7,
                                delay: 0.2,
                                ease: "easeInOut",
                            }}
                            className="text-gray-600"
                        >
                            Trusted by a thriving community of students and
                            educators worldwide.
                        </motion.p>
                    </div>

                    {/* Right Section - Testimonials */}
                    <div ref={containerRef} className="md:w-2/3 select-none">
                        <motion.div
                            style={testimonialStyle}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="rounded-lg"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.7, delay: 0.3 }}
                                className="text-2xl font-bold mb-8 text-gray-800"
                            >
                                "{testimonialData[activeIndex].quote}"
                            </motion.p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonialData[activeIndex].image}
                                        alt={`Picture of ${testimonialData[activeIndex].author}`}
                                        className="w-12 h-12 rounded-full"
                                        draggable="false"
                                    />
                                    <div>
                                        <motion.h4
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 1.7,
                                                delay: 0.4,
                                            }}
                                            className="font-semibold text-gray-900"
                                        >
                                            {
                                                testimonialData[activeIndex]
                                                    .author
                                            }
                                        </motion.h4>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 1.7,
                                                delay: 0.5,
                                            }}
                                            className="text-gray-600"
                                        >
                                            {testimonialData[activeIndex].role}
                                        </motion.p>
                                    </div>
                                </div>

                                {/* Navigation Dots */}
                                <div className="flex gap-2">
                                    {testimonialData.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() =>
                                                handleDotClick(index)
                                            }
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === activeIndex
                                                    ? "bg-blue-600"
                                                    : "bg-blue-200"
                                            }`}
                                            aria-label={`Go to testimonial ${
                                                index + 1
                                            }`}
                                            whileHover={{ scale: 1.2 }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                <motion.button
                                    onClick={() =>
                                        setActiveIndex(
                                            activeIndex > 0
                                                ? activeIndex - 1
                                                : 0
                                        )
                                    }
                                    className="text-2xl text-[#1d1f53] hover:text-black"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    &#8592; Prev
                                </motion.button>
                                <motion.button
                                    onClick={() =>
                                        setActiveIndex(
                                            activeIndex <
                                                testimonialData.length - 1
                                                ? activeIndex + 1
                                                : testimonialData.length - 1
                                        )
                                    }
                                    className="text-2xl text-[#1d1f53] hover:text-black"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Next &#8594;
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
