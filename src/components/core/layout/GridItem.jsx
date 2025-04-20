import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

/**
 * GridItem component to be used within the Grid component.
 * Replaces the deprecated MUI Grid item.
 */
const GridItem = ({
  span = 12,
  spanSm,
  spanMd,
  spanLg,
  spanXl,
  start,
  startSm,
  startMd,
  startLg,
  startXl,
  children,
  className,
  sx = {},
  ...props
}) => {
  // Base styles for the grid item
  const baseStyles = {
    gridColumn: `span ${span} / auto`,
    // Responsive grid spans
    ...(spanSm && {
      '@media (min-width: 600px)': {
        gridColumn: `span ${spanSm} / auto`,
      },
    }),
    ...(spanMd && {
      '@media (min-width: 900px)': {
        gridColumn: `span ${spanMd} / auto`,
      },
    }),
    ...(spanLg && {
      '@media (min-width: 1200px)': {
        gridColumn: `span ${spanLg} / auto`,
      },
    }),
    ...(spanXl && {
      '@media (min-width: 1536px)': {
        gridColumn: `span ${spanXl} / auto`,
      },
    }),
    // Grid column start positions
    ...(start && {
      gridColumnStart: start,
    }),
    ...(startSm && {
      '@media (min-width: 600px)': {
        gridColumnStart: startSm,
      },
    }),
    ...(startMd && {
      '@media (min-width: 900px)': {
        gridColumnStart: startMd,
      },
    }),
    ...(startLg && {
      '@media (min-width: 1200px)': {
        gridColumnStart: startLg,
      },
    }),
    ...(startXl && {
      '@media (min-width: 1536px)': {
        gridColumnStart: startXl,
      },
    }),
    // Custom styles
    ...sx,
  };

  return (
    <Box
      className={`grid-item ${className || ''}`}
      sx={baseStyles}
      {...props}
    >
      {children}
    </Box>
  );
};

GridItem.propTypes = {
  /** Number of columns the item spans (1-12) */
  span: PropTypes.number,
  /** Number of columns the item spans on small screens */
  spanSm: PropTypes.number,
  /** Number of columns the item spans on medium screens */
  spanMd: PropTypes.number,
  /** Number of columns the item spans on large screens */
  spanLg: PropTypes.number,
  /** Number of columns the item spans on extra large screens */
  spanXl: PropTypes.number,
  /** Starting column for the item */
  start: PropTypes.number,
  /** Starting column for the item on small screens */
  startSm: PropTypes.number,
  /** Starting column for the item on medium screens */
  startMd: PropTypes.number,
  /** Starting column for the item on large screens */
  startLg: PropTypes.number,
  /** Starting column for the item on extra large screens */
  startXl: PropTypes.number,
  /** Content of the grid item */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default GridItem;
