import { Bell, Search, ChevronDown, LayoutDashboard, BookOpen, Calendar, Settings, HelpCircle, Trophy, Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

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

const ActivityList = () => {
    const courses = [
        {
            id: 1,
            title: "Web Programming Basics",
            description: "Fundamentals of web development and design",
            progress: 20,
            status: "Continue",
            image: "/api/placeholder/80/60"
        },
        {
            id: 2,
            title: "Digital Marketing 101",
            description: "Introduction to marketing strategies and concepts",
            progress: 100,
            status: "Certificate",
            image: "/api/placeholder/80/60"
        },
        {
            id: 3,
            title: "Data Science Fundamentals",
            description: "Learn the basics of data science and analytics",
            progress: 50,
            status: "Continue",
            image: "/api/placeholder/80/60"
        },
        {
            id: 4,
            title: "UI/UX Design for Beginners",
            description: "Master the principles of user interface and experience design",
            progress: 90,
            status: "Continue",
            image: "/api/placeholder/80/60"
        }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Learning Activity</h2>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="text-sm pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#1a1b41] focus:ring-2 focus:ring-[#1a1b41]/10 outline-none transition-all"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
                            <span className="text-gray-700 text-sm">Category</span>
                            <ChevronDown size={16} className="text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-12 text-sm text-gray-500 px-4 mb-4 font-medium">
                    <div className="col-span-6">Course Name</div>
                    <div className="col-span-4">Progress</div>
                    <div className="col-span-2">Actions</div>
                </div>

                <div className="space-y-3">
                    {courses.map(course => (
                        <div
                            key={course.id}
                            className="grid grid-cols-12 items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="col-span-6 flex items-center space-x-4">
                                <div className="w-20 h-16 rounded-lg overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{course.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                                </div>
                            </div>
                            <div className="col-span-4 flex flex-col justify-center h-full">
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-[#1a1b41] h-2 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-500 mt-1.5">{course.progress}%</span>
                            </div>
                            <div className="col-span-2 flex items-center h-full">
                                <button
                                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                                        course.status === "Certificate"
                                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                                            : 'text-[#1a1b41] hover:bg-[#1a1b41]/5'
                                    } transition-colors duration-200`}
                                >
                                    {course.status === "Certificate" && <Trophy size={16} className="text-yellow-700" />}
                                    <span>{course.status}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Rest of the components (Sidebar, Overview, Dashboard) remain the same as previous version

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
        <div
            className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#1a1b41] to-[#2d2e6f] text-white transition-all duration-300 z-50 ${
                isCollapsed ? 'w-20' : 'w-72'
            }`}
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                        EDUFREE
                    </h1>
                )}
                <button
                    onClick={toggleSidebar}
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
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                            activeItem === item.id
                            ? 'bg-white/20 backdrop-blur-sm shadow-inner'
                            : 'hover:bg-white/10'
                        }`}
                    >
                        <item.icon size={20} className="flex-shrink-0" />
                        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>
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

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

            <div className={`flex-1 min-h-screen transition-all duration-300 ${
                isCollapsed ? 'pl-20' : 'pl-72'
            }`}>
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
