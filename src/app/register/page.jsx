"use client";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                    Create Account
                </h2>

                <form className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white border-gray-300"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white border-gray-300"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white border-gray-300"
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-gray-700 dark:text-gray-300 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white border-gray-300"
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </span>
                    </div>

                    {/* Register Button */}
                    <button
                        type="button"
                        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg mt-4 font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                        Register
                    </button>

                    {/* Footer */}
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                        Already have an account?{" "}
                        <a href="#" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
