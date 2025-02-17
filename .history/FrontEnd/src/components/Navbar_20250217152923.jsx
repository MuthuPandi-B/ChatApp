import React from "react";


const Navbar = ({  }) => {
    const isLoggedIn = localStorage.getItem('token');
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Left: User Icon */}
      <div className="flex items-center">
        <div className="bg-white text-blue-600 rounded-full h-10 w-10 flex items-center justify-center font-bold">
          {isLoggedIn ? firstLetter : <span className="text-gray-400">?</span>}
        </div>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <a href="/chats" className="hover:underline">Chats</a>
            <a href="/group-chats" className="hover:underline">Group Chat</a>
            <a href="/logout" className="hover:underline">Logout</a>
          </>
        ) : (
          <a href="/login" className="hover:underline">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
