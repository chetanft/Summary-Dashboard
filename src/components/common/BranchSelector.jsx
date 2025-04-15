import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@mui/material';

const BranchSelector = ({ onBranchChange }) => {
  const [selected, setSelected] = useState('all');
  
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    if (onBranchChange) {
      onBranchChange(value);
    }
  };
  
  return (
    <FormControl size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="branch-selector-label">Region/Branch</InputLabel>
      <Select
        labelId="branch-selector-label"
        id="branch-selector"
        value={selected}
        label="Region/Branch"
        onChange={handleChange}
      >
        <MenuItem value="all">All Branches</MenuItem>
        
        <ListSubheader>North Region</ListSubheader>
        <MenuItem value="north">North Region (All)</MenuItem>
        <MenuItem value="north-delhi">Delhi</MenuItem>
        <MenuItem value="north-chandigarh">Chandigarh</MenuItem>
        <MenuItem value="north-lucknow">Lucknow</MenuItem>
        
        <ListSubheader>South Region</ListSubheader>
        <MenuItem value="south">South Region (All)</MenuItem>
        <MenuItem value="south-bangalore">Bangalore</MenuItem>
        <MenuItem value="south-chennai">Chennai</MenuItem>
        <MenuItem value="south-hyderabad">Hyderabad</MenuItem>
        
        <ListSubheader>East Region</ListSubheader>
        <MenuItem value="east">East Region (All)</MenuItem>
        <MenuItem value="east-kolkata">Kolkata</MenuItem>
        <MenuItem value="east-bhubaneswar">Bhubaneswar</MenuItem>
        <MenuItem value="east-patna">Patna</MenuItem>
        
        <ListSubheader>West Region</ListSubheader>
        <MenuItem value="west">West Region (All)</MenuItem>
        <MenuItem value="west-mumbai">Mumbai</MenuItem>
        <MenuItem value="west-ahmedabad">Ahmedabad</MenuItem>
        <MenuItem value="west-pune">Pune</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BranchSelector;
