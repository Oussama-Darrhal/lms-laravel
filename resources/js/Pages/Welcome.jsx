import React from "react";
import { ArrowRight } from "lucide-react";

import {
    BookOpen,
    Users,
    MessageCircle,
    Award,
    Clock,
    Target,
} from "lucide-react";

const NavBar = () => (
    <nav className="bg-indigo-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">EdTech Platform</div>
            <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-indigo-200">
                    Home
                </a>
                <a href="#" className="hover:text-indigo-200">
                    Courses
                </a>
                <a href="#" className="hover:text-indigo-200">
                    About
                </a>
                <a href="#" className="hover:text-indigo-200">
                    FAQ
                </a>
            </div>
            <button className="bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700">
                Login
            </button>
        </div>
    </nav>
);

const Hero = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Bangun dan Wujudkan Cita Bersama EDUFREE
                </h1>
                <p className="text-white/80 text-lg">
                    EDUFREE adalah sebuah layanan kursus dan pelatihan gratis
                    secara online yang bertujuan untuk membantu kamu meraih cita
                    di bidang teknologi
                </p>
                <div className="flex gap-4">
                    <a
                        href="/courses"
                        className="px-6 py-3 bg-[#fdd981] text-[#1d1f53] rounded font-medium hover:bg-[#fdd981]/90"
                    >
                        Lihat Kursus
                    </a>
                    <a
                        href="/path"
                        className="flex items-center gap-2 text-white hover:text-white/80"
                    >
                        Lihat Alur Belajar <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="lg:w-1/2">
                <div className="relative">
                    <div className="bg-white/10 rounded-lg p-6">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-[#ff605c]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd44]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#00ca4e]"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 bg-white/20 rounded w-3/4"></div>
                            <div className="h-2 bg-white/20 rounded w-1/2"></div>
                            <div className="h-2 bg-white/20 rounded w-2/3"></div>
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#fdd981] rounded-lg flex items-center justify-center text-2xl">
                        {}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Stats = () => (
    <div className="container mx-auto py-12 px-4">
        <div className="flex flex-wrap justify-around text-center">
            <div className="p-4">
                <div className="text-3xl font-bold">21,000+</div>
                <div className="text-gray-600">Students</div>
            </div>
            <div className="p-4">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-gray-600">Courses</div>
            </div>
            <div className="p-4">
                <div className="text-3xl font-bold">150+</div>
                <div className="text-gray-600">Mentors</div>
            </div>
        </div>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Icon className="text-indigo-600" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Features = () => (
    <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
                Benefits of Learning With Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    icon={BookOpen}
                    title="Free Courses"
                    description="Access comprehensive learning materials without any cost"
                />
                <FeatureCard
                    icon={Clock}
                    title="Lifetime Access"
                    description="Learn at your own pace with unlimited access to all materials"
                />
                <FeatureCard
                    icon={MessageCircle}
                    title="Expert Consultation"
                    description="Get guidance from industry professionals"
                />
                <FeatureCard
                    icon={Award}
                    title="Certificates"
                    description="Earn recognized certificates upon course completion"
                />
                <FeatureCard
                    icon={Target}
                    title="Focused Learning"
                    description="Structured curriculum designed for optimal learning"
                />
                <FeatureCard
                    icon={Users}
                    title="Experienced Instructors"
                    description="Learn from professionals with real industry experience"
                />
            </div>
        </div>
    </div>
);

const CallToAction = () => (
    <div className="bg-white py-16">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-4">
                        Free E-Learning Services to Help You Grow
                    </h2>
                    <p className="text-gray-600">
                        Join our platform and start your journey towards success
                        in the tech industry
                    </p>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="/api/placeholder/600/400"
                        alt="Students learning"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    </div>
);

const LandingPage = () => (
    <div className="min-h-screen">
        <NavBar />
        <Hero />
        <Stats />
        <Features />
        <CallToAction />
    </div>
);

export default LandingPage;
