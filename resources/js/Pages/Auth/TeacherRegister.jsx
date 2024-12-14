import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { GoArrowLeft } from "react-icons/go";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        subject: "",
        experience: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("storeTeacher"), {
            onFinish: () =>
                reset(
                    "password",
                    "password_confirmation",
                ),
        });
    };

    const experienceRanges = [
        { label: "0 years of experience", value: "0" },
        { label: "1-3 years of experience", value: "1-3" },
        { label: "3-6 years of experience", value: "3-6" },
        { label: "6-9 years of experience", value: "6-9" },
        { label: "9-12 years of experience", value: "9-12" },
        { label: "12-15 years of experience", value: "12-15" },
        { label: "15-18 years of experience", value: "15-18" },
        { label: "18-21 years of experience", value: "18-21" },
        { label: "21-24 years of experience", value: "21-24" },
        { label: "24-27 years of experience", value: "24-27" },
        { label: "27-30 years of experience", value: "27-30" },
        { label: "30-33 years of experience", value: "30-33" },
        { label: "33-36 years of experience", value: "33-36" },
        { label: "36-39 years of experience", value: "36-39" },
        { label: "40+ years of experience", value: "40+" },
    ];

    return (
        <>
            <Head title="Register" />

            <div className="min-h-screen flex flex-col p-4 selection:bg-[#fdd981] selection:text-black">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold w-fit"
                >
                    <GoArrowLeft className="text-2xl" />
                    <span className="text-gray-600">HomePage</span>
                </Link>

                <div className="flex flex-col md:flex-row flex-1 mt-4 bg-gray-200">
                    {/* Left Half - Image Section */}
                    <div className="relative w-full md:w-1/2 min-h-[300px] md:h-auto">
                        <div className="absolute inset-0 bg-[url('/images/lukas-blazek-GnvurwJsKaY-unsplash.jpg')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-[#1d1f53] bg-opacity-70" />
                        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                Discover the Power of Teaching
                            </h3>
                            <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-lg">
                                Join our platform to share your knowledge,
                                inspire students, and make a lasting impact.
                            </p>
                        </div>
                    </div>

                    {/* Right Half - Form Section */}
                    <div className="w-full md:w-1/2 bg-[#1d1f53] p-6 md:p-12 flex flex-col justify-center">
                        <div className="max-w-md w-full mx-auto">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Register as a Teacher
                            </h1>
                            <p className="text-sm md:text-base text-gray-300 mb-8">
                                Create an account to start teaching, share your
                                expertise, and shape the future.
                            </p>
                            <form onSubmit={submit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    value={data.name}  // Binding value from the form hook
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    value={data.email}  // Binding value from the form hook
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    value={data.password}  // Binding value from the form hook
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError message={errors.password} className="mt-2" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    value={data.password_confirmation}  // Binding value from the form hook
                                    onChange={(e) =>
                                        setData("password_confirmation", e.target.value)
                                    }
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />

                                {/* Teacher-specific fields */}
                                <input
                                    type="text"
                                    placeholder="Subject Expertise"
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                    value={data.subject}  // Binding value from the form hook
                                    onChange={(e) =>
                                        setData("subject", e.target.value)
                                    }
                                />
                                <InputError message={errors.subject} className="mt-2" />

                                <select
                                    value={data.experience}  // Binding value from the form hook
                                    onChange={(e) =>
                                        setData("experience", e.target.value)
                                    }
                                    className="w-full border border-gray-600 rounded-lg p-3 md:p-4 text-white placeholder-gray-400 focus:ring-[#fcd881] focus:border-[#fcd881] bg-[#1d1f53]"
                                >
                                    <option value="" disabled>
                                        Select Years of Experience
                                    </option>
                                    {experienceRanges.map((range) => (
                                        <option key={range.value} value={range.value}>
                                            {range.label}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.experience} className="mt-2" />

                                <button
                                    type="submit"
                                    className="w-full bg-[#fcd881] text-[#1d1f53] font-bold p-3 md:p-4 rounded-lg hover:bg-[#fcd881]/90 transition-colors mt-6"
                                >
                                    Sign Up
                                </button>
                                <p className="text-center text-white text-sm md:text-base mt-4">
                                    Already Have An Account?{" "}
                                    <Link href="/login" className="text-[#fcd881] underline">
                                        Login Here!
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
