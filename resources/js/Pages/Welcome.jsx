import React from "react";
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
    <div className="bg-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Build and Achieve Your Dreams
                </h1>
                <p className="text-lg mb-8 text-indigo-100">
                    Join our platform to access free quality education and
                    transform your future in the world of technology
                </p>
                <div className="flex gap-4">
                    <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400">
                        Start Learning
                    </button>
                    <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-900">
                        Learn More
                    </button>
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
                        src="/images/students-learning.jpg"
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
