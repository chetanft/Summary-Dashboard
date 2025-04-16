// src/components/operations/DockOccupancyHeatmap.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const DockOccupancyHeatmap = () => {
  // Generate all 24 hours
  const hours = Array.from({ length: 24 }, (_, i) => 
    `${i.toString().padStart(2, '0')}:00`
  );
  
  // All 10 docks
  const docks = Array.from({ length: 10 }, (_, i) => `Dock ${i + 1}`);
  
  // Vehicle types with their colors
  const vehicleTypes = {
    'Mini Truck': { color: '#ffbe07' },
    '14-ft Truck': { color: '#003c9b' },
    'Trailer': { color: '#04bc15' },
    'Container': { color: '#939393' }
  };
  
  // Sample occupancy data spread across 24 hours
  const occupancyData = [
    // Early morning
    { dock: 0, hour: 0, type: 'Container', duration: 2 },
    { dock: 3, hour: 1, type: 'Mini Truck', duration: 1 },
    { dock: 7, hour: 2, type: 'Trailer', duration: 2 },
    
    // Morning
    { dock: 0, hour: 6, type: 'Mini Truck', duration: 2 },
    { dock: 1, hour: 7, type: 'Mini Truck', duration: 1 },
    { dock: 5, hour: 6, type: 'Trailer', duration: 2 },
    { dock: 8, hour: 7, type: 'Trailer', duration: 1 },
    
    // Mid-day
    { dock: 2, hour: 9, type: 'Mini Truck', duration: 1 },
    { dock: 3, hour: 9, type: '14-ft Truck', duration: 2 },
    { dock: 6, hour: 10, type: '14-ft Truck', duration: 1 },
    { dock: 7, hour: 10, type: 'Container', duration: 2 },
    
    // Afternoon
    { dock: 0, hour: 12, type: 'Container', duration: 3 },
    { dock: 2, hour: 13, type: 'Trailer', duration: 2 },
    { dock: 5, hour: 14, type: 'Mini Truck', duration: 1 },
    
    // Evening
    { dock: 1, hour: 16, type: '14-ft Truck', duration: 2 },
    { dock: 4, hour: 17, type: 'Container', duration: 1 },
    { dock: 8, hour: 18, type: 'Mini Truck', duration: 2 },
    
    // Night
    { dock: 0, hour: 20, type: 'Trailer', duration: 2 },
    { dock: 3, hour: 21, type: 'Mini Truck', duration: 1 },
    { dock: 6, hour: 22, type: 'Container', duration: 2 },
    { dock: 9, hour: 23, type: '14-ft Truck', duration: 1 }
  ];
  
  // Create a grid for easy lookup
  const grid = {};
  occupancyData.forEach(item => {
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
  
  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Dock Occupancy by Vehicle Type</Typography>
      
      {/* Legend */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {Object.entries(vehicleTypes).map(([type, { color }]) => (
          <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 16, height: 16, bgcolor: color, borderRadius: '2px' }} />
            <Typography variant="caption">{type}</Typography>
          </Box>
        ))}
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
              {docks.map((dock, i) => (
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
                  {dock}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, hourIndex) => (
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
                {docks.map((_, dockIndex) => {
                  const key = `${dockIndex}-${hourIndex}`;
                  const cell = grid[key];
                  
                  // If this cell is covered by a rowspan from above, return null
                  if (hourIndex > 0) {
                    for (let h = 1; h <= Math.min(3, hourIndex); h++) { // Check up to 3 rows back
                      const prevKey = `${dockIndex}-${hourIndex-h}`;
                      const prevCell = grid[prevKey];
                      if (prevCell && prevCell.isStart && prevCell.duration > h && hourIndex < (hourIndex-h) + prevCell.duration) {
                        return null;
                      }
                    }
                  }
                  
                  if (!cell || !cell.isStart) {
                    return (
                      <td key={key} style={{ 
                        border: '1px solid #e0e0e0',
                        padding: '8px',
                        height: '40px',
                        textAlign: 'center'
                      }}></td>
                    );
                  }
                  
                  return (
                    <td 
                      key={key} 
                      rowSpan={cell.duration}
                      style={{ 
                        border: '1px solid #e0e0e0',
                        padding: '8px',
                        backgroundColor: vehicleTypes[cell.type].color,
                        color: '#ffffff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        height: '40px'
                      }}
                    >
                      {cell.type}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
};

export default React.memo(DockOccupancyHeatmap);
