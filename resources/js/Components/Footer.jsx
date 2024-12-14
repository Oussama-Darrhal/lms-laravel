import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-[#1d1f53] text-white">
            <div className="container mx-auto px-8 pt-12 pb-6">
                <div className="flex justify-between">
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="space-y-4"
                    >
                        <h2 className="text-2xl font-semibold">[Instructly]</h2>
                        <p className="text-sm text-gray-300">
                            Build and realize your dreams with Instructly.
                        </p>
                    </motion.div>

                    <div className="grid-cols-1 md:grid-cols-3 gap-12 hidden lg:grid">
                        {/* Social Media Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.2,
                                ease: "easeInOut",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-6">
                                Social Media
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Program Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.4,
                                ease: "easeInOut",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-6">
                                Programs
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Learn & Grow Initiative
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Entrepreneurial Pathways
                                    </a>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Support Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 1,
                                delay: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <h3 className="text-lg font-semibold mb-6">
                                Support
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                    className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
                >
                    <div className="text-sm text-gray-400">
                        © Copyright Instructly 2024 - 2025
                    </div>
                    <nav className="mt-6 md:mt-0">
                        <ul className="flex space-x-8 text-sm">
                            <li>
                                <a href="#" className="hover:text-gray-300">
                                    HOME
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300">
                                    COURSES
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300">
                                    CONTACT US
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-gray-300">
                                    BLOG
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-gray-300">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </nav>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
