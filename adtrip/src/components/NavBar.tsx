import React, { useState } from "react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 text-white max-w-screen-xl fixed w-full z-20  top-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <a href="#">ADTRIP</a>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-6 font-semibold ">
            <a href="#" className="hover:text-orange-400">
              Home
            </a>
            <a href="#" className="hover:text-orange-400">
              About
            </a>
            <a href="#" className="hover:text-orange-400">
              Services
            </a>
            <a href="#" className="hover:text-orange-400">
              Contact
            </a>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none hover:text-slate-400"
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
        <div className="md:hidden bg-slate-700 space-y-1 px-4 py-3">
          <a href="#" className="block hover:text-slate-400">
            Home
          </a>
          <a href="#" className="block hover:text-slate-400">
            About
          </a>
          <a href="#" className="block hover:text-slate-400">
            Services
          </a>
          <a href="#" className="block hover:text-slate-400">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
