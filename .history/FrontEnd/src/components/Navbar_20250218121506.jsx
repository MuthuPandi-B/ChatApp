import React from "react";
import { useContext } from "react";

import { Link } from "react-router-dom";

const Navbar = ({  }) => {
    const user = localStorage.getItem('use')
    // console.log(user);
    const userName = user ? user.name : "";
    const isLoggedIn = localStorage.getItem('token');
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";
const hadleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
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
            <Link to="/chat" className="hover:underline">Chat</Link>
       
           <Link to ="group-chat" className="hover:underline">Group Chat</Link>
           <button 
           onClick={hadleLogout}>
              Logout
           </button>
          </>
        ) : (
          <a href="/login" className="hover:underline">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
