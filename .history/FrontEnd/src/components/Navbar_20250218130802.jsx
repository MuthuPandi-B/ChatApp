import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({}) => {
  const [userName, setUserName] = useState(""); // State to hold the username
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem('token'); // Check if user is logged in

  // Fetch user data from localStorage when the component is mounted
  useEffect(() => {
    if (token) {
      const storedUserName = localStorage.getItem('username');
      if (storedUserName) {
        setUserName(storedUserName); // Set username from localStorage
      }
    }
  }, [token]); // Re-run the effect when `token` changes

  const firstLetter = userName.charAt(0).toUpperCase(); // Get first letter of the username

  const toggleMenu = () => {
    setIsMobileMenuOpen(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 5000); // Hide mobile menu after 5 seconds
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUserName(""); // Reset userName in state after logout
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left: User Icon and Navigation Links */}
      <div className="flex items-center space-x-4">
        {/* User Icon */}
        <div className="bg-white text-blue-600 rounded-full h-10 w-10 flex items-center justify-center font-bold">
          {token ? firstLetter : <span className="text-gray-400">?</span>}
        </div>

        {/* Welcome User (Only visible on Desktop) */}
        <div className="hidden md:block text-white font-semibold">
          {token && userName && `Welcome, ${userName}`}
        </div>
      </div>

      {/* Right: Hamburger Button and Navigation Links */}
      <div className="flex items-center">
        {/* Hamburger Button (Only on Mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
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
      </div>

      {/* Mobile Menu (Only when hamburger is clicked) */}
      <div className={`flex items-center space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:space-x-6`}>
        {token ? (
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
