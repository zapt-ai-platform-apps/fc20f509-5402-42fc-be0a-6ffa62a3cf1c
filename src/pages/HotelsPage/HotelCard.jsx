import React from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  // Generate star rating display
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <FaStar key={i} className="text-yellow-400 h-4 w-4" />
    ));
  };
  
  // Format currency
  const formatPrice = (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Hotel image */}
      <div className="relative h-48 w-full">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="absolute h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Hotel info */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{hotel.name}</h3>
          <div className="flex items-center ml-2">
            <span className="text-gray-700 font-medium mr-1">{hotel.rating}</span>
            <span className="text-yellow-400">★</span>
          </div>
        </div>
        
        <div className="mt-1 flex items-center">
          <div className="flex">{renderStars(hotel.stars)}</div>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <FaMapMarkerAlt className="h-3.5 w-3.5 mr-1 text-gray-400" />
          <span>{hotel.location}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">per night</p>
            <p className="text-xl font-bold text-gray-900">{formatPrice(hotel.price, hotel.currency)}</p>
          </div>
          
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;