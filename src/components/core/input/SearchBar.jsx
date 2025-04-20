import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  InputAdornment,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  ListItemText,
  Popper,
  Grow,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from './TextField';
import { Text } from '../typography';

/**
 * SearchBar component with dropdown suggestions.
 */
const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  suggestions = [],
  loading = false,
  noResultsMessage = 'No results found',
  highlightSearchTerm = true,
  maxSuggestions = 10,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  className,
  sx = {},
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const anchorRef = useRef(null);

  // Update internal state when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
    
    // Show suggestions dropdown if there's input and suggestions
    setOpen(newValue.trim() !== '' && suggestions.length > 0);
    
    // Reset highlighted index when input changes
    setHighlightedIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.label);
    setOpen(false);
    
    if (onChange) {
      onChange(suggestion.label);
    }
    
    if (onSearch) {
      onSearch(suggestion.label, suggestion);
    }
  };

  // Handle search submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (onSearch) {
      // If an item is highlighted, use that
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        const suggestion = suggestions[highlightedIndex];
        onSearch(suggestion.label, suggestion);
        return;
      }
      
      // Otherwise use the current input value
      onSearch(inputValue);
    }
    
    setOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (!open) return;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prevIndex) => 
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : -1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[highlightedIndex]);
        } else {
          handleSubmit(event);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        break;
      default:
        break;
    }
  };

  // Highlight matching text in suggestions
  const highlightMatch = (text) => {
    if (!highlightSearchTerm || !inputValue.trim()) {
      return text;
    }
    
    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <Box component="span" sx={{ fontWeight: 'bold' }} key={index}>
              {part}
            </Box>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Filter and limit suggestions
  const displayedSuggestions = suggestions.slice(0, maxSuggestions);

  // Base styles for the search bar
  const baseStyles = {
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',
    ...sx,
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={baseStyles} className={className}>
        <form onSubmit={handleSubmit}>
          <TextField
            ref={anchorRef}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.trim() !== '' && suggestions.length > 0 && setOpen(true)}
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            startAdornment={<SearchIcon />}
            {...props}
          />
        </form>
        
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition
          style={{ width: anchorRef.current?.offsetWidth, zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
              <Paper elevation={3} sx={{ mt: 1, maxHeight: '300px', overflow: 'auto' }}>
                {loading ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Text>Loading...</Text>
                  </Box>
                ) : displayedSuggestions.length > 0 ? (
                  <List disablePadding>
                    {displayedSuggestions.map((suggestion, index) => (
                      <React.Fragment key={suggestion.id || index}>
                        <ListItem
                          button
                          selected={index === highlightedIndex}
                          onClick={() => handleSuggestionClick(suggestion)}
                          sx={{
                            py: 1,
                            px: 2,
                            '&.Mui-selected': {
                              backgroundColor: 'action.selected',
                            },
                            '&.Mui-selected:hover': {
                              backgroundColor: 'action.hover',
                            },
                          }}
                        >
                          {suggestion.icon && (
                            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                              {suggestion.icon}
                            </Box>
                          )}
                          <ListItemText
                            primary={highlightMatch(suggestion.label)}
                            secondary={suggestion.description && highlightMatch(suggestion.description)}
                            primaryTypographyProps={{
                              variant: 'body2',
                            }}
                            secondaryTypographyProps={{
                              variant: 'caption',
                            }}
                          />
                        </ListItem>
                        {index < displayedSuggestions.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Text>{noResultsMessage}</Text>
                  </Box>
                )}
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

SearchBar.propTypes = {
  /** Placeholder text for the search input */
  placeholder: PropTypes.string,
  /** The value of the search input */
  value: PropTypes.string,
  /** Callback fired when the input value changes */
  onChange: PropTypes.func,
  /** Callback fired when a search is submitted */
  onSearch: PropTypes.func,
  /** Array of suggestion objects */
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique identifier for the suggestion */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** Display text for the suggestion */
      label: PropTypes.string.isRequired,
      /** Optional description for the suggestion */
      description: PropTypes.string,
      /** Optional icon for the suggestion */
      icon: PropTypes.node,
    })
  ),
  /** Whether suggestions are currently loading */
  loading: PropTypes.bool,
  /** Message to display when no suggestions are found */
  noResultsMessage: PropTypes.string,
  /** Whether to highlight the search term in suggestions */
  highlightSearchTerm: PropTypes.bool,
  /** Maximum number of suggestions to display */
  maxSuggestions: PropTypes.number,
  /** Whether the search bar should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** The variant of the input */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** The size of the input */
  size: PropTypes.oneOf(['small', 'medium']),
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default SearchBar;
