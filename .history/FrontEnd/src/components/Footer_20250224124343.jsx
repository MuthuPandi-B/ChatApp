import React from "react";
import { Link } from "react-router-dom";
const isLoggedIn=localStorage.getItem('token');
const Footer = ({  userName }) => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center flex justify-center items-center">
      {isLoggedIn ? (
        <p>
          Hello {userName} ! 
          <div className="flex">
          <Link to={"./terms"} className="hover:underline ml-2 ">Terms & Conditions &bull;</Link>
          <Link to={"./contact"} className="hover:underline ml-2 ">Contact Us !</Link>
          </div>
        </p>
      ) : (
        <p>
          Welcome to ChatApp! &bull; 
          <Link to={"./terms"} className="hover:underline ml-2 ">Terms & Conditions &bull;</Link>
          <Link to={"./contact"} className="hover:underline ml-2 ">Contact Us !</Link>
        </p>
      )}
    </footer>
  );
};

export default Footer;
