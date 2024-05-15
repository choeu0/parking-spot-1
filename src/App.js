import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { useMediaQuery } from 'react-responsive';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './components/HomePage';
import ParkingSpot from './components/ParkingSpot';
import CarRegistration from './components/CarRegistration';

const queryClient = new QueryClient();

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/parkingspot" element={<ParkingSpot isMobile={isMobile} />} />
            <Route path="/carregistration" element={<CarRegistration />} />
          </Routes>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
