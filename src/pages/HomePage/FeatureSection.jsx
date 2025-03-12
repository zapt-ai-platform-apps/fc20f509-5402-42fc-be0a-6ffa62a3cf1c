import React from 'react';
import { FaRoute, FaHotel, FaMapMarkedAlt, FaRobot } from 'react-icons/fa';

const features = [
  {
    icon: <FaRobot className="h-10 w-10 text-blue-500" />,
    title: 'AI-Powered Itineraries',
    description: 'Our advanced AI creates personalized day-by-day travel plans based on your interests, budget, and schedule.'
  },
  {
    icon: <FaRoute className="h-10 w-10 text-blue-500" />,
    title: 'Detailed Daily Plans',
    description: 'Get activity suggestions, restaurant recommendations, and sightseeing opportunities organized into a convenient daily schedule.'
  },
  {
    icon: <FaMapMarkedAlt className="h-10 w-10 text-blue-500" />,
    title: 'Interactive Maps',
    description: 'Visualize your journey with interactive maps showing all recommended destinations and attractions.'
  },
  {
    icon: <FaHotel className="h-10 w-10 text-blue-500" />,
    title: 'Hotel Recommendations',
    description: 'Find the perfect place to stay with curated hotel suggestions that match your budget and location preferences.'
  }
];

const FeatureSection = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Plan your perfect trip in minutes, not hours
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="flex items-start">
              <div className="shrink-0">
                {feature.icon}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold text-gray-900">Ready to plan your next adventure?</h3>
        <p className="mt-4 text-lg text-gray-600">
          Fill out the form above to get started with your personalized travel plan.
        </p>
      </div>
    </div>
  );
};

export default FeatureSection;