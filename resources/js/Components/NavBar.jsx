import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, usePage } from "@inertiajs/react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileProfileMenuOpen, setIsMobileProfileMenuOpen] = useState(false);
    const [theme, setTheme] = useState("dark"); // Default to dark mode

    const { auth } = usePage().props;
    const { post } = useForm();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/contact", label: "Contact Us" },
        { href: "/blog", label: "Blog" },
    ];

    const profileMenuRef = useRef(null);
    const mobileProfileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
            if (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target)) {
                setIsMobileProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen, isMobileProfileMenuOpen]);

    const logout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    const navbarVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <motion.div
            className={`w-full ${theme === "dark" ? "bg-[#1c1f52] text-white" : "bg-white text-black"} relative`}
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <header className="flex items-center justify-between py-6">
                    <motion.div className="flex-shrink-0" variants={linkVariants}>
                        <span className="text-2xl font-bold">[Instructly]</span>
                    </motion.div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <motion.ul className="flex space-x-8">
                            {navLinks.map((link, index) => (
                                <motion.li key={link.label} variants={linkVariants} transition={{ delay: index * 0.1 }}>
                                    <a
                                        href={link.href}
                                        className={`${theme === "dark" ? "text-white/90" : "text-black/90"} hover:${theme === "dark" ? "text-white" : "text-black"} transition-colors duration-200`}
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border hover:bg-opacity-10 transition-colors duration-200"
                                        style={{ borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" }}
                                    >
                                        {auth.user.profile_picture ? (
                                            <img
                                                src={auth.user.profile_picture}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
                                        )}
                                    </button>

                                    {isProfileMenuOpen && (
                                        <motion.div
                                            ref={profileMenuRef}
                                            className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ul className="py-2">
                                                <li onClick={() => window.location.href = "/profile"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                                                <li onClick={() => window.location.href = "/dashboard"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
                                                <li>
                                                    <form onSubmit={logout} style={{ display: 'inline' }}>
                                                        <button type="submit" className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left">Logout</button>
                                                    </form>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <a
                                    href="/login"
                                    className={`px-4 py-2 rounded-lg border hover:bg-opacity-10 transition-colors duration-200 ${theme === "dark" ? "border-white/20" : "border-black/20"}`}
                                >
                                    Log in
                                </a>
                            )}
                        </div>
                    </nav>

                    <motion.button
                        type="button"
                        className="md:hidden rounded-lg p-2 hover:bg-opacity-10 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isMenuOpen ? (
                            <X className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} aria-hidden="true" />
                        ) : (
                            <Menu className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} aria-hidden="true" />
                        )}
                    </motion.button>
                </header>

                {isMenuOpen && (
                    <motion.div
                        className="md:hidden py-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="space-y-1">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    className={`block px-4 py-2 hover:bg-opacity-10 transition-colors duration-200 ${theme === "dark" ? "text-white/90" : "text-black/90"} hover:${theme === "dark" ? "text-white" : "text-black"}`}
                                    variants={linkVariants}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="mt-4 px-4">
                                {auth?.user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsMobileProfileMenuOpen(!isMobileProfileMenuOpen)}
                                            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border hover:bg-opacity-10 transition-colors duration-200"
                                            style={{ borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)" }}
                                        >
                                            {auth.user.profile_picture ? (
                                                <img
                                                    src={auth.user.profile_picture}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
                                            )}
                                        </button>

                                        {isMobileProfileMenuOpen && (
                                            <motion.div
                                                ref={mobileProfileMenuRef}
                                                className={`absolute left-0 mt-2 w-48 rounded-lg shadow-lg z-10 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ul className="py-2">
                                                    <li onClick={() => window.location.href = "/profile"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                                                    <li onClick={() => window.location.href = "/dashboard"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
                                                    <li>
                                                        <form onSubmit={logout} style={{ display: 'inline' }}>
                                                            <button type="submit" className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left">Logout</button>
                                                        </form>
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href="/login"
                                        className={`block w-full text-center px-4 py-2 rounded-lg border hover:bg-opacity-10 transition-colors duration-200 ${theme === "dark" ? "border-white/20" : "border-black/20"}`}
                                    >
                                        Log in
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Navbar;
