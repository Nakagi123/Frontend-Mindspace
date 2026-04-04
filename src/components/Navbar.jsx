import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-gray-900">
            mindspace.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-lg font-semibold">
            <Link to="/" className="text-gray-700 hover:text-sky-500 transition-colors duration-200 py-2">
              Home
            </Link>
            <Link to="/learn" className="text-gray-700 hover:text-sky-500 transition-colors duration-200 py-2">
              Learn
            </Link>
            <Link to="/plan" className="text-gray-700 hover:text-sky-500 transition-colors duration-200 py-2">
              Plan
            </Link>
            <Link to="/notes" className="text-gray-700 hover:text-sky-500 transition-colors duration-200 py-2">
              Notes
            </Link>
            <Link to="/timer" className="text-gray-700 hover:text-sky-500 transition-colors duration-200 py-2">
              Focus
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              // Logged in — show username + logout
              <>
                <span className="text-sm text-gray-500">Hi, {user.name} 👋</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300
                             rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              // Logged out — show Login + Register
              <>
                <button
                  onClick={() => login({ name: "Elian" })} // 👈 replace with real login later
                  className="px-4 py-2 text-sm font-semibold text-gray-700
                             hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => login({ name: "Elian" })} // 👈 replace with real login later
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-900
                             rounded-full hover:bg-gray-700 active:scale-95 transition-all duration-200"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col space-y-3 py-4 border-t border-gray-200">
            <Link to="/" className="text-gray-700 hover:text-sky-500 font-semibold transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/learn" className="text-gray-700 hover:text-sky-500 font-semibold transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Learn
            </Link>
            <Link to="/plan" className="text-gray-700 hover:text-sky-500 font-semibold transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>
              Plan
            </Link>

            {/* Mobile auth buttons */}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              {user ? (
                <button onClick={logout} className="text-sm font-semibold text-red-500">
                  Logout
                </button>
              ) : (
                <>
                  <button onClick={() => login({ name: "Elian" })} className="text-sm font-semibold text-gray-700">
                    Login
                  </button>
                  <button onClick={() => login({ name: "Elian" })} className="text-sm font-semibold text-sky-500">
                    Register
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;