import React, { useState } from 'react';
import { useItinerary } from '@/context/ItineraryContext';
import MapView from './MapView';
import LocationList from './LocationList';
import NoItinerary from '../ItineraryPage/NoItinerary';

const MapPage = () => {
  const { itinerary, isLoadingItinerary } = useItinerary();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);
  
  // If no itinerary data and not loading, show message
  if (!itinerary && !isLoadingItinerary) {
    return <NoItinerary />;
  }
  
  // If loading, show loading spinner
  if (isLoadingItinerary) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-medium text-gray-700">Loading your itinerary...</p>
      </div>
    );
  }
  
  // Extract all activities from the selected day
  const activitiesAndMeals = [];
  
  // Add activities if available
  if (itinerary?.days[selectedDayIndex]?.activities) {
    itinerary.days[selectedDayIndex].activities.forEach(activity => {
      activitiesAndMeals.push({
        ...activity,
        displayType: 'activity'
      });
    });
  }
  
  // Add meals if available
  if (itinerary?.days[selectedDayIndex]?.meals) {
    itinerary.days[selectedDayIndex].meals.forEach(meal => {
      activitiesAndMeals.push({
        name: meal.suggestion,
        description: `${meal.type.charAt(0).toUpperCase() + meal.type.slice(1)} suggestion`,
        location: meal.location,
        displayType: 'meal',
        type: meal.type
      });
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Interactive Trip Map
      </h1>
      
      {/* Day selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Day
        </label>
        <select
          className="input-field"
          value={selectedDayIndex}
          onChange={(e) => {
            setSelectedDayIndex(parseInt(e.target.value));
            setSelectedLocationIndex(null);
          }}
        >
          {itinerary.days.map((day, index) => (
            <option key={index} value={index}>
              Day {index + 1}: {day.date}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location list */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <LocationList 
            locations={activitiesAndMeals}
            selectedIndex={selectedLocationIndex}
            onSelectLocation={setSelectedLocationIndex}
          />
        </div>
        
        {/* Map */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <MapView 
            destination={itinerary.destination}
            locations={activitiesAndMeals}
            selectedLocationIndex={selectedLocationIndex}
            onSelectLocation={setSelectedLocationIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;