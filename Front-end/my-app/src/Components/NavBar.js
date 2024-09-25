import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaPlusCircle, FaTasks, FaBars } from "react-icons/fa";
import { MdOutlineTaskAlt } from "react-icons/md";
import Logo from "../Images/logo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-green-900 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} alt="Logo" className="h-10 w-10 mr-4" />
          <h1 className="text-xl font-bold text-green-900">
            WAQF PROPERTY MANAGEMENT
          </h1>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-900 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-8 md:items-center`}
        >
          <Link
            to="/"
            className="block hover:text-gray-600 text-lg font-semibold transition-colors flex items-center mt-4 md:mt-0"
          >
            <FaHome className="mr-2" /> HOME
          </Link>
          <Link
            to="/add-property"
            className="block hover:text-gray-600 text-lg font-semibold transition-colors flex items-center mt-4 md:mt-0"
          >
            <FaPlusCircle className="mr-2" /> ADD PROPERTY
          </Link>
          <Link
            to="/add-task"
            className="block hover:text-gray-600 text-lg font-semibold transition-colors flex items-center mt-4 md:mt-0"
          >
            <MdOutlineTaskAlt className="mr-2" /> ADD TASK
          </Link>
          <Link
            to="/task-list"
            className="block hover:text-gray-600 text-lg font-semibold transition-colors flex items-center mt-4 md:mt-0"
          >
            <FaTasks className="mr-2" /> TASK LIST
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
