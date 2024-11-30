import React from 'react';
import { Link } from 'react-router';


const Navbar = () => {
  return (
    <nav className="border-b border-slate-300">
      <div className="max-w-screen-xl px-4 py-2 mx-auto">
        <div className="flex items-center justify-center">
          <ul className="flex flex-row mt-0 space-x-8 rtl:space-x-reverse">
            <li className="flex items-center space-x-2">
              <Link to="/" className="text-gray-500 dark:text-white hover:underline" aria-current="page">
                Home
              </Link>
            </li>
              <span className="text-gray-300 hidden sm:inline">|</span>
            <li className="flex items-center space-x-2">
              <Link to="/for-you" className="text-gray-500 dark:text-white hover:underline">
                For You
              </Link>
            </li>
              <span className="text-gray-300 hidden sm:inline">|</span>
            <li className="flex items-center space-x-2">
              <Link to="/category" className="text-gray-500 dark:text-white hover:underline">
                Topic
              </Link>
            </li>
              <span className="text-gray-300 hidden sm:inline">|</span>
            <li>
              <Link to="/source" className="text-gray-500 dark:text-white hover:underline">
                Source
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
