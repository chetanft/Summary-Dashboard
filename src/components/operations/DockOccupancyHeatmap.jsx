// src/components/operations/DockOccupancyHeatmap.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const DockOccupancyHeatmap = () => {
  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Dock Occupancy by Vehicle Type</Typography>
      
      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#ffbe07', borderRadius: '2px' }} />
          <Typography variant="caption">Mini Truck</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#003c9b', borderRadius: '2px' }} />
          <Typography variant="caption">14-ft Truck</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#04bc15', borderRadius: '2px' }} />
          <Typography variant="caption">Trailer</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#939393', borderRadius: '2px' }} />
          <Typography variant="caption">Container</Typography>
        </Box>
      </Box>
      
      {/* Scrollable container */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        maxHeight: 'calc(100vh - 200px)', // Ensure it doesn't overflow the screen
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#bdbdbd',
          borderRadius: '4px'
        }
      }}>
        <table style={{ 
          borderCollapse: 'collapse', 
          width: '100%',
          minWidth: '1200px',
          tableLayout: 'fixed'
        }}>
          <thead>
            <tr>
              <th style={{ 
                width: '80px', 
                backgroundColor: '#f5f5f5', 
                border: '1px solid #e0e0e0',
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: 2,
                padding: '8px',
                textAlign: 'center'
              }}></th>
              {Array.from({ length: 10 }, (_, i) => (
                <th key={`dock-${i}`} style={{ 
                  width: '120px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #e0e0e0',
                  padding: '8px',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  textAlign: 'center'
                }}>
                  Dock {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`).map((hour, hourIndex) => (
              <tr key={`hour-${hourIndex}`}>
                <td style={{ 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #e0e0e0',
                  padding: '8px',
                  fontWeight: 'bold',
                  position: 'sticky',
                  left: 0,
                  zIndex: 1,
                  textAlign: 'center'
                }}>
                  {hour}
                </td>
                
                {/* Generate 10 empty cells for each hour by default */}
                {Array.from({ length: 10 }, (_, dockIndex) => (
                  <td key={`dock-${dockIndex}`} style={{ 
                    border: '1px solid #e0e0e0',
                    padding: '8px',
                    height: '40px',
                    textAlign: 'center'
                  }}></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
};

// Add some vehicle cells after the component is defined
const addVehicleCells = () => {
  // This is just a placeholder to show how we would add vehicle cells
  // In a real implementation, we would modify the DOM after the component mounts
  console.log('Adding vehicle cells');
};

export default React.memo(DockOccupancyHeatmap);
