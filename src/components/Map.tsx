import { useState } from 'react';
import { GoogleMap, Marker, useLoadScript, Polyline } from '@react-google-maps/api';
import { Box } from '@mui/material';
import getDistanceBetweenTwoPoins from '../MathCalculations/getDistanceBetweenTwoPoins';

interface IMapProps {
  setClickedCoordOnMap: (arg: { lat: number; lng: number } | null) => void;
  clickedCoordInList: { lat: number; lng: number } | null;
  pathCoordsFromList: google.maps.LatLngLiteral[];
}

const Map = (props: IMapProps) => {
  const {
    setClickedCoordOnMap = () => {},
    clickedCoordInList = { lat: 0, lng: 0 },
    pathCoordsFromList = [],
  } = props;
  const apiKey = import.meta.env.GOOGLE_MAPS_API_KEY || '';
  const mapId = import.meta.env.VITE_GOOGLE_MAP_ID || '';

  const [clickedCoords, setClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    mapIds: [mapId], 
    version: 'beta'
  });

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

  const splitCoordinatesIntoSegments = (coords: google.maps.LatLngLiteral[]) => {
    const segments: google.maps.LatLngLiteral[][] = [];
    let prevCoord: google.maps.LatLngLiteral | null = null;

    coords.forEach((coord) => {
      if (prevCoord) {
        segments.push([prevCoord, coord]);
      }
      prevCoord = coord;
    });

    return segments;
  };

  if (loadError) return <Box>Error loading maps</Box>;
  if (!isLoaded) return <Box>Loading...</Box>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100vh' }}
      center={clickedCoords && clickedCoordInList ? clickedCoordInList : center}
      zoom={18}
      options={{
        mapTypeId: 'satellite',
        heading: 90,
        tilt: 0,
        mapId: mapId
      }}
      onClick={handleMapClick}
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
      {pathCoordsFromList && pathCoordsFromList.length > 1 && (
        <>
          <Polyline
            path={pathCoordsFromList}
            options={{
              strokeColor: '#6991fd',
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
          {splitCoordinatesIntoSegments(pathCoordsFromList).map((segment, index) => (
            <Marker
              key={index}
              position={{
                lat: (segment[0].lat + segment[1].lat) / 2,
                lng: (segment[0].lng + segment[1].lng) / 2,
              }}
              title={
                'Distance between (' +
                segment[0].lat +
                ', ' +
                segment[0].lng +
                ') and (' +
                segment[1].lat +
                ', ' +
                segment[1].lng +
                ')'
              }
              label={{
                text: `Distance: ${getDistanceBetweenTwoPoins(
                  segment[0].lat,
                  segment[0].lng,
                  segment[1].lat,
                  segment[1].lng
                ).toFixed(2)} m`,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            />
          ))}
        </>
      )}
    </GoogleMap>
  );
};

export default Map;
