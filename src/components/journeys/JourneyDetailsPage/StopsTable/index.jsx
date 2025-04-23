import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Table, TableHead, TableBody, TableRow, TableCell, useMediaQuery, useTheme } from '@mui/material';
import StopRow from './StopRow';
import StopCard from './StopCard';
import VirtualizedStopsTable from './VirtualizedStopsTable';

/**
 * Stops Table component
 * Displays a table of journey stops
 *
 * @param {Object} props - Component props
 * @param {Array} props.stops - Array of stop objects
 * @returns {JSX.Element}
 */
const StopsTable = ({ stops }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Determine if we should use virtualization (for large datasets)
  const shouldUseVirtualization = useMemo(() => {
    return stops.length > 20; // Use virtualization for more than 20 stops
  }, [stops.length]);

  // Use card layout on mobile
  if (isMobile) {
    return (
      <Box
        sx={{ mb: 3 }}
        role="region"
        aria-label="Journey stops"
      >
        {stops.map((stop, index) => (
          <StopCard key={stop.id || index} stop={stop} />
        ))}
      </Box>
    );
  }

  // Use virtualized table for large datasets on desktop
  if (shouldUseVirtualization) {
    return <VirtualizedStopsTable
      stops={stops}
      aria-label="Journey stops table with virtualization"
    />;
  }

  // Standard table layout for smaller datasets on desktop
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
          <TableBody>
            {stops.map((stop, index) => (
              <StopRow key={stop.id || index} stop={stop} />
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

StopsTable.propTypes = {
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

export default StopsTable;
