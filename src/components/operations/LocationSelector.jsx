import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Location selector component for selecting a location
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Selected location
 * @param {Function} props.onChange - Change handler function
 * @param {Object} props.sx - Additional styles
 * @returns {JSX.Element}
 */
const LocationSelector = ({ value = 'MDC Labs, Amritsar', onChange, sx = {} }) => {
  const [location, setLocation] = useState(value);
  
  const handleChange = (event) => {
    const newValue = event.target.value;
    setLocation(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  
  const locations = [
    'MDC Labs, Amritsar',
    'Tata Motors, Pune',
    'Freight Tiger HQ, Mumbai',
    'Logistics Hub, Delhi'
  ];
  
  return (
    <TextField
      select
      value={location}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{
        minWidth: 200,
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        ...sx
      }}
      SelectProps={{
        IconComponent: KeyboardArrowDownIcon
      }}
    >
      {locations.map((loc) => (
        <MenuItem key={loc} value={loc}>
          {loc}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LocationSelector;
