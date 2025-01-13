import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext"; // Import useUser hook

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser(); // Get the user from the context
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProfileClick = () => {
    navigate("/profile"); // Redirect to the profile page
  };

  // Function to scroll to the Services section
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <Link to="/">ADTRIP</Link>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 font-semibold">
            <Link to="/" className="hover:text-orange-400 transition">
              Home
            </Link>
            <a href="#" className="hover:text-orange-400 transition">
              About
            </a>
            <button
              onClick={scrollToServices}
              className="hover:text-orange-400 transition"
            >
              Services
            </button>
            <Link to="/map" className="hover:text-orange-400 transition">
              Map
            </Link>
            <a href="#" className="hover:text-orange-400 transition">
              Contact
            </a>

            {/* User Profile Icon (Desktop) */}
            {user && (
              <button
                onClick={handleProfileClick}
                className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-full hover:bg-orange-600 transition ml-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            )}
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
        <div className="md:hidden bg-slate-800 space-y-1 border rounded-lg border-orange-500 px-4 py-3 text-sm">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            Home
          </Link>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            About
          </a>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              scrollToServices();
            }}
            className="block hover:text-orange-400 transition"
          >
            Services
          </button>
          <Link
            to="/map"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            Map
          </Link>
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="block hover:text-orange-400 transition"
          >
            Contact
          </a>
          {user && (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleProfileClick();
              }}
              className="block hover:text-orange-400 transition"
            >
              Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;