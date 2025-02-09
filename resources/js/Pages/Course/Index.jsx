import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/Components/NavBar";
import { Head } from "@inertiajs/react";
import Breadcrumbs from "@/Components/BreadCrumbs";
import SearchBar from "@/Components/SearchBar";
import CourseGrid from "./CourseGrid";
import Footer from "@/Components/Footer";
import { Sliders, SortAsc, SortDesc, Grid, List, Search, TrendingUp, Star, DollarSign } from "lucide-react";

// const courses = [
//     {
//         id: 1,
//         title: "Introduction to Web Programming",
//         description:
//             "A beginner-level course focused on the fundamentals of web development.",
//         image: "/images/ben-griffiths-Bj6ENZDMSDY-unsplash.jpg",
//         duration: "4.5 Hours",
//         videos: "20 Videos",
//         students: "1,900 Students",
//         rating: 4.9,
//         url: "/courses/1",
//     },
//     {
//         id: 2,
//         title: "Digital Marketing 101",
//         description:
//             "An introductory course on digital marketing strategies and concepts.",
//         image: "/images/will-francis-r02wxT3-PYw-unsplash.jpg",
//         duration: "6.2 Hours",
//         videos: "32 Videos",
//         students: "930 Students",
//         rating: 4.9,
//         url: "/",
//     },
//     {
//         id: 3,
//         title: "Data Science: Key Concepts and Introduction",
//         description:
//             "A comprehensive introduction to the key concepts in data science.",
//         image: "/images/carlos-muza-hpjSkU2UYSU-unsplash.jpg",
//         duration: "8 Hours",
//         videos: "46 Videos",
//         students: "1,043 Students",
//         rating: 4.9,
//         url: "/",
//     },
//     {
//         id: 4,
//         title: "Mastering Front-End Development with React",
//         description:
//             "Learn to build dynamic, responsive web applications using the powerful React framework.",
//         image: "/images/course_1674371266.jpg",
//         duration: "8 Hours",
//         videos: "46 Videos",
//         students: "1,200 Students",
//         rating: 4.9,
//         url: "/",
//     },
//     {
//         id: 5,
//         title: "The Art of Content Creation: From Concept to Execution",
//         description:
//             "Learn the skills to create compelling content for blogs, social media, and other platforms.",
//         image: "/images/1681542240334.png",
//         duration: "8 Hours",
//         videos: "40 Videos",
//         students: "950 Students",
//         rating: 4.9,
//         url: "/",
//     },
//     {
//         id: 6,
//         title: "Mastering the Basics of Video Production and Editing",
//         description:
//             "Discover the essentials of video production, from shooting to editing, to create high-quality content.",
//         image: "/images/nejc-soklic-2jTu7H9l6JA-unsplash.jpg",
//         duration: "8 Hours",
//         videos: "50 Videos",
//         students: "1,100 Students",
//         rating: 4.9,
//         url: "/",
//     },
// ];

export default function Index({ courses, categories, breadcrumbs }) {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [filteredCourses, setFilteredCourses] = useState(courses);

    // Prepare courses with consistent data
    const preparedCourses = courses.map((course) => ({
        ...course,
        title: course.titre,
        description: course.description || "No description available",
        category: course.categorie || "General",
        image: course.image || "https://picsum.photos/400/300",
        duration: course.duration || "4.5 Hours",
        videos: course.videos || "20 Videos",
        enrollmentCount: course.users?.length || 0,
        students: `${course.users?.length || 0} Students`,
        rating: course.rating || 4.9,
        url: `/courses/${course.id}`,
        difficulty: course.difficulty || "beginner",
    }));

    // Filter and sort courses
    useEffect(() => {
        let result = [...preparedCourses];

        // Apply price filter
        result = result.filter(course =>
            course.price >= priceRange[0] && course.price <= priceRange[1]
        );

        // Apply difficulty filter
        if (selectedDifficulty !== 'all') {
            result = result.filter(course =>
                course.difficulty === selectedDifficulty
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'popularity':
                result.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
                break;
        }

        setFilteredCourses(result);
    }, [sortBy, priceRange, selectedDifficulty]);

    // Animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const FilterPanel = () => (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Price Range Filter */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex items-center space-x-4">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">
                        ${priceRange[0]} - ${priceRange[1]}
                    </span>
                </div>
            </div>

            {/* Difficulty Filter */}
            <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            className="min-h-screen mx-auto max-w-[150rem] selection:bg-[#fdd981] selection:text-black"
            initial="initial"
            animate="animate"
        >
            <Head title="Courses" />
            <motion.div variants={fadeInUp}>
                <NavBar />
            </motion.div>
            <motion.div variants={fadeInUp}>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </motion.div>

            <motion.main
                className="max-w-[150rem] px-4 sm:px-6 lg:px-8 mx-auto py-4"
                variants={fadeInUp}
            >
                {/* Enhanced Header Section */}
                <div className="relative py-20 mb-12 bg-gradient-to-r from-[#1d1f53] to-[#4f3c98] rounded-3xl overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }} />
                    </div>

                    <div className="relative text-center px-4">
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Explore Our Courses
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Discover a world of knowledge with our carefully curated courses.
                            Learn at your own pace and achieve your goals.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* Enhanced Search and Filter Controls */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex flex-col lg:flex-row items-stretch gap-6">
                            {/* Enhanced Search Bar */}
                            <div className="flex-grow">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search for courses..."
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                    />
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                            </div>

                            {/* Enhanced Controls Group */}
                            <div className="flex flex-wrap items-center gap-4">
                                {/* Sort Dropdown with Icons */}
                                <div className="relative group">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                                    >
                                        <option value="default">Sort By</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="popularity">Most Popular</option>
                                    </select>
                                    {/* Icon based on selected sort */}
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {sortBy.includes('price') && <DollarSign className="w-5 h-5" />}
                                        {sortBy === 'rating' && <Star className="w-5 h-5" />}
                                        {sortBy === 'popularity' && <TrendingUp className="w-5 h-5" />}
                                        {sortBy === 'default' && <SortAsc className="w-5 h-5" />}
                                    </div>
                                </div>

                                {/* Enhanced View Toggle */}
                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border-2 border-gray-200">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            viewMode === 'grid'
                                                ? 'bg-white shadow-md text-purple-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <Grid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-all duration-300 ${
                                            viewMode === 'list'
                                                ? 'bg-white shadow-md text-purple-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        <List size={20} />
                                    </button>
                                </div>

                                {/* Enhanced Filter Toggle */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`
                                        flex items-center gap-2 px-4 py-3 rounded-xl font-medium
                                        transition-all duration-300
                                        ${showFilters
                                            ? 'bg-purple-100 text-purple-600 border-2 border-purple-200'
                                            : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    <Sliders size={20} />
                                    <span>Filters</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Panel */}
                    <AnimatePresence>
                        {showFilters && <FilterPanel />}
                    </AnimatePresence>

                    {/* Course Grid */}
                    <motion.div variants={fadeInUp}>
                        <CourseGrid
                            courses={filteredCourses}
                            viewMode={viewMode}
                        />
                    </motion.div>
                </div>
            </motion.main>

            {/* Footer */}
            <motion.div
                className="bg-[#1d1f53] w-full max-w-[150rem] px-4 sm:px-6 lg:px-6"
                variants={fadeInUp}
            >
                <Footer />
            </motion.div>
        </motion.div>
    );
}
