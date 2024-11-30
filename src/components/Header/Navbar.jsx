import React from 'react';
// import { Link, useLocation } from 'react-dom'; // Update the import for react-router-dom
import { Link, useLocation } from 'react-router-dom';
const Navbar = () => {
  const location = useLocation();

  const getLinkClasses = (path) =>
    `text-gray-500 dark:text-white border-b-2  hover:border-blue-500 ${
      location.pathname === path ? 'border-b-2 border-blue-500' : ''
    }`;

  return (
    <nav className="border-b border-slate-300">
      <div className="max-w-screen-xl px-4 py-2 mx-auto">
        <div className="flex items-center justify-center">
          <ul className="flex flex-row mt-0 space-x-8 rtl:space-x-reverse">
            <li className="flex items-center space-x-2">
              <Link to="/" className={getLinkClasses('/')} aria-current="page">
                Home
              </Link>
            </li>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <li className="flex items-center space-x-2">
              <Link to="/for-you" className={getLinkClasses('/for-you')}>
                For You
              </Link>
            </li>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <li className="flex items-center space-x-2">
              <Link to="/category" className={getLinkClasses('/category')}>
                Topic
              </Link>
            </li>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <li className="flex items-center space-x-2">
              <Link to="/source" className={getLinkClasses('/source')}>
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
