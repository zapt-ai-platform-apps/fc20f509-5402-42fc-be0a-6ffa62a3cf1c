import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useItinerary } from '@/context/ItineraryContext';
import ItineraryHeader from './ItineraryHeader';
import DayCard from './DayCard';
import NoItinerary from './NoItinerary';

const ItineraryPage = () => {
  const navigate = useNavigate();
  const { itinerary, isLoadingItinerary } = useItinerary();
  
  // If no itinerary data and not loading, show message
  if (!itinerary && !isLoadingItinerary) {
    return <NoItinerary />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isLoadingItinerary ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-gray-700">Generating your itinerary...</p>
          <p className="mt-2 text-gray-500">This may take a minute as our AI crafts your perfect trip</p>
        </div>
      ) : itinerary ? (
        <>
          <ItineraryHeader itinerary={itinerary} />
          
          <div className="mt-8 space-y-8">
            {itinerary.days.map((day, index) => (
              <DayCard key={index} day={day} dayNumber={index + 1} />
            ))}
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => navigate('/map')}
              className="btn btn-primary"
            >
              View on Map
            </button>
            <button 
              onClick={() => navigate('/hotels')}
              className="btn btn-secondary"
            >
              Browse Hotels
            </button>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-secondary"
            >
              Plan Another Trip
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ItineraryPage;