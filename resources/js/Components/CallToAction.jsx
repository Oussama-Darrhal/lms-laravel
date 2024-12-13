import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
    // Variants for the title and text animations
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeInOut" },
        },
    };

    // Variants for the image animation
    const imageVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: "easeInOut" },
        },
    };

    return (
        <div className="py-16 md:py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
                    {/* Text Section */}
                    <motion.div
                        variants={textVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 leading-tight">
                            Empower Your Career with Our Premium E-Learning
                            Platform
                        </h2>
                        <p className="text-lg md:text-xl text-black mb-6 opacity-80">
                            Join thousands of learners and gain the skills
                            needed to excel in today’s tech-driven world. Start
                            your journey with expertly designed courses and
                            real-world projects.
                        </p>
                        <p className="text-base md:text-lg text-black opacity-60">
                            Learn at your own pace, with lifetime access to
                            course materials and personal guidance from seasoned
                            experts in the industry.
                        </p>
                    </motion.div>

                    {/* Image Section */}
                    <motion.div
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <img
                            src="/images/students-learning.jpg"
                            alt="Students engaging in an online course"
                            className="rounded-xl shadow-lg object-cover w-full h-full"
                        />
                    </motion.div>
                </div>

                {/* Bottom Text Section */}
                <motion.div
                    variants={textVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-8 md:mt-12 text-center"
                >
                    <p className="text-lg md:text-xl text-black opacity-70">
                        Get started today and unlock a world of opportunities in
                        tech.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CallToAction;
