import React from "react";
const is
const Footer = ({ isLoggedIn, userName }) => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center flex justify-center items-center">
      {isLoggedIn ? (
        <p>
          Hello {userName}! &bull; 
          <a href="/terms" className="hover:underline ml-2">TC</a> &bull; 
          <a href="/contact" className="hover:underline ml-2">Contact</a>
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
