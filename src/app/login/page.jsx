"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Login failed",
          confirmButtonColor: "#facc15",
        });
      }

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Login successful 🎉",
        confirmButtonColor: "#facc15",
      }).then(() => {
        window.location.href = "/";
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#facc15",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg overflow-hidden">

        {/* Left Side: Website Info */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gray-900">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">Gadget Store</h1>
          <p className="text-gray-300 text-lg">
            Welcome back! Log in to access your account and explore the latest gadgets and electronics.
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-10 bg-gray-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-md transition">
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400">Or sign in with</div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="mt-2 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition"
          >
            Google
          </button>

          <div className="mt-4 text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-yellow-400 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
