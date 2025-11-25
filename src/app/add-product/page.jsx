"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AddGadgetPage() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });

  const [userEmail, setUserEmail] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    try {
      const payload = {
        ...form,
        userEmail,
        created_at: new Date().toISOString(),
      };

      const res = await axios.post("http://localhost:5000/gadgets", payload);

      if (res.data.insertedId) {
        setMsg("🟢 Gadget added successfully!");

        setForm({
          title: "",
          author: "",
          genre: "",
          rating: "",
          summary: "",
          coverImage: "",
        });
      }
    } catch {
      setMsg("❌ Failed to add gadget");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gray-900">
      <div className="w-full max-w-2xl bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
          Add New Gadget
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "title", placeholder: "Gadget Title" },
            { name: "author", placeholder: "Brand / Manufacturer" },
            { name: "genre", placeholder: "Category (Laptop, Phone, etc.)" },
            { name: "rating", placeholder: "Rating (e.g., 4.8)" },
            { name: "coverImage", placeholder: "Image URL" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
          ))}

          <input
            value={userEmail}
            disabled
            className="w-full p-4 bg-gray-900/40 border border-gray-700 rounded-xl text-gray-400"
          />

          <textarea
            name="summary"
            rows={4}
            value={form.summary}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none"
            required
          />

          <button className="w-full py-3 bg-yellow-400 text-gray-900 font-bold text-lg rounded-xl hover:bg-yellow-500 transition">
            Add Gadget
          </button>
        </form>

        {msg && (
          <p className="text-center mt-6 text-yellow-400 text-lg">{msg}</p>
        )}
      </div>
    </div>
  );
}
