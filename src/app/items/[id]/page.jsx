"use client"; // must be FIRST LINE

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/Components/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`https://gadget-store-server-zeta.vercel.app/gadgets/${id}`);
        const data = await res.json();

        // If API returns an array, pick the first element
        const product = Array.isArray(data) ? data[0] : data;

        setItem(product);
      } catch (err) {
        console.error("Failed to fetch item:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!item || !item.title)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-xl">
        Product not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      <div className="max-w-6xl w-full bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* PRODUCT IMAGE */}
          <div className="w-full">
            <img
              src={item.coverImage || "/placeholder.jpg"}
              alt={item.title}
              className="w-full h-[350px] md:h-[450px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* PRODUCT INFO */}
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">{item.title}</h1>

            {/* GENRE */}
            {item.genre && (
              <p className="mt-2 text-gray-400 italic">Category: {item.genre}</p>
            )}

            {/* FULL SUMMARY */}
            {item.summary && (
              <p className="mt-4 text-gray-300">{item.summary}</p>
            )}

            {/* RATING */}
            <p className="mt-6 text-xl font-bold text-yellow-400">
              Rating: {item.rating || "N/A"}
            </p>

            {/* FEATURES */}
            {item.features && item.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Features:</h3>
                <ul className="list-disc ml-6 text-gray-300">
                  {item.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => router.back()}
              className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition"
            >
              Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
