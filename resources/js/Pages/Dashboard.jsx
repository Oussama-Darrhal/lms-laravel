import { motion, AnimatePresence } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { Bell, Search, ChevronDown, LayoutDashboard, BookOpen, Calendar, Settings, HelpCircle, Trophy, Menu, X, Clock } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const SIDEBAR = {
    COLLAPSED_WIDTH: 84,
    MIN_WIDTH: 200,
    MAX_WIDTH: 400,
    DEFAULT_WIDTH: 240
};

const StatisticsCard = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Learning Progress</h2>
                <p className="text-gray-500 text-sm mt-1">Videos Watched</p>
            </div>
            <div className="p-6">
                <div className="relative w-56 h-56 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 rounded-full" />
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            className="text-gray-200"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="90"
                            cx="112"
                            cy="112"
                        />
                        <circle
                            className="text-[#1a1b41] transition-all duration-1000 ease-in-out"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 90}`}
                            strokeDashoffset={`${2 * Math.PI * 90 * (1 - 0.65)}`}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="90"
                            cx="112"
                            cy="112"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">65%</span>
                        <span className="text-gray-500 text-sm mt-1">Completion Rate</span>
                    </div>
                </div>
            </div>
        </div>
    );
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

const courses = [
    {
        id: 1,
        title: "Web Programming Basics",
        description: "Fundamentals of web development and design",
        progress: 20,
        status: "Continue",
        image: "/api/placeholder/80/60",
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
        image: "/api/placeholder/80/60",
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
        image: "/api/placeholder/80/60",
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
        image: "/api/placeholder/80/60",
        nextLesson: {
            title: "Figma Basics",
            duration: "15 mins"
        },
        timeEstimation: "4 days remaining",
        lastAccessed: "3 hours ago",
        version: "2.6.1"
    }
];
const ActivityList = () => {

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Learning Activity</h2>
                        <p className="text-sm text-gray-500 mt-1">Recent courses and progress</p>
                    </div>
                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full text-sm pl-12 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#1a1b41] focus:ring-2 focus:ring-[#1a1b41]/10 outline-none transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                            <span className="text-gray-700 text-sm">Filter</span>
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="hidden md:grid grid-cols-12 text-sm text-gray-500 mb-4 px-2 font-medium">
                    <div className="col-span-6 pl-6">Course</div>
                    <div className="col-span-4">Progress</div>
                    <div className="col-span-2 pr-4">Status</div>
                </div>

                <div className="space-y-2">
                    {courses.map(course => {
                        const [isHovered, setIsHovered] = useState(false);

                        return (
                            <div
                                key={course.id}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="group grid grid-cols-1 md:grid-cols-12 items-center p-4 rounded-lg transition-all duration-300 bg-white hover:bg-gray-50 relative"
                                tabIndex="0"
                            >
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            variants={previewVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute z-50 -top-4 -left-4 w-72 shadow-xl bg-white border border-gray-100 rounded-lg p-4 before:absolute before:-right-1 before:top-4 before:w-2 before:h-16 before:bg-[#1a1b41]"
                                        >
                                            <motion.div
                                                variants={contentVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className="space-y-3 overflow-hidden"
                                            >
                                                <motion.div variants={itemVariants} className="flex justify-between items-start mb-3">
                                                    <h4 className="text-sm font-semibold text-gray-900">Course Preview</h4>
                                                    <span className="text-xs text-gray-500">{course.lastAccessed}</span>
                                                </motion.div>

                                                <div className="space-y-3">
                                                    <motion.div variants={itemVariants} className="flex items-center text-sm text-gray-600">
                                                        <BookOpen size={14} className="mr-2 text-[#1a1b41] animate-pulse" />
                                                        <span className="truncate">Next: {course.nextLesson.title}</span>
                                                    </motion.div>

                                                    {course.nextLesson.duration && (
                                                        <motion.div variants={itemVariants} className="flex items-center text-sm text-gray-600">
                                                            <Clock size={14} className="mr-2 text-[#1a1b41] animate-spin-slow" />
                                                            <span>{course.nextLesson.duration} remaining</span>
                                                        </motion.div>
                                                    )}

                                                    <motion.div variants={itemVariants} className="flex items-center text-sm text-gray-600">
                                                        <Calendar size={14} className="mr-2 text-[#1a1b41] animate-bounce" />
                                                        <span className="truncate">{course.timeEstimation}</span>
                                                    </motion.div>
                                                </div>

                                                <motion.div variants={itemVariants} className="mt-4 pt-3 border-t border-gray-100">
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span>Course ID: {course.id}</span>
                                                        <span>v{course.version}</span>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Course Content */}
                                <div className="col-span-6 flex items-center space-x-4 mb-4 md:mb-0">
                                    <div className="relative w-16 h-12 rounded-md overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                        <div className="absolute inset-0 pattern-dots pattern-gray-300 pattern-size-2 pattern-opacity-30" />
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="relative z-10 w-full h-full object-cover transition-opacity duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 pr-4">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-4 mb-4 md:mb-0 pl-2">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="text-gray-500">Progress</span>
                                                <span className="font-medium text-gray-700">{course.progress}%</span>
                                            </div>
                                            <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-[#1a1b41] transition-all duration-700 ease-out"
                                                    style={{ width: `${course.progress}%` }}
                                                >
                                                    <div className="absolute inset-0 pattern-dots pattern-white pattern-size-1 pattern-opacity-20" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-2 md:pl-4">
                                    <button
                                        className={`w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-2.5 rounded-md transition-all duration-200 border ${course.status === "Certificate"
                                            ? 'bg-white text-[#1a1b41] border-[#1a1b41] hover:bg-[#1a1b41]/5'
                                            : 'bg-[#1a1b41] text-white hover:bg-[#2d2e6f] border-transparent'
                                            }`}
                                    >
                                        {course.status === "Certificate" && (
                                            <Trophy size={16} className="flex-shrink-0 text-[#1a1b41]" />
                                        )}
                                        <span className="truncate text-sm">{course.status}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Custom Animation Styles */}
            <style jsx global>{`
        @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
            }
            @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
            }
            @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
            }
            .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
            }
            .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            .animate-bounce {
            animation: bounce 1.5s ease-in-out infinite;
            }
            .pattern-dots {
            background-image: radial-gradient(currentColor 1px, transparent 1px);
            background-size: 8px 8px;
            }
        `}</style>
        </div>
    );
};

const Sidebar = ({ width, isCollapsed, setWidth, setIsCollapsed, lastWidthBeforeCollapse, setLastWidthBeforeCollapse }) => {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isResizing, setIsResizing] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(width);

    const startResizing = useCallback((e) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const resize = useCallback((e) => {
        if (isResizing) {
            const newWidth = Math.min(
                Math.max(e.clientX, SIDEBAR.MIN_WIDTH),
                SIDEBAR.MAX_WIDTH
            );
            setCurrentWidth(newWidth);
        }
    }, [isResizing]);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
        setWidth(currentWidth);
    }, [setWidth, currentWidth]);

    const handleToggleCollapse = () => {
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
    };

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

    return (
        <div
            className="fixed left-0 top-0 h-screen bg-gradient-to-b from-[#1a1b41] to-[#2d2e6f] text-white z-50"
            style={{ width: `${currentWidth}px` }}
        >
            <div className="p-6 flex items-center justify-between h-16">
                {!isCollapsed && (
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                        EDUFREE
                    </h1>
                )}
                <button
                    onClick={handleToggleCollapse}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    {isCollapsed ? <Menu size={20} /> : <X size={20} />}
                </button>
            </div>

            <nav className="space-y-1 px-4">
                {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'courses', icon: BookOpen, label: 'My Courses' },
                    { id: 'events', icon: Calendar, label: 'Events' },
                    { id: 'settings', icon: Settings, label: 'Settings' },
                    { id: 'help', icon: HelpCircle, label: 'Support' }
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveItem(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl ${activeItem === item.id
                            ? 'bg-white/20 backdrop-blur-sm shadow-inner'
                            : 'hover:bg-white/10'
                            }`}
                    >
                        <item.icon size={20} className="flex-shrink-0" />
                        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>

            <div
                className="absolute right-0 top-0 w-2 h-full cursor-ew-resize hover:bg-white/20 active:bg-white/30"
                onMouseDown={startResizing}
            />
        </div>
    );
};

const data = [
    { name: '1 Jan', value: 2 },
    { name: '2 Jan', value: 4 },
    { name: '3 Jan', value: 3 },
    { name: '4 Jan', value: 2 },
    { name: '5 Jan', value: 3 },
    { name: '6 Jan', value: 2 },
    { name: '7 Jan', value: 3 },
    { name: '8 Jan', value: 6 },
    { name: '9 Jan', value: 2 },
    { name: '10 Jan', value: 3 },
    { name: '11 Jan', value: 2 },
    { name: '12 Jan', value: 3 },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                <p className="text-sm font-medium">{`${payload[0].value} Videos`}</p>
            </div>
        );
    }
    return null;
};

const Overview = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
                        <p className="text-gray-500 text-sm mt-1">Completed Videos (Daily)</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                        <span className="text-gray-700 text-sm">Category</span>
                        <ChevronDown size={16} className="text-gray-500" />
                    </button>
                </div>
            </div>
            <div className="p-6">
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#6b7280' }}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#6b7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Bar
                                dataKey="value"
                                fill="#1a1b41"
                                radius={[4, 4, 0, 0]}
                                background={{ fill: '#f3f4f6' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR.DEFAULT_WIDTH);
    const [lastWidthBeforeCollapse, setLastWidthBeforeCollapse] = useState(SIDEBAR.DEFAULT_WIDTH);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title='Dashboard' />
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
                style={{ marginLeft: `${sidebarWidth}px` }}
            >
                <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-lg border-b border-gray-100">
                    <div className="px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <img
                                    src="/api/placeholder/48/48"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white" />
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-base font-semibold text-gray-800">Welcome, Dimas</h1>
                                    <span className="px-2 py-1 bg-[#1a1b41]/10 rounded-md text-xs font-medium text-[#1a1b41]">
                                        Pro Member
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">Frontend Developer</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search dashboard..."
                                    className="text-sm pl-10 pr-4 py-2 w-60 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#1a1b41]/10 focus:border-[#1a1b41] outline-none transition-all"
                                />
                            </div>
                            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                                <Bell size={20} className="text-gray-600" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <div className="bg-gradient-to-r from-[#1a1b41] to-[#2d2e6f] rounded-xl p-6 text-white shadow-lg">
                                <h2 className="text-xl font-semibold mb-2">Welcome back, Dimas! 👋</h2>
                                <p className="text-white/85 text-sm max-w-2xl leading-relaxed">
                                    Track your learning progress, continue where you left off, and achieve your goals.
                                    You've completed 65% of your weekly learning objectives.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-8">
                            <Overview />
                        </div>

                        <div className="col-span-4">
                            <StatisticsCard />
                        </div>

                        <div className="col-span-12">
                            <ActivityList />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
