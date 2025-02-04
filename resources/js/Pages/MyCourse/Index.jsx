import { Head, usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown, Search, Trophy, Clock, Calendar, BarChart, TrendingUp, Star } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, LayoutDashboard, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart2, PlayCircle
} from 'lucide-react';

const courses = [
    {
        id: 1,
        title: "Web Programming Basics",
        description: "Fundamentals of web development and design",
        progress: 20,
        status: "Continue",
        image: "/images/Web-Programming.jpg",
        nextLesson: {
            title: "Introduction to HTML5",
            duration: "12 mins"
        },
        timeEstimation: "2 weeks remaining",
        lastAccessed: "2 hours ago",
        version: "2.1.5"
    },
    {
        id: 2,
        title: "Digital Marketing 101",
        description: "Introduction to marketing strategies and concepts",
        progress: 100,
        status: "Certificate",
        image: "/images/Digital-Marketing.jpg",
        nextLesson: {
            title: "Course Completed",
            duration: ""
        },
        timeEstimation: "Fully completed",
        lastAccessed: "5 days ago",
        version: "1.4.2"
    },
    {
        id: 3,
        title: "Data Science Fundamentals",
        description: "Learn the basics of data science and analytics",
        progress: 50,
        status: "Continue",
        image: "/images/Data-Science.jpg",
        nextLesson: {
            title: "Python for Data Analysis",
            duration: "18 mins"
        },
        timeEstimation: "3 weeks remaining",
        lastAccessed: "1 day ago",
        version: "3.0.0"
    },
    {
        id: 4,
        title: "UI/UX Design for Beginners",
        description: "Master the principles of user interface and experience design",
        progress: 90,
        status: "Continue",
        image: "/images/UIUX-Design.jpg",
        nextLesson: {
            title: "Figma Basics",
            duration: "15 mins"
        },
        timeEstimation: "4 days remaining",
        lastAccessed: "3 hours ago",
        version: "2.6.1"
    }
];

const SIDEBAR = {
    COLLAPSED_WIDTH: 84,
    MIN_WIDTH: 200,
    MAX_WIDTH: 400,
    DEFAULT_WIDTH: 240
};

const previewVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        x: -16,
        transition: { duration: 0.2, ease: "easeIn" }
    }
};

const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, x: 16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

const Sidebar = ({ width, isCollapsed, setWidth, setIsCollapsed, lastWidthBeforeCollapse, setLastWidthBeforeCollapse }) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isResizing, setIsResizing] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(width);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const startResizing = useCallback((e) => {
        if (!isMobile) {
            e.preventDefault();
            setIsResizing(true);
        }
    }, [isMobile]);

    const resize = useCallback((e) => {
        if (isResizing && !isMobile) {
            const newWidth = Math.min(
                Math.max(e.clientX, SIDEBAR.MIN_WIDTH),
                SIDEBAR.MAX_WIDTH
            );
            setCurrentWidth(newWidth);
        }
    }, [isResizing, isMobile]);

    const stopResizing = useCallback(() => {
        if (!isMobile) {
            setIsResizing(false);
            setWidth(currentWidth);
        }
    }, [setWidth, currentWidth, isMobile]);

    const handleToggleCollapse = () => {
        if (isMobile) {
            setShowMobileMenu(!showMobileMenu);
        } else {
            if (isCollapsed) {
                setWidth(lastWidthBeforeCollapse);
                setCurrentWidth(lastWidthBeforeCollapse);
                setIsCollapsed(false);
            } else {
                setLastWidthBeforeCollapse(width);
                setWidth(SIDEBAR.COLLAPSED_WIDTH);
                setCurrentWidth(SIDEBAR.COLLAPSED_WIDTH);
                setIsCollapsed(true);
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth < 1024;
            setIsMobile(newIsMobile);
            if (newIsMobile) {
                setIsCollapsed(true);
                setWidth(SIDEBAR.COLLAPSED_WIDTH);
                setShowMobileMenu(false);
            } else {
                setIsCollapsed(false);
                setWidth(lastWidthBeforeCollapse);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsCollapsed, setWidth, lastWidthBeforeCollapse]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };
    }, [isResizing, resize, stopResizing]);

    useEffect(() => {
        setCurrentWidth(width);
    }, [width]);

    // Mobile menu overlay
    const MobileMenu = () => (
        <div
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            onClick={() => setShowMobileMenu(false)}
        />
    );

    return (
        <>
            <MobileMenu />
            <div
                className={`fixed z-50 transition-all duration-300 ${isMobile
                    ? `bottom-6 left-6 ${showMobileMenu ? 'w-64 h-auto rounded-2xl' : 'w-14 h-14 rounded-full'
                    }`
                    : 'left-0 top-0 h-screen'
                    }`}
                style={!isMobile ? { width: `${currentWidth}px` } : undefined}
            >
                <div className={`h-full bg-gradient-to-b from-[#1a1b41] to-[#2d2e6f] text-white ${isMobile ? (showMobileMenu ? 'rounded-2xl' : 'rounded-full') : ''
                    } shadow-2xl`}>
                    <div className={`flex items-center justify-between ${isMobile && !showMobileMenu ? 'h-14 w-14 p-0' : 'h-16 p-6'
                        }`}>
                        {(!isCollapsed || (isMobile && showMobileMenu)) && (
                            <h1 className="hidden lg:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                                INSTRUCTLY
                            </h1>
                        )}
                        <button
                            onClick={handleToggleCollapse}
                            className={`text-white transition-colors ${isMobile && !showMobileMenu
                                ? 'w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-full'
                                : 'p-2 rounded-lg hover:bg-white/10'
                                }`}
                        >
                            {isCollapsed || (isMobile && !showMobileMenu) ? (
                                <Menu className="w-6 h-6" />
                            ) : (
                                <X className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {(!isCollapsed || (isMobile && showMobileMenu)) && (
                        <nav className="space-y-1 px-4 pb-6">
                            {[
                                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                                { id: 'courses', icon: BookOpen, label: 'My Courses' },
                                { id: 'events', icon: Calendar, label: 'Events' },
                                { id: 'settings', icon: Settings, label: 'Settings' },
                                { id: 'help', icon: HelpCircle, label: 'Support' }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveItem(item.id);
                                        if (isMobile) setShowMobileMenu(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeItem === item.id
                                        ? 'bg-white/20 backdrop-blur-sm shadow-inner'
                                        : 'hover:bg-white/10'
                                        }`}
                                >
                                    <item.icon size={20} className="flex-shrink-0" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    )}

                    {!isMobile && (
                        <div
                            className="absolute right-0 top-0 w-2 h-full cursor-ew-resize hover:bg-white/20 active:bg-white/30"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { auth } = usePage().props;

    console.log(auth.user);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
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
                        {/* Arrow Icon with Animation */}
                        <motion.div
                            animate={{ rotate: menuOpen ? 180 : 0 }}
                            whileHover={{ rotate: -15 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        </motion.div>

                        <div className="relative">
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

                    {/* Dropdown */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                            >
                                <ul className="py-2 text-gray-700">
                                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer">
                                        <User className="w-5 h-5 mr-2 text-gray-600" /> Profile
                                    </li>
                                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer">
                                        <BookOpen className="w-5 h-5 mr-2 text-gray-600" /> Courses
                                    </li>
                                    <li className="flex items-center px-4 py-2 hover:bg-red-100 text-red-500 transition duration-200 cursor-pointer">
                                        <LogOut className="w-5 h-5 mr-2 text-red-500" /> Sign Out
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

const CoursesPage = () => {
    const { auth } = usePage().props;
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR.COLLAPSED_WIDTH);
    const [lastWidthBeforeCollapse, setLastWidthBeforeCollapse] = useState(SIDEBAR.DEFAULT_WIDTH);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 1024);

    // Filtering and searching logic
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeFilter === 'all' ||
            (activeFilter === 'in-progress' && course.progress < 100) ||
            (activeFilter === 'completed' && course.progress === 100)
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Head title="My Learning Journey" />
            <Sidebar
                width={sidebarWidth}
                isCollapsed={isCollapsed}
                setWidth={setSidebarWidth}
                setIsCollapsed={setIsCollapsed}
                lastWidthBeforeCollapse={lastWidthBeforeCollapse}
                setLastWidthBeforeCollapse={setLastWidthBeforeCollapse}
            />

            <div
                className="flex-1 min-h-screen transition-all duration-200"
                style={{ marginLeft: `${isMobile ? 0 : 90}px` }}
            >
                {/* navbar */}
                <Navbar />
                {/* Header Section */}
                <header className="px-4 sm:px-6 py-6 sm:py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-[#1a1b41] to-[#2d2e6f]">
                                Welcome, {auth.user.name}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Continue your learning journey and unlock new skills
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#1a1b41]/20 focus:border-[#1a1b41] transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Filter Section */}
                <div className="flex justify-between items-center mb-6 px-4 sm:px-6 py-2 sm:py-4">
                    <div className="flex space-x-2">
                        {[
                            { id: 'all', label: 'All Courses', icon: BarChart2 },
                            { id: 'in-progress', label: 'In Progress', icon: TrendingUp },
                            { id: 'completed', label: 'Completed', icon: Star }
                        ].map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`
                                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                                    ${activeFilter === filter.id
                                        ? 'bg-[#1a1b41] text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }
                                `}
                            >
                                <filter.icon size={16} />
                                <span>{filter.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 py-2 sm:py-4">
                    {filteredCourses.map(course => (
                        <div
                            key={course.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            <div className="relative">
                                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                                    <span className="bg-[#1a1b41]/80 text-white text-xs px-2.5 py-1 rounded-full">
                                        {course.difficulty}
                                    </span>
                                    {course.progress === 100 && (
                                        <span className="bg-green-500/80 text-white text-xs px-2.5 py-1 rounded-full">
                                            Completed
                                        </span>
                                    )}
                                </div>
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 truncate pr-4">
                                        {course.title}
                                    </h3>
                                    <PlayCircle
                                        size={24}
                                        className="text-[#1a1b41] opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-gray-600 text-sm">
                                        <img
                                            src="/api/placeholder/24/24"
                                            alt="Instructor"
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span>{course.instructor}</span>
                                    </div>
                                    <div className="w-1/3">
                                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-[#1a1b41] h-full"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                        <div className="text-right text-xs text-gray-600 mt-1">
                                            {course.progress}%
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-4 py-3 bg-[#1a1b41] text-white rounded-lg hover:bg-[#2d2e6f] transition-colors">
                                    {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses found matching your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;
