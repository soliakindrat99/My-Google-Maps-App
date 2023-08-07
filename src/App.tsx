import React, { useState } from 'react';
import { Box } from '@mui/material';
import Coordinates from './components/Coordinates/Coordinates';
import Map from './components/Map';

import './App.css';

const App: React.FC = () => {
  const [clickedCoordOnMap, setClickedCoordOnMap] = useState<{ lat: number; lng: number } | null>(null);
  const [clickedCoordInList, setClickedCoordInList] = useState<{ lat: number; lng: number } | null>(null);

  const handleClickedCoordOnMap = (coord: { lat: number; lng: number } | null) => {
    setClickedCoordOnMap(coord);
  };
  const handleClickedCoordInList = (coord: { lat: number; lng: number } | null) => {
    setClickedCoordInList(coord);
  };

  return (
    <Box className="mapContainer">
      <Coordinates
        clickedCoordOnMap={clickedCoordOnMap}
        setClickedCoordInList={handleClickedCoordInList}
      />
      <Map setClickedCoordOnMap={handleClickedCoordOnMap} clickedCoordInList={clickedCoordInList} />
    </Box>
  );
};

export default App;
