import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

const NoItinerary = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <FaExclamationCircle className="mx-auto h-16 w-16 text-yellow-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900">No Itinerary Found</h2>
        <p className="mt-2 text-lg text-gray-600">
          You haven't generated an itinerary yet. Please go back to the home page to create one.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary">
            Create New Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoItinerary;