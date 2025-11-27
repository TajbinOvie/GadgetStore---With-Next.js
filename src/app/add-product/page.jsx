"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddProductPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    summary: "",
    genre: "",
    rating: "",
    coverImage: "",
    date: new Date().toISOString().split("T")[0],
  });

  // 🔐 Redirect if not logged-in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);
    setUserEmail(user.email);
  }, [router]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        userEmail,
        created_at: new Date().toISOString(),
      };

      const res = await axios.post("https://gadget-store-server-zeta.vercel.app/gadgets", payload);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Product added successfully 🎉",
          icon: "success",
          confirmButtonColor: "#facc15",
        });

        setForm({
          title: "",
          shortDesc: "",
          summary: "",
          genre: "",
          rating: "",
          coverImage: "",
          date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add product ❌",
        icon: "error",
        confirmButtonColor: "#facc15",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-900">
      <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Short Description */}
          <input
            name="shortDesc"
            value={form.shortDesc}
            onChange={handleChange}
            placeholder="Short Description"
            required
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Summary */}
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Summary"
            rows={4}
            required
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Genre */}
          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Category / Genre"
            required
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Rating */}
          <input
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating (0 - 5)"
            required
            type="number"
            min="0"
            max="5"
            step="0.1"
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Cover Image URL */}
          <input
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="Optional Cover Image URL"
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Disabled Email */}
          <input
            value={userEmail}
            disabled
            className="w-full p-4 bg-gray-900/40 border border-gray-700 rounded-xl text-gray-400"
          />

          {/* Submit */}
          <button className="w-full py-3 bg-yellow-400 text-gray-900 font-bold text-lg rounded-xl hover:bg-yellow-500 transition">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}


