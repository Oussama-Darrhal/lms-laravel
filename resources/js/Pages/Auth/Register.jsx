import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { GoArrowLeft } from "react-icons/go";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="mx-4 mt-4 flex flex-col">
                <div className="flex text-xl font-bold cursor-pointer w-fit">
                    <GoArrowLeft className="self-center" />
                    <span className="text-gray-600">HomePage</span>
                </div>

                <div className="flex justify-center w-full mt-2 h-[91vh] bg-gray-200">
                    {/* Left Half with Image */}
                    <div className="relative w-full md:w-1/2 h-full flex items-center justify-center text-white">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-[url('/images/lukas-blazek-GnvurwJsKaY-unsplash.jpg')] bg-cover bg-center"></div>
                        {/* Overlay Layer */}
                        <div className="absolute inset-0 bg-[#1d1f53] bg-opacity-70"></div>
                        {/* Text Content */}
                        <div className="flex z-50 flex-col text-white self-start mt-24 w-[80%]">
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-normal">
                                Discover the Power of Learning
                            </h3>
                            <p className="text-sm text-gray-200 leading-loose w-[80%] md:w-[70%]">
                                Unlock your potential with our platform. Join today to access tailored courses, expert guidance, and a vibrant learning community.
                            </p>
                        </div>
                    </div>

                    {/* Right Half with Sign-up Form */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#1d1f53] px-6 sm:px-16 gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-white self-start">Register</h1>
                        <span className="text-base font-light text-gray-300 mb-4 text-center">
                            Create an account to access exclusive content, track your progress, and join a community of learners.
                        </span>
                        <form onSubmit={submit} className="w-full flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="border border-gray-600 rounded-lg p-4 px-6 focus:ring-[#fcd881] focus:outline-0 focus:border-[#fcd881] bg-[#1d1f53]"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border border-gray-600 rounded-lg p-4 px-6 focus:ring-[#fcd881] focus:outline-0 focus:border-[#fcd881] bg-[#1d1f53]"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="border border-gray-600 rounded-lg p-4 px-6 focus:ring-[#fcd881] focus:outline-0 focus:border-[#fcd881] bg-[#1d1f53]"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="border border-gray-600 rounded-lg p-4 px-6 focus:ring-[#fcd881] focus:outline-0 focus:border-[#fcd881] bg-[#1d1f53]"
                            />
                            <button
                                type="submit"
                                className="bg-[#fcd881] mt-6 text-[#1d1f53] font-bold p-4 rounded-lg hover:bg-[#fcd881]"
                            >
                                Sign Up
                            </button>
                            <span className="text-center text-white">
                                Already Have An Account? <Link className="text-[#fcd881] underline">Login Here!</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
