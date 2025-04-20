import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * A modern Grid component that replaces the deprecated MUI Grid.
 * Uses CSS Grid for layout.
 */
const Grid = ({
  columns = 12,
  spacing = 2,
  rowSpacing,
  columnSpacing,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
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

  // Calculate the actual spacing values
  const rowGap = getSpacing(rowSpacing !== undefined ? rowSpacing : spacing);
  const columnGap = getSpacing(columnSpacing !== undefined ? columnSpacing : spacing);

  // Base styles for the grid
  const baseStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${rowGap} ${columnGap}`,
    alignItems,
    justifyContent,
    width: '100%',
    ...sx,
  };

  return (
    <Box
      className={`grid ${className || ''}`}
      sx={baseStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

Grid.propTypes = {
  /** Number of columns in the grid */
  columns: PropTypes.number,
  /** Spacing between grid items (applies to both rows and columns) */
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Spacing between rows */
  rowSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Spacing between columns */
  columnSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Alignment of grid items along the cross axis */
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  /** Alignment of grid items along the main axis */
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']),
  /** Grid items */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Grid;
