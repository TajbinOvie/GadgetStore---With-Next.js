"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Carousel() {
    const [slides, setSlides] = useState([]);
    const [current, setCurrent] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function fetchSlides() {
            try {
                const res = await axios.get("http://localhost:5000/gadgets");
                if (res.data && res.data.length > 0) {
                    setSlides(res.data.slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to fetch slides:", err);
            }
        }
        fetchSlides();
    }, []);

    const length = slides.length;

    useEffect(() => {
        if (length === 0) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [length]);

    const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
    const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);

    if (length === 0)
        return (
            <div className="w-full h-64 flex items-center justify-center text-white">
                Loading carousel...
            </div>
        );

    const slide = slides[current];

    return (
        <div className="relative bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto mt-12 mb-16">

            {/* CONTENT WRAPPER */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 px-8 py-10">

                {/* IMAGE */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={slide.coverImage || "/placeholder.jpg"}
                        alt={slide.title}
                        className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                    />
                </div>

                {/* TEXT */}
                <div className="md:w-1/2 flex flex-col justify-center gap-5">
                    <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 leading-tight">
                        {slide.title}
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed line-clamp-3">
                        {slide.summary}
                    </p>

                    <button
                        onClick={() => router.push(`/items/${slide._id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg w-max transition"
                    >
                        View Details
                    </button>
                </div>
            </div>

            {/* ARROWS */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-5 transform -translate-y-1/2 
                bg-black/50 text-white p-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
                ◀
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-5 transform -translate-y-1/2 
                bg-black/50 text-white p-3 rounded-full hover:bg-yellow-400 hover:text-black transition"
            >
                ▶
            </button>

            {/* DOTS */}
            <div className="absolute bottom-6 w-full flex justify-center gap-3">
                {slides.map((_, idx) => (
                    <span
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all 
                        ${current === idx ? "bg-yellow-400 scale-125" : "bg-white/40"}`}
                    />
                ))}
            </div>
        </div>
    );
}
