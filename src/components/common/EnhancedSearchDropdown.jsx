import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

/**
 * EnhancedSearchDropdown component with recent searches functionality
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of items to search through (strings or objects)
 * @param {string} props.placeholder - Placeholder text for the search input
 * @param {function} props.onSelect - Callback function when an item is selected
 * @param {Array} props.recentSearches - Array of recent searches to display
 * @param {function} props.onClearSearch - Callback when search is cleared
 * @param {function} props.onSearchChange - Callback when search text changes
 * @param {string} props.width - Width of the component (default: '100%')
 * @returns {JSX.Element} EnhancedSearchDropdown component
 */
const EnhancedSearchDropdown = ({
  data = [],
  placeholder = 'Search Orders',
  onSelect,
  recentSearches = [],
  onClearSearch,
  onSearchChange,
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

    const filtered = data.filter(item => {
      // Search across all properties of the item
      if (typeof item === 'string') {
        return item.toLowerCase().includes(searchValue.toLowerCase());
      }

      // For objects, search across all properties
      return Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setFilteredResults(filtered);
    setSelectedIndex(-1); // Reset selected index when results change
  }, [searchValue, data]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsOpen(true);

    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  // Handle item selection
  const handleSelectItem = (item) => {
    if (typeof item === 'string') {
      setSearchValue(item);
    } else {
      // For objects, use the first property as the display value
      const displayValue = Object.values(item)[0];
      setSearchValue(displayValue);
    }

    setIsOpen(false);

    if (onSelect) {
      onSelect(item);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchValue('');
    setIsOpen(false);

    if (onClearSearch) {
      onClearSearch();
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
        if (recentSearches.length > 0 && filteredResults.length === 0) {
          setSelectedIndex(prevIndex =>
            prevIndex < recentSearches.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else {
          setSelectedIndex(prevIndex =>
            prevIndex < filteredResults.length - 1 ? prevIndex + 1 : prevIndex
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (recentSearches.length > 0 && filteredResults.length === 0) {
            if (selectedIndex < recentSearches.length) {
              handleSelectItem(recentSearches[selectedIndex]);
            }
          } else if (selectedIndex < filteredResults.length) {
            handleSelectItem(filteredResults[selectedIndex]);
          }
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

  // Get color for search item type
  const getTypeColor = (type) => {
    switch (type) {
      case 'Order ID':
        return '#1976d2'; // blue
      case 'Consignor':
        return '#2e7d32'; // green
      case 'Consignee':
        return '#9c27b0'; // purple
      case 'Route':
        return '#ed6c02'; // orange
      case 'Trip Type':
        return '#0288d1'; // light blue
      case 'Stage':
        return '#d32f2f'; // red
      case 'Status':
        return '#689f38'; // light green
      case 'Tracking ID':
        return '#7b1fa2'; // deep purple
      case 'KPI':
        return '#c2185b'; // pink
      case 'Region':
        return '#00796b'; // teal
      case 'Alert':
        return '#d32f2f'; // red
      default:
        return '#757575'; // grey
    }
  };

  // Render a recent search item
  const renderRecentSearchItem = (item, index) => {
    // Extract the type and value
    const type = item.type || 'Order ID';
    const value = item.value || item;
    const tripId = item.tripId || null;
    const typeColor = getTypeColor(type);

    return (
      <ListItem
        key={`recent-${index}`}
        onClick={() => handleSelectItem(item)}
        sx={{
          cursor: 'pointer',
          backgroundColor: selectedIndex === index ? 'action.hover' : 'inherit',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          py: 1.5,
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              label={type}
              size="small"
              sx={{
                backgroundColor: `${typeColor}20`, // 20% opacity
                color: typeColor,
                fontWeight: 'medium',
                borderRadius: '4px',
                mr: 1,
                minWidth: '80px',
              }}
            />
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {value}
            </Typography>
          </Box>

          {tripId && (
            <Chip
              label={`Stage: ${tripId}`}
              size="small"
              sx={{
                backgroundColor: '#f0f0f0',
                color: 'text.secondary',
                fontWeight: 'normal',
                borderRadius: '4px',
              }}
            />
          )}
        </Box>
      </ListItem>
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
          onFocus={() => setIsOpen(true)}
          size="small"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
            ),
            endAdornment: searchValue ? (
              <IconButton
                size="small"
                onClick={handleClearSearch}
                sx={{ p: 0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            ) : null,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '4px',
            }
          }}
        />
      </Box>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            width: '100%',
            maxHeight: '400px',
            overflowY: 'auto',
            mt: 0.5,
            zIndex: 1300,
            borderRadius: '4px',
          }}
        >
          {searchValue.trim() === '' && recentSearches.length > 0 && (
            <>
              <Typography
                variant="subtitle2"
                sx={{
                  px: 2,
                  py: 1.5,
                  color: 'text.secondary',
                  fontWeight: 'medium',
                }}
              >
                Recent Searches
              </Typography>

              <List sx={{ p: 0 }}>
                {recentSearches.map((item, index) => renderRecentSearchItem(item, index))}
              </List>
            </>
          )}

          {searchValue.trim() !== '' && (
            <List sx={{ p: 0 }}>
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => {
                  // Extract the type and value based on the item structure
                  const type = item.type || 'Order ID';
                  const value = item.value || item;
                  const tripId = item.tripId || null;
                  const typeColor = getTypeColor(type);

                  // Highlight the matching text
                  const highlightText = (text) => {
                    if (!searchValue.trim()) return text;
                    const regex = new RegExp(`(${searchValue})`, 'gi');
                    const parts = text.split(regex);

                    return (
                      <>
                        {parts.map((part, i) =>
                          regex.test(part) ? (
                            <Typography component="span" key={i} sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                              {part}
                            </Typography>
                          ) : (
                            <Typography component="span" key={i}>
                              {part}
                            </Typography>
                          )
                        )}
                      </>
                    );
                  };

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
                        py: 1.5,
                        px: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip
                            label={type}
                            size="small"
                            sx={{
                              backgroundColor: `${typeColor}20`, // 20% opacity
                              color: typeColor,
                              fontWeight: 'medium',
                              borderRadius: '4px',
                              mr: 1,
                              minWidth: '80px',
                            }}
                          />
                          <Typography variant="body1" sx={{ color: 'text.primary' }}>
                            {highlightText(value)}
                          </Typography>
                        </Box>

                        {tripId && (
                          <Chip
                            label={`Stage: ${tripId}`}
                            size="small"
                            sx={{
                              backgroundColor: '#f0f0f0',
                              color: 'text.secondary',
                              fontWeight: 'normal',
                              borderRadius: '4px',
                            }}
                          />
                        )}
                      </Box>
                    </ListItem>
                  );
                })
              ) : (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography color="text.secondary">No results found</Typography>
                </Box>
              )}
            </List>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default EnhancedSearchDropdown;
