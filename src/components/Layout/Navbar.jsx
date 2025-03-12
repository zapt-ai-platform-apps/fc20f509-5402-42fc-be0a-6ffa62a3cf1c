import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPlane, FaMapMarkedAlt, FaHotel, FaHome } from 'react-icons/fa';
import { useItinerary } from '@/context/ItineraryContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { itinerary } = useItinerary();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const navItems = [
    { path: '/', name: 'Home', icon: <FaHome className="mr-2" /> },
    { path: '/itinerary', name: 'Itinerary', icon: <FaPlane className="mr-2" />, disabled: !itinerary },
    { path: '/map', name: 'Map', icon: <FaMapMarkedAlt className="mr-2" />, disabled: !itinerary },
    { path: '/hotels', name: 'Hotels', icon: <FaHotel className="mr-2" />, disabled: !itinerary }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
                alt="Travel Planner AI Logo" 
                className="h-8 w-auto" 
              />
              <span className="ml-2 text-lg font-semibold text-gray-900">Travel Planner AI</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:ml-6 space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.disabled ? '#' : item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  }
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.disabled ? '#' : item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                  } else {
                    closeMenu();
                  }
                }}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;