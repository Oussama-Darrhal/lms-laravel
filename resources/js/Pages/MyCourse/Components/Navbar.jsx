import { Head, usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown, Search, Trophy, Clock, Calendar, BarChart, TrendingUp, Star, User, LogOut } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, LayoutDashboard, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart2, PlayCircle
} from 'lucide-react';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { auth } = usePage().props;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="px-6 py-3 flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">INSTRUCTLY</h1>
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="flex items-center space-x-2 cursor-pointer group"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <motion.div
                            animate={{ rotate: menuOpen ? 180 : 0 }}
                            whileHover={{ rotate: -15 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-300" />
                        </motion.div>
                        <div className="relative flex items-center">
                            <img
                                src={auth.user.profile_picture}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white" />
                        </div>
                        <div>
                            <h1 className="text-base font-semibold text-gray-800">Hi, {auth.user.name}</h1>
                            <p className="text-gray-500 text-sm capitalize">{auth.user.role}</p>
                        </div>
                    </div>
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30"
                            >
                                <ul className="py-2 text-gray-700">
                                    {['Profile', 'Courses', 'Sign Out'].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            className={`flex items-center px-4 py-2 cursor-pointer transition duration-200 ${item === 'Sign Out' ? 'hover:bg-red-100 text-red-500' : 'hover:bg-gray-100'
                                                }`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {item === 'Profile' && <User className="w-5 h-5 mr-2 text-gray-600" />}
                                            {item === 'Courses' && <BookOpen className="w-5 h-5 mr-2 text-gray-600" />}
                                            {item === 'Sign Out' && <LogOut className="w-5 h-5 mr-2 text-red-500" />}
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
