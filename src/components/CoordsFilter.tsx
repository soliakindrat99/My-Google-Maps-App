import priority from '../helpers/constants.js';
import { getPriorityColor } from '../helpers/unils';
import { Box, Select, InputLabel, MenuItem } from '@mui/material';
import './CoordsFilter.css';

const CoordsFilter = (props: any) => {
  const { selected = false, onChangeFilter = () => {} } = props;

  const dropdownChangeHandler = (event: any) => {
    onChangeFilter(event.target.value);
  };

  return (
    <Box className="coordsFilter">
      <InputLabel className="formLabel" id="priority">
        Filter by Priority
      </InputLabel>
      <Select
        className="selectPriority"
        id="priority"
        type="text"
        size="small"
        fullWidth
        value={selected}
        onChange={dropdownChangeHandler}
        defaultValue={'All'}
        sx={getPriorityColor(selected)}
      >
        <MenuItem sx={getPriorityColor('All')} value={'All'}>
          All
        </MenuItem>
        <MenuItem sx={getPriorityColor(priority.high)} value={priority.high}>
          High
        </MenuItem>
        <MenuItem sx={getPriorityColor(priority.medium)} value={priority.medium}>
          Medium
        </MenuItem>
        <MenuItem sx={getPriorityColor(priority.low)} value={priority.low}>
          Low
        </MenuItem>
      </Select>
    </Box>
  );
};

export default CoordsFilter;