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
              <img src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw0fHxzdHVubmluZyUyMHRyYXZlbCUyMGxhbmRzY2FwZSUyMHdpdGglMjBtb3VudGFpbnMlMjBhbmQlMjBzZWElMjBhdCUyMHN1bnNldCUyQyUyMGhpZ2glMjBxdWFsaXR5JTIwdHJhdmVsJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzQxNzcwNDc5fDA&ixlib=rb-4.0.3&q=80&w=1080" 
                src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=40&height=40" 
                alt="Travel Planner AI Logo" 
                className="h-8 w-auto" 
              />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your Journey, Unlocked
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          AI-powered travel planning that creates personalized itineraries,
          hotel recommendations, and interactive maps for your next adventure.
        </p>
        <div className="mt-10">
          <Link
            to="trip-form"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;