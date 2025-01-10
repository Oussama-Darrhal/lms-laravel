// EnrollmentSuccess.jsx

import React from 'react';
import { CheckCircle } from 'lucide-react'; // Importing a check circle icon
import { Head } from '@inertiajs/react';

const EnrollmentSuccess = ({ course }) => {
    return (
        <div className="bg-gradient-to-br from-[#1c1f52] to-[#fdd981] flex items-center justify-center min-h-screen">
            <Head title='Enrolled !' />
            <div className="bg-white rounded-lg shadow-2xl p-10 text-center w-full max-w-lg">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 text-white rounded-full p-4 shadow-lg">
                        <CheckCircle className="w-16 h-16" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Enrollment Successful!</h1>
                <h2 className="text-xl text-gray-600 mb-4">
                    You are now enrolled in:
                    <span className="font-semibold text-blue-900">{course.titre}</span>
                </h2>
                <p className="text-gray-700 mb-6">
                    You're on your way to mastering new skills! Get ready to dive into the course material.
                </p>
                <a
                    href="/dashboard"
                    className="bg-[#fdd981] text-black py-3 px-6 rounded-lg shadow hover:bg-[#fbd46d] transition duration-300 transform hover:scale-105"
                >
                    Go to Dashboard
                </a>
            </div>
        </div>
    );
};

export default EnrollmentSuccess;
