import React, { useState } from 'react';
import { Box } from '@mui/material';
import Coordinates from './components/Coordinates';
import Map from './components/Map';

import './App.css';

const App: React.FC = () => {
  const [clickedCoord, setClickedCoord] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCoord, setSelctedCoord] = useState<{ lat: number; lng: number } | null>(null);

  const handleCallbackClickedCoord = (coord: { lat: number; lng: number } | null) => {
    setClickedCoord(coord);
  };
  const handleCallbackSelectedCoord = (coord: { lat: number; lng: number } | null) => {
    setSelctedCoord(coord);
  };

  return (
    <Box className="mapContainer">
      <Coordinates
        clickedCoord={clickedCoord}
        parentCallbackSelectedCoord={handleCallbackSelectedCoord}
      />
      <Map parentCallbackClickedCoord={handleCallbackClickedCoord} selectedCoord={selectedCoord} />
    </Box>
  );
};

export default App;
