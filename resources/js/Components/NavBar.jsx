import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ auth }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/contact", label: "Contact Us" },
        { href: "/blog", label: "Blog" },
    ];

    return (
        <div className="w-full bg-[#1c1f52] text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="flex items-center justify-between py-6">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold">EDUFREE</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-white/90 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <a
                                    href="/dashboard"
                                    className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200"
                                >
                                    Dashboard
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
                    <button
                        type="button"
                        className="md:hidden rounded-lg p-2 hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Open menu</span>
                        {isMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </header>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
