import CheckoutButton from "@/Components/CheckoutButton";
import { Link, router, usePage } from "@inertiajs/react";
import { Clock, Video, Users, Heart, Share2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

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
    const [previewStyle, setPreviewStyle] = useState({});
    const [usePortal, setUsePortal] = useState(false);
    const hoverTimeout = useRef(null);
    const cardRef = useRef(null);
    const previewRef = useRef(null);
    const { auth } = usePage().props;

    // Check if the user is enrolled in the course
    const isEnrolled = auth.user && course.users.some(user => user.id === auth.user.id);

    const handleShare = (e) => {
        e.preventDefault();
        setShowShareTooltip(true);
        navigator.clipboard.writeText(window.location.origin + course.url);
        setTimeout(() => setShowShareTooltip(false), 2000);
    };

    const handleMouseEnter = () => {
        hoverTimeout.current = setTimeout(() => {
            setShowPreview(true);
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout.current);
        setShowPreview(false);
    };

    // Check if the course is bookmarked by the current user
    if (auth.user) {
        useEffect(() => {
            if (course.bookmarks && course.bookmarks.includes(auth.user.id)) {
                setIsBookmarked(true);
            } else {
                setIsBookmarked(false);
            }
        }, [course.bookmarks, auth.user.id]);
    }

    useEffect(() => {
        if (showPreview && cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const previewWidth = 384; // w-96

            let shouldUsePortal = false;
            let newStyle = {};

            if (true) {
                // Use portal for overlay
                shouldUsePortal = true;
                newStyle = {
                    position: 'fixed',
                    left: Math.min(
                        cardRect.right + 16,
                        viewportWidth - previewWidth - 16
                    ) + 'px',
                    top: Math.min(
                        cardRect.top,
                        window.innerHeight - 400
                    ) + 'px',
                    animation: 'fadeInScale 0.3s ease-out forwards',
                    zIndex: 9999
                };
            }

            setUsePortal(shouldUsePortal);
            setPreviewStyle(newStyle);
        }
    }, [showPreview]);

    const handleBookmark = (e) => {
        e.preventDefault();

        if (!auth.user) {
            setIsBookmarked(!isBookmarked);
        } else {
            if (isBookmarked) {
                // Unbookmark the course
                router.post(route('courses.unbookmark', course.id), {}, {
                    preserveScroll: true,
                });
            } else {
                // Bookmark the course
                router.post(route('courses.bookmark', course.id), {}, {
                    preserveScroll: true,
                });
            }

            // Toggle the bookmark state
            setIsBookmarked(!isBookmarked);
        }
    };

    const PreviewContent = () => (
        <div
            ref={previewRef}
            className="w-96 bg-white rounded-2xl shadow-xl backdrop-blur-sm bg-white/95"
            style={previewStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="p-6">
                <h4 className="text-xl font-bold mb-4">Course Preview</h4>
                <video
                    className="w-full rounded-lg mb-4"
                    controls
                    src={course.previewVideo || "https://example.com/preview.mp4"}
                >
                    Your browser does not support the video tag.
                </video>
                <p className="text-sm text-gray-600">
                    Get a sneak peek of what you'll learn in this course.
                </p>
            </div>
        </div>
    );

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >
            <style jsx global>{`
                @keyframes slideInFromRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>

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
                                    className={`w-5 h-5 ${isBookmarked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`}
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
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-2 mb-3 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                            {course.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mb-6 text-sm">
                            {course.description}
                        </p>
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


                        {/* Price/Checkout Section */}
                        {isEnrolled ? (
                            // If the user is enrolled, show the "Go To Dashboard" button
                            <div
                                className="
                                    px-6 py-2 rounded-full text-lg font-bold text-center
                                    bg-gradient-to-r from-purple-500 to-purple-700 text-white
                                    transform transition-all duration-300 hover:scale-105
                                "
                            >
                                <Link href="/dashboard" className="w-full block">
                                    Go To Dashboard
                                </Link>
                            </div>
                        ) : (
                            // If the user is not enrolled, show the price/checkout button
                            <div
                                className={`
                                    relative px-6 py-2 rounded-full text-lg font-bold text-center overflow-hidden
                                    transition-all duration-300 transform
                                    ${course.price == 0
                                        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                    }
                                    group-hover:scale-105
                                `}
                            >
                                {/* Price Text */}
                                <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-100%]">
                                    {course.price == 0 ? "Free!" : `$${course.price}`}
                                </div>

                                {/* "Enroll Now" or "Buy Now!" Text */}
                                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 transform translate-x-[100%] group-hover:translate-x-0">
                                    {course.price == 0 ? "Enroll Now" : "Buy Now!"}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {/* Preview Section */}
            {showPreview && (
                usePortal
                    ? createPortal(<PreviewContent />, document.body)
                    : <PreviewContent />
            )}
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
