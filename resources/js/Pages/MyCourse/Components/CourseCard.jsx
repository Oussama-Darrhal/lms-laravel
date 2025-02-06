import { Head, usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown, Search, Trophy, Clock, Calendar, BarChart, TrendingUp, Star, User, LogOut } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, LayoutDashboard, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart2, PlayCircle
} from 'lucide-react';

const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group transform hover:scale-105">
            <div className="relative">
                <div className="absolute top-4 right-4 z-10 flex space-x-2">
                    <span className={`bg-${course.difficultyColor}/80 text-white text-xs px-2.5 py-1 rounded-full`}>
                        {course.difficulty}
                    </span>
                    {course.progress === 100 && (
                        <span className="bg-green-500/80 text-white text-xs px-2.5 py-1 rounded-full">
                            Completed
                        </span>
                    )}
                </div>
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-900 truncate pr-4">
                        {course.title}
                    </h3>
                    <PlayCircle
                        size={24}
                        className="text-[#1a1b41] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <img
                            src="/api/placeholder/24/24" // Placeholder image for instructor
                            alt="Instructor"
                            className="w-6 h-6 rounded-full"
                        />
                        <span>{course.instructor}</span>
                    </div>
                    <div className="w-1/3">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-[#1a1b41] h-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>
                        <div className="text-right text-xs text-gray-600 mt-1">
                            {course.progress}%
                        </div>
                    </div>
                </div>
                <button className="w-full mt-4 py-3 bg-[#1a1b41] text-white rounded-lg hover:bg-[#2d2e6f] transition-colors duration-200 shadow-md hover:shadow-lg">
                    {course.progress === 100 ? 'View Certificate' : 'Continue Learning'}
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
