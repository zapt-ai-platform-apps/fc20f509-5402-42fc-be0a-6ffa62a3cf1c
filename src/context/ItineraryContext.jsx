import React, { createContext, useContext, useState } from 'react';
import * as Sentry from '@sentry/browser';

// Create the context
const ItineraryContext = createContext();

// Create a provider component
export function ItineraryProvider({ children }) {
  const [tripParams, setTripParams] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    budget: 'mid-range',
    interests: [],
    travelers: 1
  });
  
  const [itinerary, setItinerary] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [isLoadingItinerary, setIsLoadingItinerary] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [error, setError] = useState(null);

  // Update trip parameters
  const updateTripParams = (newParams) => {
    setTripParams(prev => ({ ...prev, ...newParams }));
  };

  // Generate itinerary with OpenAI
  const generateItinerary = async () => {
    // Validate inputs
    if (!tripParams.destination || !tripParams.startDate || !tripParams.endDate) {
      setError("Please fill out the destination and dates");
      return;
    }
    
    // Reset states
    setError(null);
    setIsLoadingItinerary(true);
    
    try {
      console.log('Generating itinerary with params:', tripParams);
      
      const response = await fetch('/api/generateItinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: tripParams.destination,
          startDate: tripParams.startDate,
          endDate: tripParams.endDate,
          budget: tripParams.budget,
          interests: tripParams.interests,
          travelers: tripParams.travelers
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary');
      }
      
      const data = await response.json();
      console.log('Itinerary generated successfully:', data);
      setItinerary(data);
      
      // Automatically fetch hotels after generating itinerary
      fetchHotels();
    } catch (error) {
      console.error('Error generating itinerary:', error);
      Sentry.captureException(error);
      setError(error.message);
    } finally {
      setIsLoadingItinerary(false);
    }
  };

  // Fetch hotels from Booking.com API
  const fetchHotels = async () => {
    if (!tripParams.destination || !tripParams.startDate || !tripParams.endDate) {
      return;
    }
    
    setIsLoadingHotels(true);
    
    try {
      console.log('Fetching hotels for:', tripParams.destination);
      
      const response = await fetch('/api/getHotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: tripParams.destination,
          checkIn: tripParams.startDate,
          checkOut: tripParams.endDate,
          budget: tripParams.budget
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch hotels');
      }
      
      const data = await response.json();
      console.log('Hotels fetched successfully:', data);
      setHotels(data.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      Sentry.captureException(error);
      // We don't set the main error state here to avoid overriding any itinerary error
    } finally {
      setIsLoadingHotels(false);
    }
  };

  // Create the context value
  const contextValue = {
    tripParams,
    updateTripParams,
    itinerary,
    hotels,
    generateItinerary,
    fetchHotels,
    isLoadingItinerary,
    isLoadingHotels,
    error,
    setError
  };

  // Return the provider
  return (
    <ItineraryContext.Provider value={contextValue}>
      {children}
    </ItineraryContext.Provider>
  );
}

// Create a custom hook for using the context
export function useItinerary() {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
}