import { useState } from 'react';
import { Box } from '@mui/material';
import FormCoordinates from './FormCoordinates';
import CoordsList from './CoordsList';
import './Coordinates.css';

const Coordinates = (props: any) => {
  const { clickedCoord = {} } = props;

  const [coords, setCoords] = useState<
    { id: number; priority: string; title: string; coord: { lat: number; lng: number } }[]
  >([
    { id: 1, priority: 'High', title: 'Coord 1', coord: { lat: 49.84045, lng: 24.02287 } },
    { id: 2, priority: 'Medium', title: 'Coord 2', coord: { lat: 49.84023, lng: 24.02225 } },
  ]);

  const [newPriority, setNewPriority] = useState('Low');
  const [newTitle, setNewTitle] = useState('');

  const submitCoord = () => {
    if (newTitle && clickedCoord) {
      let num = coords.length + 1;
      let newEntry = {
        id: num,
        priority: newPriority,
        title: newTitle,
        coord: clickedCoord,
      };
      setCoords([...coords, newEntry]);
      setNewTitle('');
    }
  };

  const deleteCoord = (id: number) => {
    let newCoords = coords.filter(
      (
        coord: {
          id: number;
          priority: string;
          title: string;
          coord: { lat: number; lng: number };
        } | null
      ) => coord !== null && coord.id !== id
    );
    setCoords(newCoords);
  };

  return (
    <Box className="coordsContainer">
      <FormCoordinates
        isClickedCoord={clickedCoord ? true : false}
        newPriority={newPriority}
        setNewPriority={setNewPriority}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        submitCoord={submitCoord}
      />
      <CoordsList coords={coords} deleteCoord={deleteCoord} />
    </Box>
  );
};

export default Coordinates;
