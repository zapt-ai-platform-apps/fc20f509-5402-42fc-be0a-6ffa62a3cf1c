import React, { useState, useEffect } from 'react';
import { FaFilter, FaStar, FaCheck } from 'react-icons/fa';

const HotelFilters = ({ hotels, filters, setFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  // Initialize price range based on available hotels
  useEffect(() => {
    if (hotels.length > 0) {
      const prices = hotels.map(hotel => hotel.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMaxPrice(max);
      setPriceRange([min, max]);
      setFilters(prev => ({
        ...prev,
        priceRange: [min, max]
      }));
    }
  }, [hotels, setFilters]);
  
  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'min-price') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };
  
  // Apply price filter when user stops sliding
  const handlePriceChangeEnd = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: priceRange
    }));
  };
  
  // Handle rating filter
  const handleRatingChange = (value) => {
    setFilters(prev => ({
      ...prev,
      rating: value
    }));
  };
  
  // Handle star filter
  const handleStarFilterChange = (stars) => {
    setFilters(prev => {
      const currentStars = [...prev.stars];
      
      if (currentStars.includes(stars)) {
        return {
          ...prev,
          stars: currentStars.filter(s => s !== stars)
        };
      } else {
        return {
          ...prev,
          stars: [...currentStars, stars]
        };
      }
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    if (hotels.length > 0) {
      const prices = hotels.map(hotel => hotel.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange([min, max]);
      setFilters({
        priceRange: [min, max],
        rating: 0,
        stars: []
      });
    }
  };
  
  // Format price with currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
      <div className="bg-blue-600 p-4">
        <div className="flex items-center text-white">
          <FaFilter className="mr-2" />
          <h3 className="font-medium">Filter Hotels</h3>
        </div>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="min-price" className="text-xs text-gray-500">Min</label>
              <input
                type="range"
                id="min-price"
                min={0}
                max={maxPrice}
                value={priceRange[0]}
                onChange={handlePriceChange}
                onMouseUp={handlePriceChangeEnd}
                onTouchEnd={handlePriceChangeEnd}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="text-xs text-gray-500">Max</label>
              <input
                type="range"
                id="max-price"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={handlePriceChange}
                onMouseUp={handlePriceChangeEnd}
                onTouchEnd={handlePriceChangeEnd}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Rating Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Guest Rating</h4>
          <div className="space-y-2">
            {[0, 3, 3.5, 4, 4.5].map((rating) => (
              <div 
                key={rating} 
                className="flex items-center"
              >
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700">
                  {rating === 0 ? (
                    'Any Rating'
                  ) : (
                    <div className="flex items-center">
                      <span>{rating}+</span>
                      <FaStar className="text-yellow-400 ml-1 h-3 w-3" />
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Star Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Hotel Stars</h4>
          <div className="space-y-2">
            {[3, 4, 5].map((stars) => (
              <div 
                key={stars} 
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  id={`star-${stars}`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={filters.stars.includes(stars)}
                  onChange={() => handleStarFilterChange(stars)}
                />
                <label htmlFor={`star-${stars}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  <span className="mr-1">{stars}-Star</span>
                  <div className="flex">
                    {Array.from({ length: stars }, (_, i) => (
                      <FaStar key={i} className="text-yellow-400 h-3 w-3" />
                    ))}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};

export default HotelFilters;