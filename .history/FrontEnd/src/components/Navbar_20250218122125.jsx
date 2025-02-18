import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem('username');
  const token = localStorage.getItem('token');
  const userName = user ? JSON.parse(user).name : ""; // Assuming 'username' is a stringified object
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
  const isLoggedIn = token;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  useEffect(() => {
    // Close mobile menu on window resize (if on desktop)
    if (window.innerWidth >= 768) {
      setIsMobileMenuOpen(false);
    }
  }, [window.innerWidth]);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left: User Icon and Name */}
      <div className="flex items-center space-x-4">
        <div className="bg-white text-blue-600 rounded-full h-10 w-10 flex items-center justify-center font-bold">
          {isLoggedIn ? firstLetter : <span className="text-gray-400">?</span>}
        </div>
        <div className="hidden md:block text-white font-semibold">
          {isLoggedIn && userName && `Welcome, ${userName}`}
        </div>
      </div>

      {/* Right: Hamburger for mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Right: Navigation Links */}
      <div className={`flex-1 flex justify-end ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        {isLoggedIn ? (
          <>
            <Link to="/chat" className="hover:underline px-4 py-2">Chat</Link>
            <Link to="/group-chat" className="hover:underline px-4 py-2">Group Chat</Link>
            <button
              onClick={handleLogout}
              className="hover:underline px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline px-4 py-2">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
