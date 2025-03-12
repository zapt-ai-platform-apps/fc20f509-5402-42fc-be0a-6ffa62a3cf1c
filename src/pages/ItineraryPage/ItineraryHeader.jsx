import React from 'react';
import { format } from 'date-fns';
import { useItinerary } from '@/context/ItineraryContext';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const ItineraryHeader = ({ itinerary }) => {
  const { tripParams } = useItinerary();
  
  // Format dates if available
  const formatDateString = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const startDate = tripParams.startDate ? formatDateString(tripParams.startDate) : 'Not specified';
  const endDate = tripParams.endDate ? formatDateString(tripParams.endDate) : 'Not specified';
  
  // Format budget
  const formatBudget = (budget) => {
    switch(budget) {
      case 'budget': return 'Budget';
      case 'mid-range': return 'Mid-Range';
      case 'luxury': return 'Luxury';
      default: return budget;
    }
  };

  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        Your {itinerary.destination} Itinerary
      </h1>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-start">
          <FaMapMarkerAlt className="text-blue-500 h-5 w-5 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Destination</h3>
            <p className="text-lg font-semibold text-gray-900">{itinerary.destination}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-start">
          <FaCalendarAlt className="text-blue-500 h-5 w-5 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Dates</h3>
            <p className="text-lg font-semibold text-gray-900">{startDate} - {endDate}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-start">
          <FaUser className="text-blue-500 h-5 w-5 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Travelers</h3>
            <p className="text-lg font-semibold text-gray-900">{tripParams.travelers}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 flex items-start">
          <FaMoneyBillWave className="text-blue-500 h-5 w-5 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-gray-500">Budget</h3>
            <p className="text-lg font-semibold text-gray-900">{formatBudget(tripParams.budget)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <p className="text-blue-700">
          Your perfect {itinerary.days.length}-day itinerary is ready! Explore daily activities, 
          check out locations on the map, or browse hotel options.
        </p>
      </div>
    </div>
  );
};

export default ItineraryHeader;