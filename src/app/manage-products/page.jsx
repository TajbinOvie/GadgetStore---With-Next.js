"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ManageProducts() {
  const [gadgets, setGadgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const load = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/gadgets?email=${userEmail}`
        );
        setGadgets(res.data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userEmail]);

  async function handleDelete(id) {
    if (!confirm("Delete this gadget?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/gadgets/${id}`);

      if (res.data.deletedCount > 0) {
        setGadgets((prev) => prev.filter((g) => g._id !== id));
      }
    } catch {
      alert("Error deleting gadget");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-yellow-400">
        Manage Your Products
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : gadgets.length === 0 ? (
        <p className="text-center text-gray-400">
          You haven't uploaded any products yet.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-800 shadow-xl">
          <table className="w-full bg-gray-900/70 backdrop-blur-xl">
            <thead className="bg-gray-800/80">
              <tr className="text-yellow-400 text-left">
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {gadgets.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-t border-gray-700 hover:bg-gray-800 transition ${
                    index % 2 === 0 ? "bg-gray-900/50" : "bg-gray-900/30"
                  }`}
                >
                  <td className="p-4">
                    <img
                      src={item.coverImage}
                      className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                      alt=""
                    />
                  </td>

                  <td className="p-4 font-semibold">{item.title}</td>
                  <td className="p-4">{item.genre}</td>
                  <td className="p-4">{item.rating}</td>

                  <td className="p-4 flex gap-3">
                    <Link
                      href={`/items/${item._id}`}
                      className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
