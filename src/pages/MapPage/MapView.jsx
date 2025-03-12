import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import * as Sentry from '@sentry/browser';
import { FaMapMarkedAlt, FaUtensils, FaWalking } from 'react-icons/fa';

// Map container style
const containerStyle = {
  width: '100%',
  height: '500px'
};

// Default center (will be updated based on geocoding)
const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

const MapView = ({ destination, locations, selectedLocationIndex, onSelectLocation }) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [locationCoordinates, setLocationCoordinates] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });
  
  // Geocode the destination to center the map
  const geocodeDestination = useCallback(async () => {
    if (!isLoaded || !destination) return;
    
    try {
      // First, geocode the main destination
      const geocoder = new window.google.maps.Geocoder();
      const result = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: destination }, (results, status) => {
          if (status === 'OK') {
            resolve(results[0].geometry.location);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
      
      const center = { lat: result.lat(), lng: result.lng() };
      setMapCenter(center);
      
      // Then geocode each location
      if (locations?.length) {
        const coordinates = await Promise.all(
          locations.map(async (location) => {
            try {
              const locationSearch = `${location.name}, ${location.location}, ${destination}`;
              const locResult = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: locationSearch }, (results, status) => {
                  if (status === 'OK') {
                    resolve(results[0].geometry.location);
                  } else {
                    // If specific location fails, try with just the neighborhood
                    geocoder.geocode({ address: `${location.location}, ${destination}` }, (results2, status2) => {
                      if (status2 === 'OK') {
                        resolve(results2[0].geometry.location);
                      } else {
                        // If that fails too, use the destination center but add a small random offset
                        const lat = center.lat + (Math.random() - 0.5) * 0.01;
                        const lng = center.lng + (Math.random() - 0.5) * 0.01;
                        resolve(new window.google.maps.LatLng(lat, lng));
                      }
                    });
                  }
                });
              });
              
              return {
                ...location,
                position: { lat: locResult.lat(), lng: locResult.lng() }
              };
            } catch (err) {
              console.error('Error geocoding location:', err);
              // Return location with center coordinates if geocoding fails
              return {
                ...location,
                position: { 
                  lat: center.lat + (Math.random() - 0.5) * 0.01, 
                  lng: center.lng + (Math.random() - 0.5) * 0.01 
                }
              };
            }
          })
        );
        
        setLocationCoordinates(coordinates);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Geocoding error:', error);
      Sentry.captureException(error);
      setError('Failed to load map coordinates. Please try again later.');
      setIsLoading(false);
    }
  }, [isLoaded, destination, locations]);
  
  // Update map when destination or locations change
  useEffect(() => {
    if (isLoaded && destination) {
      setIsLoading(true);
      geocodeDestination();
    }
  }, [isLoaded, destination, locations, geocodeDestination]);
  
  // Update active marker when selectedLocationIndex changes
  useEffect(() => {
    if (selectedLocationIndex !== null && locationCoordinates[selectedLocationIndex]) {
      setActiveMarker(selectedLocationIndex);
    } else {
      setActiveMarker(null);
    }
  }, [selectedLocationIndex, locationCoordinates]);
  
  // Show loading spinner while data is loading
  if (!isLoaded || isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center h-[500px]">
        <div className="flex flex-col items-center">
          <FaMapMarkedAlt className="h-12 w-12 text-blue-500 mb-4" />
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700">Loading map...</p>
        </div>
      </div>
    );
  }
  
  // Show error message if loading failed
  if (loadError || error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center h-[500px]">
        <div className="text-center">
          <FaMapMarkedAlt className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Map Error</h3>
          <p className="text-gray-600">{error || 'Failed to load Google Maps. Please check your internet connection and try again.'}</p>
        </div>
      </div>
    );
  }
  
  // Get marker icon based on location type
  const getMarkerIcon = (location) => {
    if (location.displayType === 'meal') {
      return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: '#F59E0B',
        fillOpacity: 1,
        scale: 8,
        strokeColor: '#FFFFFF',
        strokeWeight: 2,
      };
    }
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: '#3B82F6',
      fillOpacity: 1,
      scale: 8,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
    };
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
        options={{
          fullscreenControl: true,
          streetViewControl: true,
          mapTypeControl: true,
          zoomControl: true,
        }}
      >
        {/* Add markers for each location */}
        {locationCoordinates.map((location, index) => (
          <Marker
            key={index}
            position={location.position}
            icon={getMarkerIcon(location)}
            label={{
              text: (index + 1).toString(),
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            onClick={() => {
              setActiveMarker(index);
              onSelectLocation(index);
            }}
            animation={window.google.maps.Animation.DROP}
          />
        ))}
        
        {/* Show info window for active marker */}
        {activeMarker !== null && locationCoordinates[activeMarker] && (
          <InfoWindow
            position={locationCoordinates[activeMarker].position}
            onCloseClick={() => {
              setActiveMarker(null);
              onSelectLocation(null);
            }}
          >
            <div className="max-w-xs">
              <div className="flex items-center mb-2">
                {locationCoordinates[activeMarker].displayType === 'meal' ? (
                  <FaUtensils className="h-4 w-4 text-amber-500 mr-2" />
                ) : (
                  <FaWalking className="h-4 w-4 text-blue-500 mr-2" />
                )}
                <h3 className="font-medium text-gray-900">{locationCoordinates[activeMarker].name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">{locationCoordinates[activeMarker].description}</p>
              <p className="text-xs text-gray-500">Location: {locationCoordinates[activeMarker].location}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;