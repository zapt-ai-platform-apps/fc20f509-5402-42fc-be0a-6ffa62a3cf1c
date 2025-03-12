import OpenAI from 'openai';
import { captureError } from './_apiUtils.js';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { destination, startDate, endDate, budget, interests, travelers } = req.body;
    
    if (!destination || !startDate || !endDate || !budget || !interests) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log('Generating itinerary for:', {
      destination,
      startDate,
      endDate,
      budget,
      interests,
      travelers
    });

    const openai = new OpenAI({
      apiKey: process.env.VITE_OPENAI_API_KEY,
    });

    // Calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    // Create prompt for OpenAI
    const prompt = `
    You are a travel assistant. The user is going to ${destination} from ${startDate} to ${endDate}, 
    with a budget of ${budget}, focusing on ${interests.join(', ')}. 
    There are ${travelers} traveler(s).
    
    Generate a daily itinerary with brief activity descriptions for each day. 
    For each day, include:
    - 3-4 activities or attractions
    - A meal suggestion for lunch and dinner
    - An approximate location/neighborhood for each activity
    
    Format the response as a JSON object with this structure:
    {
      "destination": "${destination}",
      "days": [
        {
          "day": 1,
          "date": "YYYY-MM-DD",
          "activities": [
            {
              "name": "Activity name",
              "description": "Brief 1-2 sentence description",
              "location": "Neighborhood or area",
              "type": "attraction/food/shopping/etc"
            }
          ],
          "meals": [
            {
              "type": "lunch/dinner",
              "suggestion": "Restaurant or food type",
              "location": "Neighborhood or area"
            }
          ]
        }
      ]
    }
    
    IMPORTANT:
    1. Return valid JSON only, with no additional text or explanations
    2. Include real, specific places and attractions that actually exist
    3. Make sure each activity has a specific location/neighborhood
    4. Be sure to match activities to the specified interests
    5. Keep the budget level (${budget}) in mind for all suggestions
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a travel planning assistant that creates detailed itineraries." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    console.log('OpenAI response received');
    
    // Parse the JSON response
    const itineraryText = response.choices[0].message.content.trim();
    const itineraryData = JSON.parse(itineraryText);

    return res.status(200).json(itineraryData);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    captureError(error, { 
      api: 'generateItinerary', 
      requestData: req.body 
    });
    return res.status(500).json({ error: 'Failed to generate itinerary', details: error.message });
  }
}