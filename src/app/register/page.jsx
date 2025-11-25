"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, photoUrl })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert("Registration successful!");

        // Redirect to home (no NextAuth credentials anymore)
        window.location.href = "/";
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg overflow-hidden">

                {/* Left Side: Website Info */}
                <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gray-900">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-4">Gadget Store</h1>
                    <p className="text-gray-300 text-lg">
                        Discover the latest gadgets, electronics, and tech accessories.
                        Sign up now to explore deals and stay updated with our newest products.
                    </p>
                </div>

                {/* Right Side: Register Form */}
                <div className="md:w-1/2 p-10 bg-gray-800 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
                    <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Photo URL"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                            Register
                        </button>
                    </form>


                    <div className="mt-6 text-center text-gray-400">Or sign up with</div>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="mt-2 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition"
                    >
                        Google
                    </button>
                    {/* Already have an account */}
                    <div className="mt-4 text-center text-gray-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-yellow-400 hover:underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
