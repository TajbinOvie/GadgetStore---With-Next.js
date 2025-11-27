"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LatestItems() {
    const [items, setItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            try {
                // If backend has /latest API, use this:
                const res = await axios.get("http://localhost:5000/latest");

                // const res = await axios.get("http://localhost:5000/gadgets");
                if (res.data) {
                    setItems(res.data.slice(-3)); // TEMP until latest endpoint exists
                }
            } catch (error) {
                console.error("Failed to load items:", error);
            }
        }
        loadData();
    }, []);

    return (
        <section className="max-w-6xl mx-auto px-6 py-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                Latest Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg 
                                   flex flex-col overflow-hidden 
                                   hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all"
                    >
                        {/* Fixed height image */}
                        <img
                            src={item.coverImage}
                            alt={item.title}
                            className="h-56 w-full object-cover"
                        />

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-yellow-400">{item.title}</h3>

                            <p className="text-gray-300 line-clamp-3 mt-2 flex-grow">
                                {item.shortDesc}
                            </p>

                            <p className="mt-3 font-semibold">Rating: {item.rating}</p>

                            {/* Push button to bottom */}
                            <button
                                onClick={() => router.push(`/items/${item._id}`)}
                                className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 
                                           font-bold py-2 px-4 rounded-lg w-full transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

