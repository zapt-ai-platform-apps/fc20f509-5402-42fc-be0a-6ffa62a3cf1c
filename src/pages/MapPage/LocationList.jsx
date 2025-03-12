import React from 'react';
import { FaUtensils, FaWalking } from 'react-icons/fa';

const LocationList = ({ locations, selectedIndex, onSelectLocation }) => {
  if (!locations || locations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600">No locations available for this day.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-medium text-gray-900">Day Locations ({locations.length})</h3>
      </div>
      
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {locations.map((location, index) => (
          <div 
            key={index}
            className={`p-4 cursor-pointer transition-colors ${
              selectedIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectLocation(index)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-gray-200 text-sm font-medium text-gray-700">
                {index + 1}
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  {location.displayType === 'meal' ? (
                    <FaUtensils className="h-3.5 w-3.5 text-amber-500 mr-1.5" />
                  ) : (
                    <FaWalking className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                  )}
                  <h4 className="text-sm font-medium text-gray-900">
                    {location.name}
                  </h4>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {location.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;