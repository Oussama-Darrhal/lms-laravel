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
