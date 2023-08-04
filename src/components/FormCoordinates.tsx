import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import './FormCoordinates.css';
import { getPriorityColor } from '../helpers/unils';
import priority from '../helpers/constants';

interface formCoordinatesProps {
  isClickedCoord: boolean;
  newPriority: string;
  setNewPriority: (arg: string) => void;
  newTitle: string;
  setNewTitle: (arg: string) => void;
  submitCoord: (arg: object) => void;
}

const formCoordinates = (props: formCoordinatesProps) => {
  const {
    isClickedCoord = false,
    newPriority = '',
    setNewPriority = () => {},
    newTitle = '',
    setNewTitle = () => {},
    submitCoord = () => {},
  } = props;

  return (
    <Box className="formContainer">
      <Typography variant="h4">Add Coordinates</Typography>
      <Typography variant="body1">
        Please select the coordinates on the map and fill in all the required fields.
      </Typography>
      <FormControl margin="normal" color="primary" className="coordsForm">
        <InputLabel className="formLabel" id="priority">
          Select a priority
        </InputLabel>
        <Select
          className="selectPriority"
          id="priority"
          label="Select a priority"
          type="text"
          size="small"
          color="primary"
          defaultValue={priority.low}
          sx={getPriorityColor(newPriority)}
          value={newPriority}
          onChange={(event) => setNewPriority(event.target.value)}
          disabled={!isClickedCoord}
        >
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
        <TextField
          className="inputTitle"
          label="Enter a title"
          type="text"
          size="small"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          disabled={!isClickedCoord}
        />
        <Button
          className="submitButton"
          color="success"
          onClick={submitCoord}
          variant="contained"
          disabled={!isClickedCoord}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default formCoordinates;
