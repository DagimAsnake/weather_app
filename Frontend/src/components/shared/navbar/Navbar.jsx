import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-7 py-3 flex justify-between items-center">
        <a href="/" className="text-white text-4xl font-bold">
         Logo
        </a>
        <ul className="flex space-x-6">
          <li>
            <a
              href="#"
              className="text-white text-sm font-medium hover:text-blue-300 transition"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white text-sm font-medium hover:text-blue-300 transition"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white text-sm font-medium hover:text-blue-300 transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
