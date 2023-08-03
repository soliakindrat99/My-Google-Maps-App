import { useState } from 'react';
import { getPriorityColor } from '../helpers/unils';
import CoordsFilter from './CoordsFilter';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import './CoordsList.css';

const CoordsList = (props: any) => {
  const { coords = [], deleteCoord = () => {} } = props;
  const [filteredPriority, setFilteredPriority] = useState('All');

  const filterChangeHandler = (selectedPriority: string) => {
    setFilteredPriority(selectedPriority);
  };

  const filteredCoords = coords.filter((coord: any) => {
    if (filteredPriority !== 'All') return coord.priority === filteredPriority;
    else return true;
  });

  return (
    <Box className="coordsBox">
      <CoordsFilter selected={filteredPriority} onChangeFilter={filterChangeHandler} />
      <List className="coordsList">
        {filteredCoords &&
          filteredCoords.map((coord: any) => {
            return (
              <ListItem className="coordItem" key={coord.id}>
                <ListItemText className="priorityCol" sx={getPriorityColor(coord.priority)}>
                  {coord.priority}
                </ListItemText>
                <ListItemText className="titleCol">{coord.title} {coord.coord.lat}  {coord.coord.lng}</ListItemText>
                <IconButton title="Delete" onClick={() => deleteCoord(coord.id)}>
                  <DeleteOutlinedIcon className="onlinedIcon" />
                </IconButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};

export default CoordsList;
