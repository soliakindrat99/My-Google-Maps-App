import { useState } from 'react';
import { Box } from '@mui/material';
import FormCoordinates from '../FormCoordinates/FormCoordinates';
import CoordsList from '../CoordsList/CoordsList';
import './Coordinates.css';

interface ICoordinatesProps {
  clickedCoordOnMap: { lat: number; lng: number } | null;
  setClickedCoordInList: (arg: { lat: number; lng: number } | null) => void;
  setPathCoordsFromList: (arg: google.maps.LatLngLiteral[]) => void;
}

interface ICoordinates {
  id: number;
  priority: string;
  title: string;
  coord: { lat: number; lng: number };
}

const Coordinates = (props: ICoordinatesProps) => {
  const {
    clickedCoordOnMap = { lat: 0, lng: 0 },
    setClickedCoordInList = () => {},
    setPathCoordsFromList = () => {},
  } = props;

  const [coords, setCoords] = useState<ICoordinates[]>([
    { id: 1, priority: 'High', title: 'Coord 1', coord: { lat: 49.84045, lng: 24.02287 } },
    { id: 2, priority: 'Medium', title: 'Coord 2', coord: { lat: 49.84023, lng: 24.02225 } },
    { id: 3, priority: 'Medium', title: 'Coord 3', coord: { lat: 49.83964, lng: 24.023902 } },
    { id: 4, priority: 'Medium', title: 'Coord 4', coord: { lat: 49.84114, lng: 24.024159 } },
  ]);

  const [newPriority, setNewPriority] = useState('Low');
  const [newTitle, setNewTitle] = useState('');

  const submitCoord = () => {
    if (newTitle && clickedCoordOnMap) {
      const num = coords.length + 1;
      const newEntry: ICoordinates = {
        id: num,
        priority: newPriority,
        title: newTitle,
        coord: clickedCoordOnMap,
      };
      setCoords([...coords, newEntry]);
      setNewTitle('');
    }
  };

  const deleteCoord = (id: number) => {
    const newCoords = coords.filter(
      (coord: ICoordinates | null) => coord !== null && coord.id !== id
    );
    setCoords(newCoords);
  };

  return (
    <Box className="coordsContainer">
      <FormCoordinates
        isClickedCoord={clickedCoordOnMap ? true : false}
        newPriority={newPriority}
        setNewPriority={setNewPriority}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        submitCoord={submitCoord}
      />
      <CoordsList
        coords={coords}
        deleteCoord={deleteCoord}
        setClickedCoordInList={setClickedCoordInList}
        setPathCoordsFromList={setPathCoordsFromList}
      />
    </Box>
  );
};

export default Coordinates;
