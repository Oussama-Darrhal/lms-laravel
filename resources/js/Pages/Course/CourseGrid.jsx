import { Link } from "@inertiajs/react";

export default function CourseGrid({ courses }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24 my-32">
            {courses.map((course) => (
                <Link href={course.url} key={course.id}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col">
                        <div className="w-full h-80 overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold truncate">
                                    {course.title}
                                </h3>
                                <div className="flex items-center">
                                    <span className="text-yellow-400">★</span>
                                    <span className="ml-1">
                                        {course.rating}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4 flex-1">
                                {course.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
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
                                        className="w-4 h-4 mr-1"
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
                                        className="w-4 h-4 mr-1"
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
            ))}
        </div>
    );
}
