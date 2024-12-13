import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";

const faqData = [
    {
        id: "01",
        question: "Is Instructly’s course content completely free of charge?",
        answer: "Yes, Instructly offers a wide range of courses completely free of charge. These courses are designed to enhance the educational experience of learners, providing valuable skills across various disciplines, including technology, business, and more.",
    },
    {
        id: "02",
        question: "Who is eligible to enroll in Instructly’s courses?",
        answer: "Instructly’s courses are open to anyone with a desire to learn. Whether you're a complete beginner, an experienced professional, or someone looking to expand your skill set, our courses cater to all levels. We offer content tailored to different skill sets and learning objectives.",
    },
    {
        id: "03",
        question: "Will I receive a certificate upon completing a course?",
        answer: "Yes, every participant who successfully completes a course on Instructly will receive a digital certificate. This certificate serves as a testament to the skills and knowledge you’ve acquired, which can be used to enhance your professional portfolio or career development.",
    },
    {
        id: "04",
        question: "How long will I have access to the course material?",
        answer: "Once enrolled, you will have lifetime access to the course materials. This includes any updates or additional content added in the future, allowing you to learn at your own pace and revisit the material as often as needed without any time limitations.",
    },
    {
        id: "05",
        question:
            "Does Instructly offer job placement assistance after course completion?",
        answer: "Instructly is committed to helping learners advance their careers. We have partnered with leading companies to offer job placement assistance. High-performing graduates may receive priority access to job opportunities with our partner organizations, enhancing their chances of landing relevant job roles in the tech and business sectors.",
    },
];

const FAQSection = () => {
    const [openId, setOpenId] = useState("01");

    const toggleQuestion = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div id="faq" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-44">
                    {/* Left Section */}
                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                            className="text-3xl font-bold mb-4"
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: "easeInOut",
                            }}
                            className="text-gray-600"
                        >
                            Have more questions? Feel free to contact us at +212
                            694 50 91 41.
                        </motion.p>
                    </div>

                    {/* Right Section - FAQ List */}
                    <div className="md:w-2/3">
                        <div className="space-y-4">
                            {faqData.map((faq) => (
                                <div
                                    key={faq.id}
                                    className="border-b border-gray-200"
                                >
                                    <button
                                        className="w-full py-6 flex items-center justify-between text-left"
                                        onClick={() => toggleQuestion(faq.id)}
                                        aria-expanded={openId === faq.id}
                                    >
                                        <div className="flex items-center gap-8">
                                            <span className="text-blue-600 font-medium min-w-[2.5rem]">
                                                {faq.id}
                                            </span>
                                            <span className="font-medium text-lg">
                                                {faq.question}
                                            </span>
                                        </div>
                                        {openId === faq.id ? (
                                            <X className="w-6 h-6 text-gray-400" />
                                        ) : (
                                            <Plus className="w-6 h-6 text-gray-400" />
                                        )}
                                    </button>

                                    {/* Smooth reveal with Framer Motion */}
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{
                                            opacity: openId === faq.id ? 1 : 0,
                                            height:
                                                openId === faq.id ? "auto" : 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeInOut",
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-6 pl-24 pr-12">
                                            <p className="text-gray-600">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
