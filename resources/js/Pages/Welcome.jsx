import React from "react";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";
import NavBar from "../Components/NavBar";
import Hero from "@/Components/Hero";
import Stats from "@/Components/Stats";
import Features from "@/Components/Features";
import CallToAction from "@/Components/CallToAction";
import Testimonials from "@/Components/Testimonials";
import FAQSection from "@/Components/FAQSection";
import Footer from "@/Components/Footer";
import MainLayout from "@/Layouts/MainLayout";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.7, ease: "easeInOut" } },
};

const slideFromLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.7, ease: "easeInOut" } },
};

const slideFromRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.7, ease: "easeInOut" } },
};

const LandingPage = () => (
    <MainLayout>

        <div className="min-h-screen mx-auto max-w-[150rem] selection:bg-[#fdd981] selection:text-black">
            <Head title="Welcome" />
            <NavBar />

            <Hero />

            {/* Stats Section */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-[#eef5fb] w-full"
            >
                <Stats />
            </motion.div>

            {/* Features Section */}
            <motion.div
                variants={slideFromLeftVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto max-w-[150rem] px-4 sm:px-6 lg:px-6"
            >
                <Features />
            </motion.div>

            {/* CallToAction Section */}
            <div
                variants={slideFromRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto max-w-[150rem] px-4 sm:px-6 lg:px-6"
            >
                <CallToAction />
            </div>

            {/* Testimonials Section */}
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-[#eef5fb] w-full max-w-[150rem] px-4 sm:px-6 lg:px-6"
            >
                <Testimonials />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                variants={slideFromLeftVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white w-full max-w-[150rem] px-4 sm:px-6 lg:px-6"
            >
                <FAQSection />
            </motion.div>

            {/* Footer Section */}
            <motion.div
                variants={slideFromRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-[#1d1f53] w-full max-w-[150rem] px-4 sm:px-6 lg:px-6"
            >
                <Footer />
            </motion.div>
        </div>
    </MainLayout>
);

export default LandingPage;
