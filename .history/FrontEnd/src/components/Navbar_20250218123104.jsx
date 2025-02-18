import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem('username'); // Get the username (as a string)
  const token = localStorage.getItem('token');
  const userName = user || ""; // If user exists, use it; otherwise, default to empty string
  const firstLetter = userName.charAt(0).toUpperCase(); // Get the first letter of the username
  const isLoggedIn = token;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left: User Icon and Navigation Links */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Button */}
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

        {/* User Icon and Welcome Message */}
        <div className="bg-white text-blue-600 rounded-full h-10 w-10 flex items-center justify-center font-bold">
          {isLoggedIn ? firstLetter : <span className="text-gray-400">?</span>}
        </div>

        {/* Welcome User (Only visible on Desktop) */}
        <div className="hidden md:block text-white font-semibold">
          {isLoggedIn && userName && `Welcome, ${userName}`}
        </div>
      </div>

      {/* Right: Navigation Links */}
      <div className={`flex items-center space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6`}>
        {isLoggedIn ? (
          <>
            <Link to="/chat" className="hover:underline">Chat</Link>
            <Link to="/group-chat" className="hover:underline">Group Chat</Link>
            <button
              onClick={handleLogout}
              className="hover:underline bg-red-500 text-white rounded-md px-4 py-2"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
