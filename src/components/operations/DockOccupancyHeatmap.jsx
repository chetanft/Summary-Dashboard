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
      
      {/* Embed a static image for now */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
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
              {Array.from({ length: 10 }, (_, i) => (
                <th key={`dock-${i}`} style={{ 
                  width: '120px', 
                  backgroundColor: '#f5f5f5', 
                  border: '1px solid #e0e0e0',
                  padding: '8px',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}>
                  Dock {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['6:00', '7:00', '8:00', '9:00', '10:00', '11:00'].map((hour, hourIndex) => (
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
                
                {/* First row - 6:00 */}
                {hourIndex === 0 && (
                  <>
                    <td rowSpan={2} style={{ backgroundColor: '#ffbe07', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Mini Truck</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td rowSpan={2} style={{ backgroundColor: '#04bc15', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Trailer</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                  </>
                )}
                
                {/* Second row - 7:00 */}
                {hourIndex === 1 && (
                  <>
                    {/* First cell covered by rowspan */}
                    <td style={{ backgroundColor: '#ffbe07', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Mini Truck</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    {/* Sixth cell covered by rowspan */}
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ backgroundColor: '#04bc15', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Trailer</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                  </>
                )}
                
                {/* Third row - 8:00 */}
                {hourIndex === 2 && (
                  <>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                  </>
                )}
                
                {/* Fourth row - 9:00 */}
                {hourIndex === 3 && (
                  <>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ backgroundColor: '#ffbe07', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Mini Truck</td>
                    <td rowSpan={2} style={{ backgroundColor: '#003c9b', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>14-ft Truck</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                  </>
                )}
                
                {/* Fifth row - 10:00 */}
                {hourIndex === 4 && (
                  <>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    {/* Fourth cell covered by rowspan */}
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ backgroundColor: '#003c9b', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>14-ft Truck</td>
                    <td style={{ backgroundColor: '#939393', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Container</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                  </>
                )}
                
                {/* Sixth row - 11:00 */}
                {hourIndex === 5 && (
                  <>
                    <td style={{ backgroundColor: '#ffbe07', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Mini Truck</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ backgroundColor: '#04bc15', color: 'white', border: '1px solid #e0e0e0', textAlign: 'center' }}>Trailer</td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                    <td style={{ border: '1px solid #e0e0e0' }}></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
};

export default React.memo(DockOccupancyHeatmap);
