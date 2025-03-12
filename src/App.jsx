import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ItineraryProvider } from '@/context/ItineraryContext';

// Pages
import HomePage from '@/pages/HomePage';
import ItineraryPage from '@/pages/ItineraryPage';
import MapPage from '@/pages/MapPage';
import HotelsPage from '@/pages/HotelsPage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function App() {
  return (
    <ItineraryProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ItineraryProvider>
  );
}