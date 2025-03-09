import React, { useState } from 'react';
import { FiMenu, FiHome, FiHeart, FiTrash } from 'react-icons/fi'; // Import icons
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex">
        <div
          className={`fixed left-0 h-full transition-transform duration-300 z-10 flex flex-col ${
            isOpen ? 'translate-x-0 bg-gray-200' : '-translate-x-45'
          }`}
          style={{ width: '250px' }}
        >
          <div className="flex items-start justify-end">
            <button onClick={toggleSidebar} className="p-2 m-4">
              <FiMenu className="relative cursor-pointer" size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 items-start mx-4">
            {isOpen && (
              <>
                <Link
                  to="/"
                  className="group flex items-center space-x-2 text-base p-2 rounded-lg w-full hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  <FiHome size={20} className="group-hover:text-gray-700 group-active:text-gray-900" />
                  <span className="group-hover:text-gray-700 group-active:text-gray-900">Home</span>
                </Link>
                <Link
                  to="/favourites"
                  className="group flex items-center space-x-2 text-base p-2 rounded-lg w-full hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  <FiHeart size={20} className="group-hover:text-gray-700 group-active:text-gray-900" />
                  <span className="group-hover:text-gray-700 group-active:text-gray-900">Favourites</span>
                </Link>
                <Link
                  to="/trash"
                  className="group flex items-center space-x-2 text-base p-2 rounded-lg w-full hover:bg-gray-300 active:bg-gray-400 transition-colors"
                >
                  <FiTrash size={20} className="group-hover:text-gray-700 group-active:text-gray-900" />
                  <span className="group-hover:text-gray-700 group-active:text-gray-900">Trash</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}