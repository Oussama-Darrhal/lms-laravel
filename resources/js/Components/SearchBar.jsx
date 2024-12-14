import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="relative mt-14 mb-8">
            <input
                type="text"
                placeholder="Cari Kursus . . ."
                className="w-full px-4 py-3 rounded-lg border border-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1d1f53]"
            />
            <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
        </div>
    );
}
