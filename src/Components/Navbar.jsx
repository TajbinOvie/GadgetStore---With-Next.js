"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localUser, setLocalUser] = useState(null);

  const pathname = usePathname();
  // TRIGGER useEffect whenever route changes

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser));
      } else {
        setLocalUser(null); // 🟢 fixes logout also
      }
    }
  }, [pathname]); // 👈 Triggers EVERY TIME page changes

  function handleLocalLogout() {
    localStorage.removeItem("user");
    setLocalUser(null);      // 🟢 instantly update navbar
    window.location.href = "/";
  }

  return (
    <div className="navbar bg-gray-900 text-white shadow-sm px-6">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl text-yellow-400">
          Gadget Store
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
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

      <div className="navbar-end flex items-center gap-2">
        {/* SHOW NOTHING IF DATA STILL LOADING */}
        {localUser === null && !session && (
          <>
            <Link href="/login" className="btn bg-yellow-400 hover:bg-yellow-500 text-gray-900">
              Login
            </Link>
            <Link href="/register" className="btn border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900">
              Register
            </Link>
          </>
        )}

        {/* GOOGLE USER */}
        {session && (
          <div className="relative">
            <img
              src={session.user.image || "/default-user.png"}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2">
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

        {/* LOCAL BACKEND USER */}
        {localUser && !session && (
          <div className="relative">
            <img
              src={localUser.photoUrl || "/default-user.png"}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2">
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
  );
}
