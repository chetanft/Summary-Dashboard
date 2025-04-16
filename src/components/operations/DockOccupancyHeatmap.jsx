// src/components/operations/DockOccupancyHeatmap.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const DockOccupancyHeatmap = () => {
  // Hard-coded data to match the image exactly
  const docks = ['Dock 1', 'Dock 2', 'Dock 3', 'Dock 4', 'Dock 5', 'Dock 6', 'Dock 7', 'Dock 8', 'Dock 9', 'Dock 10'];
  const hours = ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00'];
  
  const vehicleTypes = {
    'Mini Truck': { color: '#ffbe07' },
    '14-ft Truck': { color: '#003c9b' },
    'Trailer': { color: '#04bc15' },
    'Container': { color: '#939393' }
  };
  
  // Simplified occupancy data - just what's visible in the image
  const occupancyMap = {
    '0-0': { type: 'Mini Truck', duration: 2 },
    '1-1': { type: 'Mini Truck', duration: 1 },
    '2-3': { type: 'Mini Truck', duration: 1 },
    '3-3': { type: '14-ft Truck', duration: 2 },
    '5-0': { type: 'Trailer', duration: 2 },
    '8-1': { type: 'Trailer', duration: 1 },
    '7-4': { type: 'Container', duration: 1 }
  };
  
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
      
      {/* Static HTML table with fixed dimensions */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '4px'
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
                zIndex: 2
              }}></th>
              {docks.map((dock, i) => (
                <th key={`dock-${i}`} style={{ 
                  width: '120px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #e0e0e0',
                  padding: '8px',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
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
                  zIndex: 1
                }}>
                  {hour}
                </td>
                {docks.map((_, dockIndex) => {
                  const key = `${dockIndex}-${hourIndex}`;
                  const cell = occupancyMap[key];
                  
                  // Skip cells that are covered by rowspan
                  if (hourIndex > 0) {
                    const prevKey = `${dockIndex}-${hourIndex-1}`;
                    const prevCell = occupancyMap[prevKey];
                    if (prevCell && prevCell.duration > 1 && hourIndex < prevCell.duration) {
                      return null;
                    }
                  }
                  
                  if (!cell) {
                    return (
                      <td key={key} style={{ 
                        border: '1px solid #e0e0e0',
                        padding: '8px',
                        height: '40px'
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
