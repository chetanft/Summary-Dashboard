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
const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'collapse',
  width: '100%',
  tableLayout: 'fixed',
  '& th, & td': {
    border: '1px solid #e0e0e0',
    padding: theme.spacing(1),
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
}));

// Cell content for vehicle types
const VehicleCell = styled(Box)(({ bgcolor, theme }) => ({
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
  bottom: 0,
  boxShadow: bgcolor && bgcolor !== '#ffffff' && bgcolor !== '#f5f5f5' ? 'inset 0 0 0 1px rgba(255,255,255,0.2)' : 'none'
}));

const DockOccupancyHeatmap = ({ data, title = "Dock Occupancy by Vehicle Type (Discrete Allocation)" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Process data for the heatmap - keep this simple
  const processedData = useMemo(() => {
    if (!data?.occupancy) return {};
    
    // Create a grid representation for easy lookup
    const grid = {};
    
    data.occupancy.forEach(item => {
      const { dockIndex, hourIndex, vehicleType, duration } = item;
      
      // Mark the main cell and create spanning info
      for (let h = 0; h < duration; h++) {
        const key = `${dockIndex}-${hourIndex + h}`;
        grid[key] = {
          vehicleType,
          isMain: h === 0,
          duration: h === 0 ? duration : 0
        };
      }
    });
    
    return grid;
  }, [data]);
  
  if (!data) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>No data available</Typography>
      </Box>
    );
  }
  
  return (
    <HeatmapContainer elevation={2}>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      
      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {Object.entries(data.vehicleTypes || {}).map(([type, { color }]) => (
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
              {data.docks?.slice(0, 10).map((dock, i) => (
                <th key={`dock-${i}`} style={{ width: '100px' }}>{dock}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.hours?.slice(0, 12).map((hour, hourIndex) => (
              <tr key={`hour-${hourIndex}`}>
                <td>{hour}</td>
                {data.docks?.slice(0, 10).map((_, dockIndex) => {
                  const key = `${dockIndex}-${hourIndex}`;
                  const cell = processedData[key];
                  
                  // If this is a continuation cell (not the main cell of a spanning vehicle)
                  // or if there's no vehicle, render an empty cell
                  if (!cell) {
                    return <td key={key}></td>;
                  }
                  
                  // If this is the main cell of a spanning vehicle
                  if (cell.isMain && cell.duration > 1) {
                    return (
                      <td 
                        key={key} 
                        rowSpan={cell.duration}
                      >
                        <Tooltip title={`${cell.vehicleType} (${cell.duration} hours)`}>
                          <VehicleCell bgcolor={data.vehicleTypes[cell.vehicleType].color}>
                            {isMobile ? '' : cell.vehicleType}
                          </VehicleCell>
                        </Tooltip>
                      </td>
                    );
                  }
                  
                  // Regular single-cell vehicle
                  if (cell.isMain) {
                    return (
                      <td key={key}>
                        <Tooltip title={`${cell.vehicleType} (${cell.duration} hours)`}>
                          <VehicleCell bgcolor={data.vehicleTypes[cell.vehicleType].color}>
                            {isMobile ? '' : cell.vehicleType}
                          </VehicleCell>
                        </Tooltip>
                      </td>
                    );
                  }
                  
                  // This should never happen due to how we process the data,
                  // but just in case, render an empty cell
                  return <td key={key}></td>;
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
