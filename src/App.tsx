import React, { useState } from 'react';
import { Box } from '@mui/material';
import Coordinates from './components/Coordinates/Coordinates';
import Map from './components/Map';

import './App.css';

const App: React.FC = () => {
  const [clickedCoordOnMap, setClickedCoordOnMap] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [clickedCoordInList, setClickedCoordInList] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [pathCoordsFromList, setPathCoordsFromList] = useState<google.maps.LatLngLiteral[]>([]);

  const handleClickedCoordOnMap = (coord: { lat: number; lng: number } | null) => {
    setClickedCoordOnMap(coord);
  };
  const handleClickedCoordInList = (coord: { lat: number; lng: number } | null) => {
    setClickedCoordInList(coord);
  };
  const handlePathCoordsFromList = (path: google.maps.LatLngLiteral[]) => {
    setPathCoordsFromList(path);
  };

  return (
    <Box className="mapContainer">
      <Coordinates
        clickedCoordOnMap={clickedCoordOnMap}
        setClickedCoordInList={handleClickedCoordInList}
        setPathCoordsFromList={handlePathCoordsFromList}
      />
      <Map
        setClickedCoordOnMap={handleClickedCoordOnMap}
        clickedCoordInList={clickedCoordInList}
        pathCoordsFromList={pathCoordsFromList}
      />
    </Box>
  );
};

export default App;
