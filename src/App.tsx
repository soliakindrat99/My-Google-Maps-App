import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Libraries } from '@react-google-maps/api';
import { Box } from '@mui/material';

import './App.css';

const libraries: Libraries = ['places' /*, 'geometry', 'drawing'*/];

const App: React.FC = () => {
  const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY || '';
  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapContainerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 49.84023,
    lng: 24.02225,
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat !== undefined && lng !== undefined) {
      setClickedCoords({ lat, lng });
    }
  };

  if (loadError) return <Box>Error loading maps</Box>;
  if (!isLoaded) return <Box>Loading...</Box>;

  return (
    <Box style={{ width: '100%', height: '100vh' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={clickedCoords || center}
        zoom={18}
        onClick={handleMapClick}
        mapTypeId="satellite"
        tilt={0}
      >
        {clickedCoords && (
          <Marker
            position={{ lat: clickedCoords.lat, lng: clickedCoords.lng }}
            title={clickedCoords.lat + ', ' + clickedCoords.lng}
          />
        )}
      </GoogleMap>
    </Box>
  );
};

export default App;
