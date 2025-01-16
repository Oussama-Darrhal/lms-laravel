import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Head, useForm } from "@inertiajs/react";
// import { router } from "@inertiajs/react";

// const sectionVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: { duration: 1.7, ease: "easeInOut", delay: 0.2 },
//     },
// };

// const ForgotPassword = () => {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: "",
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('password.email'));
//     };

//     return (
//         <>
//             <Head title="Forgot Password" />

//             <div className="min-h-screen flex overflow-hidden">
//                 <motion.div
//                     className="hidden md:flex md:w-1/2 relative m-10 bg-teal-600 rounded-3xl overflow-hidden"
//                     variants={sectionVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                 >
//                     <img
//                         src="images/classroom.jpg"
//                         alt="Professional Learning Environment"
//                         className="object-cover w-full h-full"
//                     />
//                     <div className="absolute inset-0 bg-teal-600/40" />
//                     <div className="absolute bottom-16 left-8 text-white">
//                         <h2 className="text-4xl font-bold mb-2">Recover Your Account</h2>
//                         <p className="text-xl">We are here to help you regain access.</p>
//                     </div>
//                 </motion.div>

//                 <motion.div
//                     className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center"
//                     variants={sectionVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                 >
//                     <div className="w-full max-w-md">
//                         <div className="text-center mb-8">
//                             <h1 className="text-2xl font-semibold mb-2">Forgot Your Password?</h1>
//                             <p className="text-gray-600">
//                                 Enter your email address to receive a password reset link.
//                             </p>
//                         </div>

//                         <form onSubmit={submit} className="space-y-6">
//                             <div>
//                                 <label className="block text-gray-600 text-sm mb-2">Email Address</label>
//                                 <motion.input
//                                     type="text"
//                                     placeholder="Enter your email"
//                                     className="w-full px-6 py-3 rounded-full border border-[#63C5B5] focus:outline-none focus:border-[#63C5B5] placeholder-gray-400 text-sm"
//                                     value={data.email}
//                                     onChange={(e) => setData("email", e.target.value)}
//                                     whileFocus={{ scale: 1.02 }}
//                                 />
//                                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                             </div>

//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 type="submit"
//                                 className="w-full px-6 py-3 bg-[#63C5B5] text-white rounded-full hover:bg-[#51a898] transition-colors text-sm font-medium"
//                                 disabled={processing}
//                             >
//                                 Send Password Reset Link
//                             </motion.button>
//                         </form>

//                         <div className="mt-4 text-center">
//                             <p className="text-gray-600 text-sm">
//                                 Remembered your password?{" "}
//                                 <motion.button
//                                     whileHover={{ scale: 1.01 }}
//                                     type="button"
//                                     onClick={() => router.visit("/login")}
//                                     className="text-[#63C5B5] hover:text-[#51a898]"
//                                 >
//                                     Sign In
//                                 </motion.button>
//                             </p>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </>
//     );
// };

// export default ForgotPassword;
