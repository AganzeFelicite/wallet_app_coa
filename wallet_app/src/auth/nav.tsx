import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Code of Africa - e-wallet</h1>
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="text-white hover:text-blue-400 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
