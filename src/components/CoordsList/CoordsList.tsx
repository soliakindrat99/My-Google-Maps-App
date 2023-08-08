import { useState } from 'react';
import { getPriorityColor } from '../../helpers/utils';
import CoordsFilter from '../CoordsFilter/CoordsFilter';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import './CoordsList.css';

interface ICoordsListProps {
  coords: { id: number; priority: string; title: string; coord: { lat: number; lng: number } }[];
  deleteCoord: (arg: number) => void;
  setClickedCoordInList: (arg: { lat: number; lng: number } | null) => void;
  setPathCoordsFromList: (arg: ({ lat: number; lng: number } | null)[]) => void;
}

const CoordsList = (props: ICoordsListProps) => {
  const {
    coords = [],
    deleteCoord = () => {},
    setClickedCoordInList = () => {},
    setPathCoordsFromList = () => {},
  } = props;
  const [filteredPriority, setFilteredPriority] = useState('All');
  const [pathCoordinates, setPathCoordinates] = useState<({ lat: number; lng: number })[]>(
    []
  );

  const filterChangeHandler = (selectedPriority: string) => {
    setFilteredPriority(selectedPriority);
  };

  const filteredCoords = coords.filter(
    (coord: {
      id: number;
      priority: string;
      title: string;
      coord: { lat: number; lng: number };
    }) => {
      if (filteredPriority !== 'All') return coord.priority === filteredPriority;
      else return true;
    }
  );

  const onClickCoordInList = (coord: { lat: number; lng: number }) => {
    setClickedCoordInList(coord);
    setPathCoordinates([...pathCoordinates, coord]);
    if (pathCoordinates.length >= 1) {
      setPathCoordsFromList([pathCoordinates[pathCoordinates.length - 1], coord]);
    }
  };

  return (
    <Box className="coordsBox">
      <CoordsFilter selected={filteredPriority} onChangeFilter={filterChangeHandler} />
      <List className="coordsList">
        {filteredCoords &&
          filteredCoords.map(
            (coord: {
              id: number;
              priority: string;
              title: string;
              coord: { lat: number; lng: number };
            }) => {
              return (
                <ListItem className="coordItem" key={coord.id}>
                  <ListItemText
                    className="priorityCol"
                    sx={getPriorityColor(coord.priority)}
                    onClick={() => onClickCoordInList(coord.coord)}
                  >
                    {coord.priority}
                  </ListItemText>
                  <ListItemText
                    className="titleCol"
                    onClick={() => onClickCoordInList(coord.coord)}
                  >
                    {coord.title}
                  </ListItemText>
                  <IconButton title="Delete" onClick={() => deleteCoord(coord.id)}>
                    <DeleteOutlinedIcon className="onlinedIcon" />
                  </IconButton>
                </ListItem>
              );
            }
          )}
      </List>
    </Box>
  );
};

export default CoordsList;
