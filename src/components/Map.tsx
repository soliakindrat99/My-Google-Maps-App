import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, Polyline } from '@react-google-maps/api';
import { Box } from '@mui/material';

interface IMapProps {
  setClickedCoordOnMap: (arg: { lat: number; lng: number } | null) => void;
  clickedCoordInList: { lat: number; lng: number } | null;
  pathCoordsFromList: ({ lat: number; lng: number } | null)[];
}

const Map = (props: IMapProps) => {
  const {
    setClickedCoordOnMap = () => {},
    clickedCoordInList = { lat: 0, lng: 0 },
    pathCoordsFromList = [],
  } = props;
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

  const getDistanceBetweenCoordinates = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    //Haversine formula a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    //c = 2 ⋅ atan2( √a, √(1−a) )
    //d = R ⋅ c
    //φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
    //note that angles need to be in radians to pass to trig functions!

    const earthRadiusKm = 6371; // Radius of the Earth in kilometers

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceKm = earthRadiusKm * c;
    const distanceMeters = distanceKm * 1000;
    return distanceMeters;
  };

  useEffect(() => {
    if (pathCoordsFromList.length === 2 && pathCoordsFromList[0] && pathCoordsFromList[1]) {
      const distance = getDistanceBetweenCoordinates(
        pathCoordsFromList[0]?.lat,
        pathCoordsFromList[0]?.lng,
        pathCoordsFromList[1]?.lat,
        pathCoordsFromList[1]?.lng
      );
      console.log(
        'Start Coordinate - lat: ' +
          pathCoordsFromList[0].lat +
          ', lng: ' +
          pathCoordsFromList[0].lng +
          '; End Coordinate - lat: ' +
          pathCoordsFromList[1].lat +
          ', lng: ' +
          pathCoordsFromList[1].lng
      );
      console.log('distance = ' + distance);
    }
  }, [pathCoordsFromList]);

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
      {pathCoordsFromList.length === 2 && pathCoordsFromList[0] && pathCoordsFromList[1] && (
        <Polyline
          path={[pathCoordsFromList[0], pathCoordsFromList[1]]}
          options={{
            strokeColor: '#6991fd',
            strokeOpacity: 1,
            strokeWeight: 3,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
