import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 transition-colors duration-300 shadow-lg ${
        isScrolled ? "bg-black text-white" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-lg sm:text-2xl font-bold">
            <a href="#">ADTRIP</a>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-6 font-semibold">
            <Link  to={`/`}>
            <p  className="hover:text-orange-400 transition">
              Home
            </p>
            </Link>
            <a href="#" className="hover:text-orange-400 transition">
              About
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Services
            </a>
            <a href="#" className="hover:text-orange-400 transition">
              Contact
            </a>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`focus:outline-none transition ${
                isMenuOpen ? "text-red-600" : "text-white"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-orange-400 space-y-1 border rounded-lg border-orange-500 px-4 py-3 text-sm">
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            About
          </a>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            Services
          </a>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
