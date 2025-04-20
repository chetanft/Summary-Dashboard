import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box } from '@mui/material';
import { Text } from '../typography';

/**
 * Loader component for displaying loading states.
 */
const Loader = ({
  size = 'medium',
  color = 'primary',
  message,
  overlay = false,
  fullPage = false,
  className,
  sx = {},
  ...props
}) => {
  // Size mapping
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 56,
  };

  // Calculate the actual size
  const progressSize = typeof size === 'string' ? sizeMap[size] || 40 : size;

  // Base styles for the loader container
  const baseStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...(overlay && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: 1000,
    }),
    ...(fullPage && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 1300,
    }),
    ...sx,
  };

  return (
    <Box
      className={`loader ${className || ''}`}
      sx={baseStyles}
      {...props}
    >
      <CircularProgress
        size={progressSize}
        color={color}
        thickness={4}
      />
      {message && (
        <Text
          sx={{
            mt: 2,
            textAlign: 'center',
          }}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

Loader.propTypes = {
  /** The size of the loader */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.number,
  ]),
  /** The color of the loader */
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit']),
  /** Optional message to display below the loader */
  message: PropTypes.node,
  /** Whether to display the loader as an overlay */
  overlay: PropTypes.bool,
  /** Whether to display the loader as a full-page overlay */
  fullPage: PropTypes.bool,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Loader;
