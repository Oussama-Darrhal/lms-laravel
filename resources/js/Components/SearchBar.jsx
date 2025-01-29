import { router } from "@inertiajs/react";
import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        const queryParams = new URLSearchParams(window.location.search);
        if (query.trim()) {
            queryParams.set('search', query); // Set the search query in the URL
        } else {
            queryParams.delete('search'); // Remove search if empty
        }

        // Preserve the category parameter if it exists
        const categoryQuery = queryParams.get('category');
        if (categoryQuery) {
            queryParams.set('category', categoryQuery); // Add the existing category
        }

        // Update the URL
        router.get(`/courses?${queryParams.toString()}`, {
            onSuccess: () => {
                // Scroll down to the courses section after the page updates
                setTimeout(() => {
                    window.scrollTo({
                        top: 300,
                        behavior: "smooth",
                    });
                }, 100);
            }
        });
    };

    const handleClear = () => {
        setQuery("");
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete('search'); // Clear search query

        // Preserve the category if exists
        const categoryQuery = queryParams.get('category');
        if (categoryQuery) {
            queryParams.set('category', categoryQuery);
        }

        router.get(`/courses?${queryParams.toString()}`, {
            onSuccess: () => {
                setTimeout(() => {
                    window.scrollTo({
                        top: 300,
                        behavior: "smooth",
                    });
                }, 100);
            }
        });
    };

    return (
        <div className="relative mt-6 mb-12 max-w-2xl mx-auto">
            <input
                type="text"
                placeholder="Search for courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#1d1f53] focus:ring-2 focus:ring-[#1d1f53]/50 transition-all duration-300 shadow-sm hover:shadow-md bg-gradient-to-r from-gray-50 to-white text-gray-700 placeholder-gray-400"
            />
            <Search
                onClick={handleSearch}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200"
                size={24}
            />
            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    aria-label="Clear search"
                >
                    <X size={24} />
                </button>
            )}
        </div>
    );
}
