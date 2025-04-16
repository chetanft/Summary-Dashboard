// src/components/operations/DockOccupancyHeatmap.jsx
import React, { useMemo } from 'react';
import { Box, Typography, Paper, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components using Material-UI
const HeatmapContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

// Main table container
const TableContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  marginTop: theme.spacing(2)
}));

// Actual table
const Table = styled('table')({
  borderCollapse: 'collapse',
  width: '100%',
  tableLayout: 'fixed',
  '& th, & td': {
    border: '1px solid #e0e0e0',
    padding: '8px',
    textAlign: 'center',
    height: '40px',
    position: 'relative'
  },
  '& th': {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    position: 'sticky',
    top: 0,
    zIndex: 1
  },
  '& td:first-of-type': {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    position: 'sticky',
    left: 0,
    zIndex: 1
  },
  '& th:first-of-type': {
    position: 'sticky',
    left: 0,
    top: 0,
    zIndex: 2
  }
});

// Cell content for vehicle types
const VehicleCell = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor || 'transparent',
  color: bgcolor && bgcolor !== '#ffffff' && bgcolor !== '#f5f5f5' ? '#ffffff' : '#434F64',
  fontWeight: 'bold',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}));

const DockOccupancyHeatmap = ({ data, title = "Dock Occupancy by Vehicle Type" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Hard-coded data for demonstration
  const demoData = {
    docks: ['Dock 1', 'Dock 2', 'Dock 3', 'Dock 4', 'Dock 5', 'Dock 6', 'Dock 7', 'Dock 8', 'Dock 9', 'Dock 10'],
    hours: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00'],
    vehicleTypes: {
      'Mini Truck': { color: '#ffbe07' },
      '14-ft Truck': { color: '#003c9b' },
      'Trailer': { color: '#04bc15' },
      'Container': { color: '#939393' }
    },
    // Simplified occupancy data matching the image
    occupancy: [
      { dock: 0, hour: 0, type: 'Mini Truck', duration: 2 },
      { dock: 1, hour: 1, type: 'Mini Truck', duration: 1 },
      { dock: 2, hour: 3, type: 'Mini Truck', duration: 1 },
      { dock: 3, hour: 3, type: '14-ft Truck', duration: 2 },
      { dock: 5, hour: 0, type: 'Trailer', duration: 2 },
      { dock: 8, hour: 1, type: 'Trailer', duration: 1 },
      { dock: 7, hour: 4, type: 'Container', duration: 1 }
    ]
  };
  
  // Use demo data instead of passed data for consistent display
  const displayData = demoData;
  
  // Process data for the heatmap
  const processedData = useMemo(() => {
    const grid = {};
    
    displayData.occupancy.forEach(item => {
      const { dock, hour, type, duration } = item;
      
      // Mark cells for this vehicle
      for (let h = 0; h < duration; h++) {
        grid[`${dock}-${hour + h}`] = {
          type,
          isStart: h === 0,
          duration: duration
        };
      }
    });
    
    return grid;
  }, [displayData]);
  
  return (
    <HeatmapContainer elevation={2}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      
      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {Object.entries(displayData.vehicleTypes).map(([type, { color }]) => (
          <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: color, borderRadius: '2px' }} />
            <Typography variant="caption">{type}</Typography>
          </Box>
        ))}
      </Box>
      
      {/* Heatmap Table */}
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th style={{ width: '80px' }}></th> {/* Empty corner cell */}
              {displayData.docks.map((dock, i) => (
                <th key={`dock-${i}`} style={{ width: '100px' }}>{dock}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.hours.map((hour, hourIndex) => (
              <tr key={`hour-${hourIndex}`}>
                <td>{hour}</td>
                {displayData.docks.map((_, dockIndex) => {
                  const key = `${dockIndex}-${hourIndex}`;
                  const cell = processedData[key];
                  
                  if (!cell) {
                    return <td key={key}></td>;
                  }
                  
                  if (cell.isStart) {
                    return (
                      <td 
                        key={key} 
                        rowSpan={cell.duration}
                      >
                        <Tooltip title={`${cell.type} (${cell.duration} hours)`}>
                          <VehicleCell bgcolor={displayData.vehicleTypes[cell.type].color}>
                            {isMobile ? '' : cell.type}
                          </VehicleCell>
                        </Tooltip>
                      </td>
                    );
                  }
                  
                  // This cell is covered by a rowSpan from above
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </HeatmapContainer>
  );
};

export default React.memo(DockOccupancyHeatmap);
