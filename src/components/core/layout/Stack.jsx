import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * Stack component for vertical or horizontal stacking of elements.
 */
const Stack = ({
  direction = 'column',
  spacing = 2,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  wrap = 'nowrap',
  children,
  className,
  sx = {},
  ...props
}) => {
  // Convert spacing to pixel values
  const getSpacing = (space) => {
    if (typeof space === 'number') {
      return `${space * 8}px`;
    }
    return space;
  };

  // Base styles for the stack
  const baseStyles = {
    display: 'flex',
    flexDirection: direction,
    gap: getSpacing(spacing),
    alignItems,
    justifyContent,
    flexWrap: wrap,
    width: '100%',
    ...sx,
  };

  return (
    <Box
      className={`stack ${className || ''}`}
      sx={baseStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

Stack.propTypes = {
  /** The direction of the stack */
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  /** Spacing between items */
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Alignment of items along the cross axis */
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  /** Alignment of items along the main axis */
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  /** Whether items should wrap when there isn't enough space */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /** Stack items */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Stack;
