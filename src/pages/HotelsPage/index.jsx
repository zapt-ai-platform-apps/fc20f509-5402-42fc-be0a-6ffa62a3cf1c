import React, { useState, useEffect } from 'react';
import { useItinerary } from '@/context/ItineraryContext';
import HotelCard from './HotelCard';
import HotelFilters from './HotelFilters';
import NoItinerary from '../ItineraryPage/NoItinerary';

const HotelsPage = () => {
  const { tripParams, hotels, isLoadingHotels, fetchHotels } = useItinerary();
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    stars: []
  });
  
  // Fetch hotels if not already loaded
  useEffect(() => {
    if (hotels.length === 0 && !isLoadingHotels) {
      fetchHotels();
    }
  }, [hotels.length, isLoadingHotels, fetchHotels]);
  
  // Apply filters whenever hotels or filters change
  useEffect(() => {
    if (hotels.length > 0) {
      const filtered = hotels.filter(hotel => {
        // Price filter
        const isInPriceRange = hotel.price >= filters.priceRange[0] && 
                              hotel.price <= filters.priceRange[1];
        
        // Rating filter
        const meetsRatingRequirement = hotel.rating >= filters.rating;
        
        // Stars filter (if none selected, show all)
        const meetsStarsRequirement = filters.stars.length === 0 || 
                                     filters.stars.includes(hotel.stars);
        
        return isInPriceRange && meetsRatingRequirement && meetsStarsRequirement;
      });
      
      setFilteredHotels(filtered);
    }
  }, [hotels, filters]);
  
  // If no itinerary data and not loading, show message
  if (!tripParams.destination) {
    return <NoItinerary />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Hotels in {tripParams.destination}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <HotelFilters 
            hotels={hotels}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        
        {/* Hotel list */}
        <div className="lg:col-span-3">
          {isLoadingHotels ? (
            <div className="bg-white rounded-xl shadow-md p-12 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-700">Searching for hotels...</p>
              </div>
            </div>
          ) : filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">No hotels match your current filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;