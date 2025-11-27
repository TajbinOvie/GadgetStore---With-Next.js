"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/Components/Loader";
import Link from "next/link";

export default function ItemsPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [gadgets, setGadgets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/gadgets")
            .then((res) => {
                setGadgets(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading gadgets:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <LoadingSpinner />;

    const filtered = gadgets.filter((g) => {
        if (!g || !g.title) return false;
        return g.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto bg-white dark:bg-gray-900 dark:text-white">
            <h1 className="text-4xl font-bold mb-2">Gadget Store</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
                Browse our collection of top-rated gadgets and electronics.
            </p>

            {/* Search + Category */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search gadgets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border dark:border-gray-700 p-3 rounded-lg w-full bg-white dark:bg-gray-800 dark:text-white"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border dark:border-gray-700 p-3 rounded-lg w-full md:w-48 bg-white dark:bg-gray-800 dark:text-white"
                >
                    <option value="All">All Categories</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Phone">Phone</option>
                    <option value="Camera">Camera</option>
                    <option value="Tablet">Tablet</option>
                </select>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((item) => (
                    <Link href={`/items/${item._id}`} key={item._id}>
                        <div className="border dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800 h-full flex flex-col">

                            {/* Fixed Image height */}
                            <img
                                src={item.coverImage}
                                alt={item.title}
                                className="h-48 w-full object-cover rounded-t-xl"
                            />

                            {/* Content Area */}
                            <div className="p-5 flex flex-col flex-1">
                                <h2 className="text-xl font-semibold">{item.title}</h2>

                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                                    {item.shortDesc}
                                </p>

                                <p className="mt-3 font-semibold">Rating: {item.rating}</p>

                                {/* Makes button stick bottom */}
                                <div className="mt-auto">
                                    <button className="mt-4 w-full bg-[#FDC700] text-black py-2 rounded-lg hover:bg-yellow-400 transition">
                                        View Details
                                    </button>

                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
                    No items found.
                </p>
            )}
        </div>
    );
}

