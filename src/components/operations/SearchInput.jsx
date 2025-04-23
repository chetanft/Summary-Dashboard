import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Search input component for searching
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Search handler function
 * @param {Object} props.sx - Additional styles
 * @returns {JSX.Element}
 */
const SearchInput = ({ onSearch, sx = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  
  return (
    <TextField
      placeholder="Search..."
      value={searchTerm}
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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchInput;
