import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "@/Components/BreadCrumbs";
import Navbar from "@/Components/NavBar";
import { Head, usePage } from "@inertiajs/react";
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
import * as Icons from 'lucide-react'; // Import all Lucide icons
import axios from "axios";
import CheckoutButton from "@/Components/CheckoutButton";

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

const InstructorCard = ({ teacherDetails }) => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 capitalize">
        <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                <img
                    src={teacherDetails.profile_picture}
                    alt="Instructor"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <h3 className="text-xl font-semibold">{teacherDetails.name}</h3>
                <p className="text-gray-600 capitalize">{"Teacher of " + teacherDetails.subject}</p>
            </div>
        </div>
        <div className="mt-4">
            <p className="text-gray-700">
                {teacherDetails.experience + " years of experience in " + teacherDetails.subject}
            </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold">{teacherDetails.user_courses}</div>
                <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold">{teacherDetails.userCount}</div>
                <div className="text-sm text-gray-600">Students</div>
            </div>
        </div>
    </div>
);

const PrerequisitesList = ({ prerequisites }) => (
    <div className="space-y-4 mt-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 className="font-semibold text-lg mb-4">
                Essential Requirements
            </h3>
            <ul className="space-y-3">
                {prerequisites.Essential_Requirements.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <Icons.CheckCircle className="w-5 h-5 text-green-500 mt-1" />
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
                {prerequisites.Recommended_Background.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        <Icons.BookOpen className="w-5 h-5 text-blue-500 mt-1" />
                        <span className="text-gray-700">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const TeachingMethodsList = ({ methods }) => (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
        {methods && methods.map((method, index) => {
            const iconColors = {
                PlayCircle: '#a855f7',
                MessageCircle: '#3b82f6',
                BookOpen: '#22c55e',
                CheckCircle: '#eab308',
            };
            const IconComponent = Icons[method.icon];
            const iconColor = iconColors[method.icon] || '#a855f7';

            return (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            {IconComponent && <IconComponent color={iconColor} className="w-8 h-8" />}
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">
                                {method.title}
                            </h3>
                            <p className="text-gray-700">{method.description}</p>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);

const TestimonialForm = () => {
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [testimonial, setTestimonial] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { auth } = usePage().props;
    const { course } = usePage().props;

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
                course_id: course.id,
                user_id: auth.user.id,
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
}

const TestimonialCard = ({ testimonial }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTestimonial, setNewTestimonial] = useState(testimonial.testimonial);
    const [newRating, setNewRating] = useState(testimonial.rating);

    const { auth } = usePage().props; // Get the logged-in user data
    const { course } = usePage().props; // Get the course data
    const dropdownRef = useRef(null); // Create a ref for the dropdown menu

    // Check if the logged-in user exists and is the one who made the testimonial
    const isUserOwner = auth.user && auth.user.id === testimonial.user.id;

    // Fallback to a doll image if no profile picture is available
    const profilePicture = testimonial.user.profile_picture || '/images/pfp-2.jpg'; // Replace with the actual path to your doll image

    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsOpen(false);
    };

    const handleDelete = async () => {
        if (!testimonial.id) return; // Ensure there's an id to delete
        console.log('Delete testimonial:', testimonial.id);
        try {
            const response = await axios.delete(`/testimonials/${testimonial.id}`);
            if (response.status === 200) {
                console.log('Testimonial deleted');
                window.location.reload(); // Refresh the page after deletion
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
        }
        setIsOpen(false);
    };

    const handleRatingChange = (event) => {
        setNewRating(event.target.value);
    };

    const handleTestimonialChange = (event) => {
        setNewTestimonial(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/testimonials/${testimonial.id}`, {
                course_id: course.id,
                user_id: testimonial.user.id,
                testimonial: newTestimonial,
                rating: newRating,
            });

            if (response.status === 200) {
                console.log('Testimonial updated successfully!');
                setNewTestimonial(testimonial.testimonial); // Reset to original
                setNewRating(testimonial.rating); // Reset to original
                window.location.reload(); // Refresh the page to see changes
            }
        } catch (error) {
            console.error('Error updating testimonial:', error);
        } finally {
            setIsEditing(false);
        }
    };

    // Close the dropdown menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 relative">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={newTestimonial}
                        onChange={handleTestimonialChange}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        rows="3"
                    />
                    <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                            <label key={i} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    value={i + 1}
                                    checked={newRating == i + 1}
                                    onChange={handleRatingChange}
                                    className="hidden"
                                />
                                <Star
                                    className={`w-4 h-4 ${i < newRating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                                />
                            </label>
                        ))}
                    </div>
                    <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                            <img
                                src={profilePicture} // Use the profile picture or fallback to the doll image
                                alt={testimonial.user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-semibold">{testimonial.user.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.user.role}</p>
                        </div>
                        {isUserOwner && (
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={handleToggleMenu}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <Icons.MoreVertical className="w-5 h-5" />
                                </button>
                                {isOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                                    >
                                        <button
                                            onClick={handleEdit}
                                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="text-gray-600">{testimonial.testimonial}</div>
                    <div className="flex items-center space-x-2 mt-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


export default function Show({ course, breadcrumbs, testimonials, teachingMethods, user, prerequisites, description, category_name, EnrolledUsers }) {
    const [activeTab, setActiveTab] = useState("Description");
    const { auth } = usePage().props;

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
                    <div className="mt-10 space-y-4">
                        {description && <div className="mb-4" dangerouslySetInnerHTML={{ __html: description.content }} />}
                    </div>
                );
            case "Instructor":
                return <InstructorCard teacherDetails={user} />;
            case "Prerequisites":
                return <PrerequisitesList prerequisites={prerequisites} />;
            case "Teaching Methods":
                return <TeachingMethodsList methods={teachingMethods} />;
            case "Testimonials":
                return (
                    <div>
                        {
                            auth.user && <TestimonialForm />
                        }
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            {
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
                    <p className="text-lg sm:text-xl text-gray-600 mb-4 uppercase">
                        {category_name || "General"}
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
                    <nav className="flex sm:flex-row flex-col sm:space-x-8 space-y-4 sm:space-y-0 overflow-x-auto">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab}
                                active={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                                className="text-center sm:flex-1 flex-none"
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

                {console.log(EnrolledUsers)}

                <CheckoutButton
                    courseId={course.id}
                    courseName={course.titre}
                    coursePrice={course.price}
                    text={"Join the Course"}
                    styles="bg-[#fdd981] text-black py-3 px-6 sm:px-10 rounded-full text-base sm:text-xl font-semibold hover:bg-[#fbd46d] focus:outline-none focus:ring-4 focus:ring-[#fdd981] transition-all duration-300"
                />
            </section>

            <Footer />
        </div>
    );
}
