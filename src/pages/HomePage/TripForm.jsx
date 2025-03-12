import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar, FaMapMarkerAlt, FaUser, FaMoneyBillWave, FaHiking } from 'react-icons/fa';
import { useItinerary } from '@/context/ItineraryContext';

// Travel interest options
const interestOptions = [
  { id: 'culture', label: 'Culture & History' },
  { id: 'food', label: 'Food & Dining' },
  { id: 'nature', label: 'Nature & Outdoors' },
  { id: 'adventure', label: 'Adventure & Activities' },
  { id: 'shopping', label: 'Shopping' },
  { id: 'relaxation', label: 'Relaxation & Wellness' },
  { id: 'family', label: 'Family-Friendly' },
  { id: 'nightlife', label: 'Nightlife' }
];

// Budget options
const budgetOptions = [
  { value: 'budget', label: 'Budget' },
  { value: 'mid-range', label: 'Mid-Range' },
  { value: 'luxury', label: 'Luxury' }
];

const TripForm = () => {
  const navigate = useNavigate();
  const { 
    tripParams, 
    updateTripParams, 
    generateItinerary, 
    isLoadingItinerary,
    error,
    setError
  } = useItinerary();
  
  // Handle destination input
  const handleDestinationChange = (e) => {
    updateTripParams({ destination: e.target.value });
  };
  
  // Handle date changes
  const handleStartDateChange = (date) => {
    updateTripParams({ startDate: date });
    
    // If end date is before start date, update end date
    if (tripParams.endDate && date > tripParams.endDate) {
      updateTripParams({ endDate: date });
    }
  };
  
  const handleEndDateChange = (date) => {
    updateTripParams({ endDate: date });
  };
  
  // Handle travelers change
  const handleTravelersChange = (e) => {
    updateTripParams({ travelers: parseInt(e.target.value) || 1 });
  };
  
  // Handle budget selection
  const handleBudgetChange = (e) => {
    updateTripParams({ budget: e.target.value });
  };
  
  // Handle interest selection
  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    const currentInterests = [...tripParams.interests];
    
    if (checked) {
      // Add interest if checked
      updateTripParams({ interests: [...currentInterests, value] });
    } else {
      // Remove interest if unchecked
      updateTripParams({ 
        interests: currentInterests.filter(interest => interest !== value) 
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!tripParams.destination) {
      setError('Please enter a destination');
      return;
    }
    
    if (!tripParams.startDate || !tripParams.endDate) {
      setError('Please select your travel dates');
      return;
    }
    
    if (tripParams.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    
    // Generate itinerary
    await generateItinerary();
    
    // If successful, navigate to itinerary page
    if (!error) {
      navigate('/itinerary');
    }
  };

  return (
    <div id="trip-form" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Plan Your Perfect Trip</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Destination */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Where would you like to go?
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Enter a city, country, or region"
                value={tripParams.destination}
                onChange={handleDestinationChange}
                required
              />
            </div>
          </div>
          
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendar className="text-gray-400" />
              </div>
              <DatePicker
                selected={tripParams.startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={tripParams.startDate}
                endDate={tripParams.endDate}
                minDate={new Date()}
                placeholderText="Select start date"
                className="input-field pl-10"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendar className="text-gray-400" />
              </div>
              <DatePicker
                selected={tripParams.endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={tripParams.startDate}
                endDate={tripParams.endDate}
                minDate={tripParams.startDate || new Date()}
                placeholderText="Select end date"
                className="input-field pl-10"
                required
              />
            </div>
          </div>
          
          {/* Travelers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Travelers
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="number"
                min="1"
                max="20"
                className="input-field pl-10"
                value={tripParams.travelers}
                onChange={handleTravelersChange}
                required
              />
            </div>
          </div>
          
          {/* Budget */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Level
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMoneyBillWave className="text-gray-400" />
              </div>
              <select
                className="input-field pl-10 appearance-none"
                value={tripParams.budget}
                onChange={handleBudgetChange}
                required
              >
                {budgetOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Interests */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <FaHiking className="inline-block mr-2" />
              What are you interested in? (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map(interest => (
                <div key={interest.id} className="flex items-center">
                  <input
                    id={`interest-${interest.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    value={interest.id}
                    checked={tripParams.interests.includes(interest.id)}
                    onChange={handleInterestChange}
                  />
                  <label htmlFor={`interest-${interest.id}`} className="ml-2 text-sm text-gray-700">
                    {interest.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="btn btn-primary text-lg px-8 py-3 w-full md:w-auto"
            disabled={isLoadingItinerary}
          >
            {isLoadingItinerary ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Your Itinerary...
              </div>
            ) : (
              "Generate My Itinerary"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;