import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * SearchDropdown component
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to search through (strings or objects)
 * @param {string} props.placeholder - Placeholder text for the search input
 * @param {function} props.onSelect - Callback function when an item is selected
 * @param {string} props.labelKey - Key to use for display if data contains objects (default: 'label')
 * @param {string} props.valueKey - Key to use for value if data contains objects (default: 'value')
 * @param {Array} props.searchKeys - Array of keys to search in if data contains objects (default: [labelKey])
 * @param {function} props.renderOption - Custom render function for dropdown options (item, searchValue) => JSX
 * @param {string} props.width - Width of the component (default: '100%')
 * @returns {JSX.Element} SearchDropdown component
 */
const SearchDropdown = ({
  data = [],
  placeholder = 'Search...',
  onSelect,
  labelKey = 'label',
  valueKey = 'value',
  searchKeys = [],
  renderOption,
  width = '100%'
}) => {
  // State for the search input value
  const [searchValue, setSearchValue] = useState('');

  // State for the filtered results
  const [filteredResults, setFilteredResults] = useState([]);

  // State for the dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // State for the currently selected item index (for keyboard navigation)
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Ref for the dropdown container
  const dropdownRef = useRef(null);

  // Filter the results based on the search value
  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredResults([]);
      return;
    }

    const keysToSearch = searchKeys.length > 0 ? searchKeys : [labelKey];

    const filtered = data.filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(searchValue.toLowerCase());
      }

      // Search across all specified keys
      return keysToSearch.some(key => {
        if (!item[key]) return false;
        return item[key].toString().toLowerCase().includes(searchValue.toLowerCase());
      });
    });

    setFilteredResults(filtered);
    setSelectedIndex(-1); // Reset selected index when results change
  }, [searchValue, data, labelKey, searchKeys]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsOpen(true);
  };

  // Handle item selection
  const handleSelectItem = (item) => {
    const selectedValue = typeof item === 'string' ? item : item[labelKey];
    setSearchValue(selectedValue);
    setIsOpen(false);

    if (onSelect) {
      onSelect(typeof item === 'string' ? item : item[valueKey]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prevIndex =>
          prevIndex < filteredResults.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredResults.length) {
          handleSelectItem(filteredResults[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Highlight the matching text in the result
  const highlightMatch = (text) => {
    if (!searchValue.trim()) return text;

    const regex = new RegExp(`(${searchValue})`, 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <Typography component="span" key={index} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {part}
            </Typography>
          ) : (
            <Typography component="span" key={index}>
              {part}
            </Typography>
          )
        )}
      </>
    );
  };

  return (
    <Box ref={dropdownRef} sx={{ position: 'relative', width }}>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchValue.trim() && setIsOpen(true)}
          size="small"
          variant="outlined"
        />
        <SearchIcon
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'action.active'
          }}
        />
      </Box>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            width: '100%',
            maxHeight: '300px',
            overflowY: 'auto',
            mt: 0.5,
            zIndex: 1300
          }}
        >
          {filteredResults.length > 0 ? (
            <List sx={{ p: 0 }}>
              {filteredResults.map((item, index) => {
                const itemText = typeof item === 'string' ? item : item[labelKey];

                return (
                  <ListItem
                    key={index}
                    onClick={() => handleSelectItem(item)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: selectedIndex === index ? 'action.hover' : 'inherit',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {renderOption ? (
                      renderOption(item, searchValue)
                    ) : (
                      <ListItemText primary={highlightMatch(itemText)} />
                    )}
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography color="text.secondary">No results found</Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchDropdown;
