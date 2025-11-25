import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12">

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-yellow-400 transition">Branding</a></li>
            <li><a className="hover:text-yellow-400 transition">Design</a></li>
            <li><a className="hover:text-yellow-400 transition">Marketing</a></li>
            <li><a className="hover:text-yellow-400 transition">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-yellow-400 transition">About us</a></li>
            <li><a className="hover:text-yellow-400 transition">Contact</a></li>
            <li><a className="hover:text-yellow-400 transition">Jobs</a></li>
            <li><a className="hover:text-yellow-400 transition">Press kit</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-yellow-400 transition">Terms of use</a></li>
            <li><a className="hover:text-yellow-400 transition">Privacy policy</a></li>
            <li><a className="hover:text-yellow-400 transition">Cookie policy</a></li>
          </ul>
        </div>
      </div>

      {/* Social Icons + Copyright */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a className="hover:text-yellow-400 transition"><FaFacebook /></a>
          <a className="hover:text-yellow-400 transition"><FaInstagram /></a>
          <a className="hover:text-yellow-400 transition"><FaTwitter /></a>
          <a className="hover:text-yellow-400 transition"><FaYoutube /></a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Gadget Store — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

