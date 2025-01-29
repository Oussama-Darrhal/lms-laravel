import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useForm, usePage } from "@inertiajs/react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const { auth } = usePage().props;
    const { post } = useForm();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/careers", label: "Careers" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About Us" },
    ];

    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // Delay for each link
            },
        }),
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 },
        },
    };

    return (
        <nav className="bg-transparent pt-2">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-white text-2xl font-light">TOTC</h1>
                    </div>

                    <div className="hidden md:flex flex-grow justify-center">
                        <div className="flex space-x-4">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className="text-white hover:text-gray-300 px-3 py-2 font-light"
                                    initial="hidden"
                                    animate="visible"
                                    variants={linkVariants}
                                    custom={index}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {auth?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-white/20 hover:bg-white/10 transition"
                                >
                                    {auth.user.profile_picture ? (
                                        <img src={auth.user.profile_picture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        <User className="h-6 w-6 text-primary" />
                                    )}
                                </button>
                                {isProfileMenuOpen && (
                                    <motion.div
                                        ref={profileMenuRef}
                                        className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-light">Profile</li>
                                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer font-light">Dashboard</li>
                                            <li>
                                                <form onSubmit={logout}>
                                                    <button type="submit" className="w-full text-left px-4 py-2 hover:bg-gray-200 font-light">Logout</button>
                                                </form>
                                            </li>
                                        </ul>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <>
                                <motion.div initial="hidden" animate="visible" variants={buttonVariants}>
                                    <Link href="/login" className="text-black bg-white hover:bg-gray-100 px-4 py-2 rounded-full font-light text-lg transition">Login</Link>
                                </motion.div>
                                <motion.div initial="hidden" animate="visible" variants={buttonVariants}>
                                    <Link href="/register" className="bg-primary-dark text-white hover:bg-opacity-90 px-4 py-2 rounded-full font-light text-lg transition">Sign Up</Link>
                                </motion.div>
                            </>
                        )}
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button className="absolute top-4 right-4 text-white" onClick={() => setIsMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }} // Each link appears with a delay
                            >
                                <Link
                                    href={link.href}
                                    className="text-white text-2xl hover:scale-105 transition"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: navLinks.length * 0.1 }} // Delay for login
                        >
                            <Link
                                href="/login"
                                className="text-black bg-white hover:bg-gray-100 px-6 py-2 rounded-full font-light text-lg transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: navLinks.length * 0.1 + 0.1 }} // Delay for signup
                        >
                            <Link
                                href="/register"
                                className="bg-primary-dark text-white hover:bg-opacity-90 px-6 py-2 rounded-full font-light text-lg transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
