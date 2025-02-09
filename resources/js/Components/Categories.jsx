import { createInertiaApp, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Categories({ categories }) {
    const { url } = usePage();
    const [categoryId, setcategoryId] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchQuery = queryParams.get('category');
        setcategoryId(searchQuery || "");
    }, [url]);

    const handleCategoryClick = (category_Id) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('category', category_Id); // Set the category in the URL

        // Preserve the search query if it exists
        const searchQuery = queryParams.get('search');
        if (searchQuery) {
            queryParams.set('search', searchQuery); // Add the existing search query
        }

        // Update the URL
        router.get(`/courses?${queryParams.toString()}`);
    };

    return (
        <div className="flex gap-2 md:gap-4 lg:gap-6 mb-12 pb-4 flex-wrap lg:flex-nowrap justify-center lg:justify-start">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 capitalize
                        ${categoryId == category.id
                            ? "bg-blue-600 text-white shadow-lg transform scale-105"
                            : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                        }
                        hover:shadow-md hover:-translate-y-1`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
