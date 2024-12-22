import React from "react";
import NavBar from "@/Components/NavBar";
import { Head } from "@inertiajs/react";
import Breadcrumbs from "@/Components/BreadCrumbs";
import SearchBar from "@/Components/SearchBar";
import Categories from "@/Components/Categories";
import CourseGrid from "./CourseGrid";
import Footer from "@/Components/Footer";

const categories = [
    { id: "semua", label: "Semua", active: true },
    { id: "ui-design", label: "UI Design" },
    { id: "programming", label: "Programming" },
    { id: "marketing", label: "Marketing" },
    { id: "soft-skill", label: "Soft Skill" },
    { id: "network", label: "Network" },
    { id: "data-analyst", label: "Data Analyst" },
];

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

export default function Index({ courses, breadcrumbs }) {

    const preparedCourses = courses.map((course) => ({
        ...course,
        title: course.titre,
        description: course.description || "No description available",
        category: course.categorie || "General",
        image: course.image || "https://picsum.photos/400/300",
        duration: course.duration || "4.5 Hours",
        videos: course.videos || "20 Videos",
        students: course.students || "1,900 Students",
        rating: course.rating || 4.9,
        url: `/courses/${course.id}`
    }));

    return (
        <div className="min-h-screen mx-auto max-w-[150rem] selection:bg-[#fdd981] selection:text-black">
            <Head title="Courses" />
            <NavBar />
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <main className="max-w-[150rem] px-4 sm:px-6 lg:px-8 mx-auto py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Search Bar */}
                    <SearchBar />
                </div>
                <div className="max-w-4xl mx-auto">
                    {/* Categories */}
                    <Categories categories={categories} />
                </div>

                {/* Course Grid */}
                <CourseGrid courses={preparedCourses} />
            </main>
            {/* Footer */}
            <div className="bg-[#1d1f53] w-full max-w-[150rem] px-4 sm:px-6 lg:px-6">
                <Footer />
            </div>
        </div>
    );
}
