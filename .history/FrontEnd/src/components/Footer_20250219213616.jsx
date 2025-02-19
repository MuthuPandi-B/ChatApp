import React from "react";
import { Link } from "react-router-dom";
const isLoggedIn=localStorage.getItem('token');
const Footer = ({  userName }) => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center flex justify-center items-center">
      {isLoggedIn ? (
        <p>
          Hello {userName}! &bull; 
          <Link to={"./register"} className="hover:underline ml-2">Logout</Link>
        </p>
      ) : (
        <p>
          Welcome to ChatApp! &bull; 
          <a href="/terms" className="hover:underline ml-2">TC</a> &bull; 
          <a href="/contact" className="hover:underline ml-2">Contact</a>
        </p>
      )}
    </footer>
  );
};

export default Footer;
