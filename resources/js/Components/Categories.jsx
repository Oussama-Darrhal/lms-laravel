import { useState } from "react";

export default function Categories({ categories }) {
    const [activeCategory, setActiveCategory] = useState("semua");

    return (
        <div className="flex gap-2 md:gap-4 lg:gap-6 mb-12 pb-4 flex-wrap lg:flex-nowrap justify-center lg:justify-start">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                        activeCategory === category.id
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
