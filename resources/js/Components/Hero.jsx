import React from "react";
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import "../../css/app.css";

export default function Hero() {
    return (
        <div className="bg-primary min-h-screen pb-0"> {/* Removed padding-bottom */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-white">
                        <h1 className="text-5xl font-bold mb-6">
                            <span className="text-orange-400">Studying</span> Online is now
                            <br />much easier
                        </h1>
                        <p className="mb-8 text-lg">
                            TOTC is an interesting platform that will teach
                            <br />you in a more interactive way
                        </p>
                        <div className="flex items-center space-x-4">
                            <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium">
                                Join for free
                            </button>
                            <button className="flex items-center text-white hover:text-gray-200">
                                <PlayCircleIcon className="h-8 w-8 mr-2" />
                                Watch how it works
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute top-10 right-20 bg-white rounded-lg p-4 shadow-lg">
                            <div className="flex items-center">
                                <div className="mr-3">📅</div>
                                <div>
                                    <div className="font-bold">250k</div>
                                    <div className="text-sm text-gray-600">Assisted Student</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-20 right-10 bg-white rounded-lg p-4 shadow-lg">
                            <div className="flex items-center">
                                <div className="mr-3">📧</div>
                                <div>
                                    <div className="font-bold">Congratulations</div>
                                    <div className="text-sm text-gray-600">Your admission completed</div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-40 left-10 bg-white rounded-lg p-4 shadow-lg">
                            <div className="flex items-center">
                                <img src="https://placekitten.com/40/40" className="w-10 h-10 rounded-full mr-3" alt="User" />
                                <div>
                                    <div className="font-bold">User Experience Class</div>
                                    <div className="text-sm text-gray-600">Today at 12.00 PM</div>
                                    <button className="mt-2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm">
                                        Join Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            alt="Student"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full overflow-hidden mb-0 bottom-0"> {/* Ensure no margin below */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,160 C480,320 960,320 1440,160 L1440,320 L0,320 Z"
                        ></path>
                </svg>
            </div>
        </div>
    );
}
