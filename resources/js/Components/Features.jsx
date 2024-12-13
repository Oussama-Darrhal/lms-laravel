import React from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    Users,
    MessageCircle,
    Award,
    Clock,
    Target,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const Features = () => {
    // Variants for the title animation
    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    // Variants for feature cards animation
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="py-20">
            <div className="container mx-auto px-6">
                {/* Title Section */}
                <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-4xl font-extrabold text-center text-gray-900 mt-5 mb-20"
                >
                    Why Choose Our Platform?
                </motion.h2>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureCard
                            icon={BookOpen}
                            title="Comprehensive, Free Courses"
                            description="Explore an extensive range of high-quality courses at no cost, designed to fit your learning needs."
                        />
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureCard
                            icon={Clock}
                            title="Lifetime Access"
                            description="Enjoy unlimited, lifetime access to all courses and materials, allowing you to learn at your own pace."
                        />
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureCard
                            icon={MessageCircle}
                            title="Expert Consultation"
                            description="Gain valuable insights and personalized guidance from industry professionals and thought leaders."
                        />
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureCard
                            icon={Award}
                            title="Recognized Certification"
                            description="Earn prestigious certifications upon completion of courses, enhancing your professional credibility."
                        />
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureCard
                            icon={Target}
                            title="Structured Curriculum"
                            description="Benefit from a meticulously designed curriculum that ensures efficient learning and mastery of topics."
                        />
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <FeatureCard
                            icon={Users}
                            title="Experienced Instructors"
                            description="Learn from a team of seasoned professionals with real-world expertise, committed to your success."
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Features;
