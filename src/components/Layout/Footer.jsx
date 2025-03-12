import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=32&height=32" 
              alt="Travel Planner AI Logo" 
              className="h-8 w-auto" 
            />
            <span className="ml-2 text-gray-900 font-medium">Travel Planner AI</span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Travel Planner AI. All rights reserved.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;