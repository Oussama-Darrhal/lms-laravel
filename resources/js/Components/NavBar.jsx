import React, { useState } from "react";
import { Menu, X, User } from "lucide-react"; // Import User icon for profile
import { motion } from "framer-motion";

const Navbar = ({ auth }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/contact", label: "Contact Us" },
        { href: "/blog", label: "Blog" },
    ];

    // Variants for animations
    const logoVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const navLinksVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delayChildren: 0.3, staggerChildren: 0.2 } },
    };

    const navLinkVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const menuButtonVariants = {
        hidden: { opacity: 0, rotate: 90 },
        visible: { opacity: 1, rotate: 0, transition: { duration: 0.5 } },
    };

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="w-full bg-[#1c1f52] text-white">
            <div className="px-4 sm:px-6 lg:px-8">
                <header className="flex items-center justify-between py-6">
                    {/* Logo */}
                    <motion.div
                        variants={logoVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex-shrink-0"
                    >
                        <span className="text-2xl font-bold">[Instructly]</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <motion.ul
                            variants={navLinksVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex space-x-8"
                        >
                            {navLinks.map((link) => (
                                <motion.li key={link.label} variants={navLinkVariants}>
                                    <a
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <a
                                    href="/profile"
                                    className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:bg-white/10 transition-colors duration-200"
                                >
                                    {auth.user.image ? (
                                        <img
                                            src={auth.user.image}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-white" />
                                    )}
                                </a>
                            ) : (
                                <a
                                    href="/login"
                                    className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200"
                                >
                                    Log in
                                </a>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <motion.button
                        type="button"
                        variants={menuButtonVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="md:hidden rounded-lg p-2 hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </motion.button>
                </header>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        className="md:hidden py-4"
                    >
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    variants={navLinkVariants}
                                    className="block px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <div className="mt-4 px-4">
                                {auth?.user ? (
                                    <a
                                        href="/dashboard"
                                        className="block w-full text-center px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200"
                                    >
                                        Dashboard
                                    </a>
                                ) : (
                                    <a
                                        href="/login"
                                        className="block w-full text-center px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200"
                                    >
                                        Log in
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
