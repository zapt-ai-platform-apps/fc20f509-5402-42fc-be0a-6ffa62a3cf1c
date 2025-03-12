import React, { useState } from 'react';
import { FaMapMarkerAlt, FaUtensils, FaWalking, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DayCard = ({ day, dayNumber }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'food':
        return <FaUtensils className="text-orange-500" />;
      case 'attraction':
        return <FaWalking className="text-green-500" />;
      default:
        return <FaClock className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div 
        className="bg-blue-600 px-6 py-4 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            Day {dayNumber}: {formatDate(day.date)}
          </h3>
          <div className="text-white">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-6">
          <div className="space-y-6">
            {day.activities && day.activities.map((activity, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{activity.name}</h4>
                    <p className="mt-1 text-gray-600">{activity.description}</p>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {day.meals && day.meals.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Meal Suggestions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {day.meals.map((meal, index) => (
                    <div key={index} className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <FaUtensils className="h-5 w-5 text-amber-600 mr-2" />
                        <h5 className="text-amber-800 font-medium capitalize">{meal.type}</h5>
                      </div>
                      <p className="mt-2 text-gray-700">{meal.suggestion}</p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                        <span>{meal.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;