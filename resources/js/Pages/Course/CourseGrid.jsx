import { Link, usePage } from "@inertiajs/react";

export default function CourseGrid({ courses }) {
    // Access query parameters directly from the URL using `usePage`
    const { url } = usePage();

    // Create a URLSearchParams object from the current URL
    const searchParams = new URLSearchParams(url.split('?')[1]);

    // Get the values for search and category from the query parameters
    const query = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    // Function to display the appropriate message when no courses are found
    const noResultsMessage = () => {
        if (query && category) {
            return `No courses found for the search term "${query}" in this category.`;
        } else if (query) {
            return `No courses found for the search term: "${query}".`;
        } else if (category) {
            return `No courses found in this category.`;
        } else {
            return "No courses found.";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16">
            {courses.length !== 0 ? courses.map((course) => (
                <Link href={course.url} key={course.id} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        <div className="w-full h-64 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-800 truncate">
                                    {course.title}
                                </h3>
                                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                    <span className="text-yellow-500">★</span>
                                    <span className="ml-1 text-yellow-600 font-medium">
                                        {course.rating}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                                {course.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 border-t pt-4">
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {course.duration}
                                </span>
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {course.videos}
                                </span>
                                <span className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    {course.students}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            )) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center p-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {noResultsMessage()}
                    </h2>
                    <p className="text-gray-600 mt-4">Please try a different search or category.</p>
                </div>
            )}
        </div>
    );
}
