import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Icon from './Icon';

/**
 * Rating component
 * Displays a star rating
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Rating value (0-5)
 * @param {string} props.size - Size of the stars ('small', 'medium', 'large')
 * @param {boolean} props.readOnly - Whether the rating is read-only
 * @returns {JSX.Element}
 */
const Rating = ({ value, size = 'medium', readOnly = true }) => {
  // Convert size to pixel values
  const sizeMap = {
    small: 16,
    medium: 20,
    large: 24
  };
  
  const iconSize = sizeMap[size] || sizeMap.medium;
  
  // Calculate full and partial stars
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Icon 
          key={`full-${index}`} 
          name="Star" 
          size={iconSize} 
          sx={{ color: 'warning.main' }} 
        />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <Icon 
          name="StarHalf" 
          size={iconSize} 
          sx={{ color: 'warning.main' }} 
        />
      )}
      
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon 
          key={`empty-${index}`} 
          name="Star" 
          size={iconSize} 
          sx={{ color: 'grey.300' }} 
        />
      ))}
    </Box>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  readOnly: PropTypes.bool
};

export default Rating;
