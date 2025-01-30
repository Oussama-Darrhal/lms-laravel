import { Link, usePage } from "@inertiajs/react";
import { Clock, Video, Users, Heart, Share2, User, Star, BookOpen } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingSkeleton = () => (
    <div className="relative h-full rounded-2xl overflow-hidden bg-white shadow-md animate-pulse">
        {/* Image Skeleton */}
        <div className="aspect-video bg-gray-200" />

        <div className="p-6">
            {/* Title Skeleton */}
            <div className="h-7 bg-gray-200 rounded w-3/4 mb-3" />

            {/* Description Skeleton */}
            <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded" />
                ))}
            </div>

            {/* Price Skeleton */}
            <div className="flex justify-end">
                <div className="h-10 w-24 bg-gray-200 rounded-full" />
            </div>
        </div>
    </div>
);

const CourseCard = ({ course }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [previewPosition, setPreviewPosition] = useState("right");
    const hoverTimeout = useRef(null);
    const stickTimeout = useRef(null);
    const cardRef = useRef(null);

    const handleShare = (e) => {
        e.preventDefault();
        setShowShareTooltip(true);
        navigator.clipboard.writeText(window.location.origin + course.url);
        setTimeout(() => setShowShareTooltip(false), 2000);
    };

    const handleBookmark = (e) => {
        e.preventDefault();
        setIsBookmarked(!isBookmarked);
    };

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowPreview(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        // Delay hiding the preview to allow scrolling
        stickTimeout.current = setTimeout(() => {
            setShowPreview(false);
        }, 1000); // 1 second delay
    };

    useEffect(() => {
        if (showPreview && cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Check if there's enough space to the right
            if (cardRect.right + 400 > viewportWidth) {
                setPreviewPosition("left");
            } else {
                setPreviewPosition("right");
            }
        }
    }, [showPreview]);

    // Clear timeouts on unmount
    useEffect(() => {
        return () => {
            clearTimeout(hoverTimeout.current);
            clearTimeout(stickTimeout.current);
        };
    }, []);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >
            <Link href={course.url} className="block group">
                <div className="relative h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Course Image Container */}
                    <div className="relative aspect-video overflow-hidden">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                        />
                        {/* Interactive Buttons */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={handleBookmark}
                                className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                            >
                                <Heart
                                    className={`w-5 h-5 ${isBookmarked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'
                                        }`}
                                />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors relative"
                            >
                                <Share2 className="w-5 h-5 text-gray-600" />
                                {showShareTooltip && (
                                    <div className="absolute -bottom-10 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                        Copied!
                                    </div>
                                )}
                            </button>
                        </div>
                        {/* Rating Badge */}
                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold">
                            ★ {course.rating}
                        </div>
                    </div>

                    {/* Course Details */}
                    <div className="p-6">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-3 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                            {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 line-clamp-3 mb-6 text-sm">
                            {course.description}
                        </p>

                        {/* Course Stats */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="flex items-center text-gray-500 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="text-sm">{course.duration}</span>
                            </div>
                            <div className="flex items-center text-gray-500 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                                <Video className="w-4 h-4 mr-2 text-purple-500" />
                                <span className="text-sm">{course.videos}</span>
                            </div>
                            <div className="flex items-center text-gray-500 bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                                <Users className="w-4 h-4 mr-2 text-green-500" />
                                <span className="text-sm">{course.students}</span>
                            </div>
                        </div>

                        {/* Price Tag */}
                        <div
                            className={`
                px-6 py-2 rounded-full text-lg font-bold text-center
                ${course.price === 0
                                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                }
                `}
                        >
                            {course.price === 0 ? "Free!" : `$${course.price}`}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Preview Section */}
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        className={`absolute top-0 ${previewPosition === "right" ? "left-full ml-4" : "right-full mr-4"
                            } w-96 bg-white rounded-2xl shadow-xl z-50`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="p-6">
                            {/* Teacher Information */}
                            <div className="flex items-center mb-6">
                                <img
                                    src={"https://via.placeholder.com/40"}
                                    alt="teacher picture"
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-800">{"course.teacher.name"}</h4>
                                    <p className="text-sm text-gray-500">{"course.teacher.bio"}</p>
                                </div>
                            </div>

                            {/* Video Preview */}
                            <video
                                className="w-full rounded-lg mb-4"
                                controls
                                src={course.previewVideo || "https://example.com/preview.mp4"}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const NoResults = ({ query, category }) => {
    const message = (() => {
        if (query && category) return `No courses found for "${query}" in this category.`;
        if (query) return `No courses found for "${query}".`;
        if (category) return "No courses found in this category.";
        return "No courses found.";
    })();

    return (
        <div className="col-span-full text-center p-12 bg-blue-50 rounded-xl border-2 border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
                {message}
            </h2>
            <p className="text-blue-600">
                Try adjusting your search or browse our categories.
            </p>
        </div>
    );
};

export default function CourseGrid({ courses, isLoading }) {
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const query = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <LoadingSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
            {courses.length > 0 ? (
                courses.map((course) => (
                    <div
                        key={course.id}
                        className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                        style={{
                            animationDelay: `${courses.indexOf(course) * 100}ms`
                        }}
                    >
                        <CourseCard course={course} />
                    </div>
                ))
            ) : (
                <NoResults query={query} category={category} />
            )}
        </div>
    );
}
