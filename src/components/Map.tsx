import { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';

interface IMapProps {
  setClickedCoordOnMap: (srg: { lat: number; lng: number } | null) => void;
  clickedCoordInList: { lat: number; lng: number } | null;
}

const Map = (props: IMapProps) => {
  const { setClickedCoordOnMap = () => {}, clickedCoordInList = { lat: 0, lng: 0 } } = props;
  const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY || '';

  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
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
      setClickedCoordOnMap({ lat: lat, lng: lng });
    }
  };

  if (loadError) return <Box>Error loading maps</Box>;
  if (!isLoaded) return <Box>Loading...</Box>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={clickedCoords && clickedCoordInList ? clickedCoordInList : center}
      zoom={18}
      onClick={handleMapClick}
      mapTypeId="satellite"
      tilt={0}
    >
      {clickedCoords && (
        <Marker
          position={{ lat: clickedCoords.lat, lng: clickedCoords.lng }}
          title={clickedCoords.lat + ', ' + clickedCoords.lng}
          options={{ icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }}
          visible={!clickedCoordInList || (clickedCoords ? true : false)}
        />
      )}
      {clickedCoordInList && (
        <Marker
          position={{ lat: clickedCoordInList.lat, lng: clickedCoordInList.lng }}
          title={clickedCoordInList.lat + ', ' + clickedCoordInList.lng}
          options={{ icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
