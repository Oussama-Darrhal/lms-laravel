import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, usePage } from "@inertiajs/react";

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//     const [isMobileProfileMenuOpen, setIsMobileProfileMenuOpen] = useState(false);

//     const { auth } = usePage().props;
//     const { post } = useForm();

//     const navLinks = [
//         { href: "/", label: "Home" },
//         { href: "/courses", label: "Courses" },
//         { href: "/contact", label: "Contact Us" },
//         { href: "/blog", label: "Blog" },
//     ];

//     const profileMenuRef = useRef(null);
//     const mobileProfileMenuRef = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//                 setIsProfileMenuOpen(false);
//             }
//             if (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target)) {
//                 setIsMobileProfileMenuOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [isProfileMenuOpen, isMobileProfileMenuOpen]);

//     const logout = (e) => {
//         e.preventDefault();
//         post(route("logout"));
//     };

//     return (
//         <>
//             <div className="w-full bg-[#1c1f52] text-white relative">
//                 <div className="px-4 sm:px-6 lg:px-8">
//                     <header className="flex items-center justify-between py-6">
//                         <motion.div className="flex-shrink-0">
//                             <span className="text-2xl font-bold">[Instructly]</span>
//                         </motion.div>

//                         <nav className="hidden md:flex items-center space-x-8">
//                             <motion.ul className="flex space-x-8">
//                                 {navLinks.map((link) => (
//                                     <li key={link.label}>
//                                         <a
//                                             href={link.href}
//                                             className="text-white/90 hover:text-white transition-colors duration-200"
//                                         >
//                                             {link.label}
//                                         </a>
//                                     </li>
//                                 ))}
//                             </motion.ul>

//                             <div className="flex items-center space-x-4">
//                                 {auth?.user ? (
//                                     <div className="relative">
//                                         <button
//                                             onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
//                                             className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:bg-white/10 transition-colors duration-200"
//                                         >
//                                             {auth.user.profile_picture ? (
//                                                 <img
//                                                     src={auth.user.profile_picture}
//                                                     alt="Profile"
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             ) : (
//                                                 <User className="h-6 w-6 text-white" />
//                                             )}
//                                         </button>

//                                         {isProfileMenuOpen && (
//                                             <motion.div
//                                                 ref={profileMenuRef}
//                                                 className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
//                                             >
//                                                 <ul className="py-2">
//                                                     <li onClick={() => window.location.href = "/profile"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
//                                                     <li onClick={() => window.location.href = "/dashboard"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
//                                                     <li>
//                                                         <form onSubmit={logout} style={{ display: 'inline' }}>
//                                                             <button type="submit" className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left">Logout</button>
//                                                         </form>
//                                                     </li>
//                                                 </ul>
//                                             </motion.div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <a
//                                         href="/login"
//                                         className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200"
//                                     >
//                                         Log in
//                                     </a>
//                                 )}
//                             </div>
//                         </nav>

//                         <motion.button
//                             type="button"
//                             className="md:hidden rounded-lg p-2 hover:bg-white/10 transition-colors duration-200"
//                             onClick={() => setIsMenuOpen(!isMenuOpen)}
//                         >
//                             <span className="sr-only">Open menu</span>
//                             {isMenuOpen ? (
//                                 <X className="h-6 w-6" aria-hidden="true" />
//                             ) : (
//                                 <Menu className="h-6 w-6" aria-hidden="true" />
//                             )}
//                         </motion.button>
//                     </header>

//                     {isMenuOpen && (
//                         <motion.div className="md:hidden py-4">
//                             <div className="space-y-1">
//                                 {navLinks.map((link) => (
//                                     <a
//                                         key={link.label}
//                                         href={link.href}
//                                         className="block px-4 py-2 text-white/90 hover:bg-white/10 hover:text-white transition-colors duration-200"
//                                     >
//                                         {link.label}
//                                     </a>
//                                 ))}
//                                 <div className="mt-4 px-4">
//                                     {auth?.user ? (
//                                         <div className="relative">
//                                             <button
//                                                 onClick={() => setIsMobileProfileMenuOpen(!isMobileProfileMenuOpen)}
//                                                 className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-white/20 hover:bg-white/10 transition-colors duration-200"
//                                             >
//                                                 {auth.user.profile_picture ? (
//                                                     <img
//                                                         src={auth.user.profile_picture}
//                                                         alt="Profile"
//                                                         className="w-full h-full object-cover"
//                                                     />
//                                                 ) : (
//                                                     <User className="h-6 w-6 text-white" />
//                                                 )}
//                                             </button>

//                                             {isMobileProfileMenuOpen && (
//                                                 <motion.div
//                                                     ref={mobileProfileMenuRef}
//                                                     className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
//                                                 >
//                                                     <ul className="py-2">
//                                                         <li onClick={() => window.location.href = "/profile"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
//                                                         <li onClick={() => window.location.href = "/dashboard"} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
//                                                         <li>
//                                                             <form onSubmit={logout} style={{ display: 'inline' }}>
//                                                                 <button type="submit" className="px-4 py-2 hover:bg-gray-200 cursor-pointer w-full text-left">Logout</button>
//                                                             </form>
//                                                         </li>
//                                                     </ul>
//                                                 </motion.div>
//                                             )}
//                                         </div>
//                                     ) : (
//                                         <a
//                                             href="/login"
//                                             className="block w-full text-center px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-200"
//                                         >
//                                             Log in
//                                         </a>
//                                     )}
//                                 </div>
//                             </div>
//                         </motion.div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Navbar;

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileProfileMenuOpen, setIsMobileProfileMenuOpen] = useState(false);

    const { auth } = usePage().props;
    const { post } = useForm();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/contact", label: "Contact Us" },
        { href: "/blog", label: "Blog" },
    ];

    const profileMenuRef = useRef(null);
    const mobileProfileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
            if (mobileProfileMenuRef.current && !mobileProfileMenuRef.current.contains(event.target)) {
                setIsMobileProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen, isMobileProfileMenuOpen]);

    const logout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (
        <nav className="w-full bg-teal-400 text-white py-4">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <div className="text-2xl font-bold">TOTC</div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                className="text-white hover:text-orange-500 transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Action Buttons */}
                <div className="hidden md:flex space-x-4">
                    {auth?.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-teal-400 hover:bg-gray-100 transition-colors"
                            >
                                {auth.user.profile_picture ? (
                                    <img
                                        src={auth.user.profile_picture}
                                        alt="Profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <User className="h-6 w-6" />
                                )}
                            </button>
                            {isProfileMenuOpen && (
                                <motion.div
                                    ref={profileMenuRef}
                                    className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
                                >
                                    <ul className="py-2">
                                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                                        <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</li>
                                        <li>
                                            <form onSubmit={logout}>
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                                                    Logout
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button className="bg-white text-teal-400 px-6 py-2 rounded-full">
                                Login
                            </button>
                            <button className="bg-white text-teal-400 px-6 py-2 rounded-full">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    {isMenuOpen && (
                        <motion.div
                            className="absolute top-16 left-0 w-full bg-teal-400 text-white shadow-md z-10"
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul className="flex flex-col space-y-2 px-4 py-4">
                                {navLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="block py-2 text-white hover:text-orange-500"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                                {auth?.user && (
                                    <li>
                                        <button
                                            onClick={() => setIsMobileProfileMenuOpen(!isMobileProfileMenuOpen)}
                                            className="w-full text-left py-2"
                                        >
                                            Profile
                                        </button>
                                        {isMobileProfileMenuOpen && (
                                            <motion.div
                                                ref={mobileProfileMenuRef}
                                                className="bg-white text-black rounded-lg shadow-lg mt-2"
                                            >
                                                <ul className="py-2">
                                                    <li className="px-4 py-2 hover:bg-gray-200">Profile</li>
                                                    <li className="px-4 py-2 hover:bg-gray-200">Dashboard</li>
                                                    <li>
                                                        <form onSubmit={logout}>
                                                            <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                                                                Logout
                                                            </button>
                                                        </form>
                                                    </li>
                                                </ul>
                                            </motion.div>
                                        )}
                                    </li>
                                )}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
