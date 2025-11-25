"use client"; // must be FIRST LINE

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(`http://localhost:5000/gadgets/${id}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-yellow-400 text-xl">
        Loading...
      </div>
    );

  if (!item || !item.title)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-400 text-xl">
        Product not found!
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      <div className="max-w-5xl w-full bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <img
            src={item.coverImage || "/placeholder.jpg"}
            alt={item.title}
            className="w-full md:w-1/2 rounded-lg object-cover shadow-lg"
          />

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-yellow-400">{item.title}</h1>
            <p className="text-gray-300 mt-4">{item.summary}</p>

            <div className="mt-6">
              <span className="text-xl font-bold text-yellow-400">
                Rating: {item.rating || "N/A"}
              </span>
            </div>

            {/* Features placeholder */}
            {item.features && item.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Features:</h3>
                <ul className="list-disc ml-6 text-gray-300">
                  {item.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back Button */}
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
