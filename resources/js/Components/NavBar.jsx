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

    // Animation variants
    const linkVariants = {
        hidden: (direction) => ({
            opacity: 0,
            x: direction === 'left' ? -20 : 20,
        }),
        visible: {
            opacity: 1,
            x: 0,
        },
    };

    return (
        <nav className="bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-white text-2xl font-light">TOTC</h1>
                        </div>
                        <div className="hidden md:flex flex-grow justify-center"> {/* Centering the nav links */}
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map((link, index) => {
                                    const direction = Math.random() > 0.5 ? 'left' : 'right'; // Randomly choose direction
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            className="text-white hover:text-gray-200 px-3 py-2 font-light"
                                            initial="hidden"
                                            animate="visible"
                                            variants={linkVariants}
                                            custom={direction}
                                            transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger effect
                                        >
                                            {link.label}
                                        </motion.a>
                                    );
                                })}
                            </div>
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
                                <Link href="/login" className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-full font-light">Login</Link>
                                <Link href="/register" className="bg-primary-dark text-white hover:bg-opacity-90 px-4 py-2 rounded-full font-light">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-dark text-white py-4 px-6">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="block py-2 hover:opacity-80 transition font-light">
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
