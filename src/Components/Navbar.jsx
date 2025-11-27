"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const pathname = usePathname();

  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const buttonRef = useRef(null); // <-- ref for hamburger button

  // Load user when route changes & close menus
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      setLocalUser(stored ? JSON.parse(stored) : null);
    }

    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close menus when clicking outside — but ignore clicks on hamburger button
  useEffect(() => {
    function handleClickOutside(e) {
      // if clicked inside mobile menu, do nothing
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      // if clicked the hamburger button, do nothing (prevents race)
      if (buttonRef.current && buttonRef.current.contains(e.target)) return;
      // if clicked inside profile area, do nothing
      if (profileRef.current && profileRef.current.contains(e.target)) return;

      // otherwise close both menus
      setMenuOpen(false);
      setDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLocalLogout() {
    localStorage.removeItem("user");
    setLocalUser(null);
    window.location.href = "/";
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-gray-900 text-white shadow-md px-6 sticky top-0 z-50">
        <div className="navbar max-w-7xl mx-auto flex justify-between">

          {/* Left Side */}
          <div className="flex items-center gap-2">
            {/* Hamburger for mobile */}
            <button
              ref={buttonRef}
              className="lg:hidden btn btn-ghost text-white"
              onClick={() => setMenuOpen((v) => !v)} // functional toggle
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/" className="btn btn-ghost text-xl text-yellow-400">
              Gadget Store
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-white">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/items">Products</Link></li>

              {(localUser || session) && (
                <>
                  <li><Link href="/add-product">Add Items</Link></li>
                  <li><Link href="/manage-products">Manage Products</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3">

            {/* Guest */}
            {!localUser && !session && (
              <>
                <Link href="/login" className="btn bg-yellow-400 text-gray-900">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  Register
                </Link>
              </>
            )}

            {/* Google Auth User */}
            {session && (
              <div ref={profileRef} className="relative">
                <img
                  src={session.user.image || "/default-user.png"}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen((v) => !v)}
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 text-white border-b border-gray-700">
                      {session.user.name}
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Local Backend User */}
            {localUser && !session && (
              <div ref={profileRef} className="relative">
                <img
                  src={localUser.photoUrl || "/default-user.png"}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdownOpen((v) => !v)}
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 text-white border-b border-gray-700">
                      {localUser.name}
                    </div>
                    <button
                      onClick={handleLocalLogout}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU — FIXED BELOW NAVBAR */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden w-full bg-gray-800 text-white p-5 border-b border-gray-700 z-40"
        >
          <ul className="flex flex-col gap-4 font-medium">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/items" onClick={() => setMenuOpen(false)}>Products</Link></li>

            {(localUser || session) && (
              <>
                <li><Link href="/add-product" onClick={() => setMenuOpen(false)}>Add Items</Link></li>
                <li><Link href="/manage-products" onClick={() => setMenuOpen(false)}>Manage Products</Link></li>
              </>
            )}

            {!localUser && !session && (
              <>
                <li><Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
                <li><Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
