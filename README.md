# Travel Planner AI

"Your Journey, Unlocked" - AI-powered travel planning platform that generates personalized itineraries, hotel recommendations, and interactive maps for your next adventure.

## Features

- AI Itinerary Generation (day-by-day plans)
- Booking.com Affiliate Integration (hotel booking links)
- Google Maps API (pins for each recommended location)
- Responsive Design (web + mobile)

## Tech Stack

- React with Vite
- Tailwind CSS
- Google Maps API
- OpenAI API
- Vercel for deployment

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables
4. Run the development server with `npm run dev`

## Environment Variables

The app requires the following environment variables to be set:

- `VITE_PUBLIC_APP_ID`
- `VITE_PUBLIC_APP_ENV`
- `VITE_PUBLIC_SENTRY_DSN`
- `VITE_PUBLIC_UMAMI_WEBSITE_ID`
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_OPENAI_API_KEY`
- `VITE_BOOKING_AFFILIATE_ID`

## Build and Deployment

```
npm run build
```

The build output will be in the `dist` folder, ready to be deployed.

## License

Copyright (c) 2023