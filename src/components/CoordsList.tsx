import { useState } from 'react';
import { getPriorityColor } from '../helpers/unils';
import CoordsFilter from './CoordsFilter';
import Coordinates from './Coordinates';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import './CoordsList.css';

interface coordsListProps {
  coords: Coordinates[],
  deleteCoord: (arg: number) => void,
  parentCallbackSelectedCoord: (arg: { lat: number, lng: number}  | null) => void,
}

const CoordsList = (props: coordsListProps) => {
  const { coords = [], deleteCoord = () => {}, parentCallbackSelectedCoord = () => {} } = props;
  const [filteredPriority, setFilteredPriority] = useState('All');

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

  const onSelectCoord = (coord: { lat: number; lng: number }) => {
    parentCallbackSelectedCoord(coord);
  };

  return (
    <Box className="coordsBox">
      <CoordsFilter selected={filteredPriority} onChangeFilter={filterChangeHandler} />
      <List className="coordsList">
        {filteredCoords &&
          filteredCoords.map(
            (
              coord: {
                id: number;
                priority: string;
                title: string;
                coord: { lat: number; lng: number };
              }
            ) => {
              return (
                <ListItem className="coordItem" key={coord.id}>
                  <ListItemText
                    className="priorityCol"
                    sx={getPriorityColor(coord.priority)}
                    onClick={() => onSelectCoord(coord.coord)}
                  >
                    {coord.priority}
                  </ListItemText>
                  <ListItemText className="titleCol" onClick={() => onSelectCoord(coord.coord)}>
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
