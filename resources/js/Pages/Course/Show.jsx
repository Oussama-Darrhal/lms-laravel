import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/Components/BreadCrumbs";
import Navbar from "@/Components/NavBar";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import {
    User,
    BookOpen,
    CheckCircle,
    PlayCircle,
    Star,
    MessageCircle,
    Send,
} from "lucide-react";
import axios from "axios";

const TabButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`whitespace-nowrap px-4 py-2 ${active
            ? "text-purple-600 border-b-2 border-purple-600"
            : "text-gray-600 hover:text-gray-800"
            }`}
    >
        {children}
    </button>
);

const InstructorCard = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                <img
                    src="/api/placeholder/80/80"
                    alt="Instructor"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">Senior Web Developer</p>
                <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">
                        4.9 (2.5k+ reviews)
                    </span>
                </div>
            </div>
        </div>
        <div className="mt-4">
            <p className="text-gray-700">
                10+ years of experience in web development and teaching.
                Specialized in modern web technologies and frameworks.
            </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold">50+</div>
                <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold">10,000+</div>
                <div className="text-sm text-gray-600">Students</div>
            </div>
        </div>
    </div>
);

const PrerequisitesList = () => (
    <div className="space-y-4 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 className="font-semibold text-lg mb-4">
                Essential Requirements
            </h3>
            <ul className="space-y-3">
                {[
                    "Basic understanding of computers and internet",
                    "A computer with internet connection",
                    "Basic typing skills",
                    "Eagerness to learn web development",
                ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <span className="text-gray-700">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 className="font-semibold text-lg mb-4">
                Recommended Background
            </h3>
            <ul className="space-y-3">
                {[
                    "Basic knowledge of any programming language",
                    "Understanding of file systems",
                    "Familiarity with text editors",
                ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                        <span className="text-gray-700">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const TeachingMethods = () => (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
        {[
            {
                icon: <PlayCircle className="w-8 h-8 text-purple-500" />,
                title: "Video Lectures",
                description:
                    "High-quality video content with practical examples and demonstrations",
            },
            {
                icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
                title: "Interactive Sessions",
                description:
                    "Live Q&A sessions and discussion forums for doubts and clarifications",
            },
            {
                icon: <BookOpen className="w-8 h-8 text-green-500" />,
                title: "Hands-on Projects",
                description:
                    "Real-world projects to apply your learning and build portfolio",
            },
            {
                icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
                title: "Assessments",
                description:
                    "Regular quizzes and assignments to test your understanding",
            },
        ].map((method, index) => (
            <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{method.icon}</div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">
                            {method.title}
                        </h3>
                        <p className="text-gray-700">{method.description}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const TestimonialForm = ({ courseId }) => {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [testimonial, setTestimonial] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!rating || !testimonial.trim()) {
            setErrorMessage("Please provide a rating and a testimonial.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Send the data to the backend
            const response = await axios.post("/testimonials", {
                course_id: courseId,
                rating,
                testimonial,
            });

            if (response.status === 200) {
                setSuccessMessage("Thank you for your testimonial!");
                setRating(0);
                setTestimonial("");
            }
        } catch (error) {
            setErrorMessage("Failed to submit your testimonial. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8 mt-6">
            <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Rating Section */}
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-600">Your Rating:</span>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                className="focus:outline-none"
                            >
                                <Star
                                    className={`w-6 h-6 ${star <= (hoveredStar || rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Testimonial Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Testimonial
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                        placeholder="Share your experience with this course..."
                        value={testimonial}
                        onChange={(e) => setTestimonial(e.target.value)}
                    />
                </div>

                {/* Error and Success Messages */}
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center justify-center w-full px-4 py-2 text-white rounded-md transition-colors duration-200 ${loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
                        }`}
                >
                    {console.log()}
                    {loading ? "Submitting..." : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Testimonial
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

const TestimonialCard = ({ testimonial }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img
                    src="/images/pfp-1.jpg"
                    alt={testimonial.user.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <h4 className="font-semibold">{testimonial.user.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.user.role}</p>
            </div>
        </div>
        <div className="flex mb-3">
            {[...Array(parseInt(testimonial.rating))].map((_, i) => (
                <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                />
            ))}
        </div>
        <p className="text-gray-700">{testimonial.testimonial}</p>
        {console.log(testimonial)}
    </div>
);

export default function Show({ course, breadcrumbs, testimonials }) {
    const [activeTab, setActiveTab] = useState("Description");

    const tabs = [
        "Description",
        "Instructor",
        "Prerequisites",
        "Teaching Methods",
        "Testimonials",
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "Description":
                return (
                    <div className="mt-6 space-y-4">
                        <p className="text-gray-700 text-base sm:text-lg">
                            Web programming is a term that is closely related to
                            websites and the internet. Why is that? Because web
                            programming is one of the processes of creating
                            websites for internet purposes which is usually
                            referred to as WWW or world wide web.
                        </p>
                        <p className="text-gray-700 text-base sm:text-lg">
                            In this course you will be taught how to create an
                            industry-standard website. Here you will be taught
                            about HTML, CSS and Javascript which are the basic
                            foundations in creating a website.
                        </p>
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2 text-lg sm:text-xl">
                                The benefits of learning website programming
                                are:
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-base sm:text-lg">
                                <li>
                                    Able to run business applications and
                                    software
                                </li>
                                <li>Can build your own website</li>
                            </ul>
                        </div>
                    </div>
                );
            case "Instructor":
                return <InstructorCard />;
            case "Prerequisites":
                return <PrerequisitesList />;
            case "Teaching Methods":
                return <TeachingMethods />;
            case "Testimonials":
                return (
                    <div>
                        <TestimonialForm />
                        <div className="grid md:grid-cols-2 gap-6">
                            {
                                // [
                                //     {
                                //         name: "Sarah Johnson",
                                //         role: "Frontend Developer",
                                //         content:
                                //             "This course provided me with a solid foundation in web development. The instructor's teaching style is clear and engaging.",
                                //         rating: 5,
                                //     },
                                //     {
                                //         name: "Michael Chen",
                                //         role: "Student",
                                //         content:
                                //             "As a complete beginner, this course was perfect for me. The pace is just right and the projects are very practical.",
                                //         rating: 5,
                                //     },
                                //     {
                                //         name: "Emily Rodriguez",
                                //         role: "UX Designer",
                                //         content:
                                //             "Great course for understanding the technical aspects of web development. It helped me collaborate better with developers.",
                                //         rating: 4,
                                //     },
                                //     {
                                //         name: "David Kim",
                                //         role: "Entrepreneur",
                                //         content:
                                //             "The knowledge gained from this course helped me launch my own website. Highly recommended for beginners!",
                                //         rating: 5,
                                //     },
                                // ]
                                testimonials.map((testimonial) => (
                                    <TestimonialCard testimonial={testimonial} />
                                ))
                            }
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen mx-auto max-w-[150rem] selection:bg-[#fdd981] selection:text-black">
            <Head title={course.titre} />
            <Navbar />
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <main className="max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-8 pb-32">
                <div className="mb-8">
                    <p className="text-lg sm:text-xl text-gray-600 mb-4">
                        {course.category || "General"}
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-bold">
                        {course.titre}
                    </h2>
                </div>

                {/* Video Player */}
                <div className="aspect-w-16 aspect-h-9 mb-8 bg-gray-100 rounded-lg overflow-hidden">
                    <iframe
                        className="w-full h-[75vh]"
                        src={course.url}
                    ></iframe>
                </div>

                {/* Navigation Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab}
                                active={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </TabButton>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {renderTabContent()}
            </main>

            {/* Section Before Footer */}
            <section className="bg-[#eef5fb] py-16 text-center px-4 sm:px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                    Ready to Take the Next Step?
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-6">
                    We hope you found this course valuable! Whether you're
                    looking to sharpen your skills or dive deeper into the
                    topic, we’re here to help you continue your journey.
                </p>
                <button
                    onClick={() => (window.location.href = "/courses/enrolled")}
                    className="bg-[#fdd981] text-black py-3 px-6 sm:px-10 rounded-full text-base sm:text-xl font-semibold hover:bg-[#fbd46d] focus:outline-none focus:ring-4 focus:ring-[#fdd981] transition-all duration-300"
                >
                    Join the Course
                </button>
            </section>

            <Footer />
        </div>
    );
}
