import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import StopRow from './StopRow';

/**
 * Virtualized Stops Table component
 * Uses virtualization for better performance with large datasets
 *
 * @param {Object} props - Component props
 * @param {Array} props.stops - Array of stop objects
 * @returns {JSX.Element}
 */
const VirtualizedStopsTable = ({ stops }) => {
  // Row renderer for virtualized list
  const rowRenderer = useCallback(({ index, style }) => {
    const stop = stops[index];
    return (
      <div style={style}>
        <StopRow stop={stop} />
      </div>
    );
  }, [stops]);

  // If no stops, show empty state
  if (!stops || stops.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'divider',
          p: 3,
          mb: 3,
          textAlign: 'center'
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No stops found for this journey
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        mb: 3
      }}
      role="region"
      aria-label="Journey stops table"
    >
      <Box sx={{ overflowX: 'auto' }}>
        <Table aria-label="Stops information">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.light' }}>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Stops</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Vehicle & Driver</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Load ID</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Box>

      {/* Virtualized list for table body */}
      <Box
        sx={{ height: '400px', width: '100%' }}
        role="region"
        aria-label="Virtualized stops list"
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={stops.length}
              itemSize={80} // Height of each row
            >
              {rowRenderer}
            </List>
          )}
        </AutoSizer>
      </Box>
    </Paper>
  );
};

VirtualizedStopsTable.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string.isRequired,
      typeCode: PropTypes.string.isRequired,
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
        city: PropTypes.string,
        state: PropTypes.string,
        rating: PropTypes.number
      }).isRequired,
      vehicle: PropTypes.shape({
        number: PropTypes.string,
        type: PropTypes.string
      }),
      driver: PropTypes.shape({
        name: PropTypes.string
      }),
      load: PropTypes.shape({
        id: PropTypes.string.isRequired,
        isReturn: PropTypes.bool
      }).isRequired
    })
  ).isRequired
};

export default VirtualizedStopsTable;
