import { captureError } from './_apiUtils.js';

// This would normally call the Booking.com API, but we'll use mock data for now
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { destination, checkIn, checkOut, budget } = req.body;
    
    if (!destination || !checkIn || !checkOut) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log('Getting hotels for:', { destination, checkIn, checkOut, budget });

    // Budget multipliers to generate different price ranges
    const budgetMultiplier = {
      'budget': 1,
      'mid-range': 2,
      'luxury': 3.5
    };
    
    const multiplier = budgetMultiplier[budget] || 1.5;
    
    // Mock hotel data - in a real app, this would come from Booking.com API
    const hotels = generateMockHotels(destination, multiplier);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return res.status(200).json({ hotels });
  } catch (error) {
    console.error('Error getting hotels:', error);
    captureError(error, { 
      api: 'getHotels', 
      requestData: req.body 
    });
    return res.status(500).json({ error: 'Failed to get hotels', details: error.message });
  }
}

function generateMockHotels(destination, priceMultiplier) {
  // Different hotel names based on destination
  const hotelsByDestination = {
    'Paris': [
      { name: 'Grand Hôtel du Palais Royal', rating: 4.8, stars: 5, location: 'Le Marais' },
      { name: 'Hôtel Le Relais Montmartre', rating: 4.5, stars: 4, location: 'Montmartre' },
      { name: 'Citadines Tour Eiffel Paris', rating: 4.2, stars: 3, location: 'Eiffel Tower' },
      { name: 'Hôtel Atmosphères', rating: 4.6, stars: 4, location: 'Latin Quarter' },
      { name: 'ibis Paris Bastille Opéra', rating: 4.0, stars: 3, location: 'Bastille' },
    ],
    'Tokyo': [
      { name: 'Park Hyatt Tokyo', rating: 4.9, stars: 5, location: 'Shinjuku' },
      { name: 'Hotel Ryumeikan Ochanomizu Honten', rating: 4.7, stars: 4, location: 'Tokyo Station' },
      { name: 'Mitsui Garden Hotel Ginza Premier', rating: 4.5, stars: 4, location: 'Ginza' },
      { name: 'Shibuya Stream Excel Hotel Tokyu', rating: 4.4, stars: 4, location: 'Shibuya' },
      { name: 'Richmond Hotel Premier Asakusa International', rating: 4.3, stars: 3, location: 'Asakusa' },
    ],
    'New York': [
      { name: 'The Langham, New York, Fifth Avenue', rating: 4.8, stars: 5, location: 'Midtown' },
      { name: 'Arlo SoHo', rating: 4.4, stars: 4, location: 'SoHo' },
      { name: 'The William Vale', rating: 4.7, stars: 5, location: 'Williamsburg' },
      { name: 'citizenM New York Bowery', rating: 4.5, stars: 4, location: 'Lower East Side' },
      { name: 'MOXY NYC Times Square', rating: 4.2, stars: 3, location: 'Times Square' },
    ]
  };
  
  // Default hotel names if destination not found
  const defaultHotels = [
    { name: 'Grand Central Hotel', rating: 4.7, stars: 5, location: 'City Center' },
    { name: 'Harbor View Inn', rating: 4.4, stars: 4, location: 'Waterfront' },
    { name: 'Urban Boutique Hotel', rating: 4.2, stars: 3, location: 'Downtown' },
    { name: 'Park Plaza Resort', rating: 4.6, stars: 4, location: 'Park District' },
    { name: 'Sunset Beach Hotel', rating: 4.3, stars: 3, location: 'Coastal Area' },
  ];
  
  // Select hotels based on destination or use default
  const baseHotels = hotelsByDestination[destination] || defaultHotels;
  
  // Generate random images
  return baseHotels.map(hotel => {
    // Calculate price based on stars and multiplier
    const basePrice = hotel.stars * 40;
    const price = Math.round(basePrice * priceMultiplier);
    
    return {
      ...hotel,
      id: Math.random().toString(36).substring(2, 10),
      price,
      currency: 'USD',
      image: `https://source.unsplash.com/random/300x200/?hotel,${hotel.name.replace(/\s/g, '')}`,
      bookingUrl: `https://www.booking.com/hotel/search.html?ss=${encodeURIComponent(destination)}&affiliate_id=${process.env.VITE_BOOKING_AFFILIATE_ID || 'demo'}`
    };
  });
}