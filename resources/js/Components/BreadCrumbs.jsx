import React from "react";
import { Link } from "@inertiajs/react";

const Breadcrumbs = ({ breadcrumbs }) => {
    return (
        <nav className="text-lg text-[#646773] mb-4 bg-[#eef5fb] px-4 sm:px-6 lg:px-8 py-6">
            <ol className="flex space-x-1 text-[#646773]">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <React.Fragment key={index}>
                            {index > 0 && <span className="mx-2">&gt;</span>}
                            {isLast ? (
                                <li
                                    className="text-[#646773] font-semibold cursor-pointer"
                                    aria-current="page"
                                >
                                    {crumb.label}
                                </li>
                            ) : (
                                <li className="">
                                    <Link
                                        href={crumb.url}
                                        className="text-[#646773] font-semibold hover:text-[#1c1f52]"
                                    >
                                        {crumb.label}
                                    </Link>
                                </li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
