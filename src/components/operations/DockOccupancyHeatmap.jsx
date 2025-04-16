// src/components/operations/DockOccupancyHeatmap.jsx
import React, { useMemo } from 'react';
import { Box, Typography, Paper, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components using Material-UI
const HeatmapContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  overflow: 'auto'
}));

const HeatmapGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto repeat(10, minmax(80px, 1fr))',
  gridAutoRows: 'minmax(40px, auto)',
  gap: 2,
  height: '100%',
  minHeight: '500px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'auto',
  padding: theme.spacing(1)
}));

const HeatmapCell = styled(Box)(({ bgcolor, theme }) => ({
  backgroundColor: bgcolor || '#ffffff',
  border: '1px solid #e0e0e0',
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: bgcolor && bgcolor !== '#ffffff' && bgcolor !== '#f5f5f5' ? '#ffffff' : '#434F64',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  minHeight: '40px',
  minWidth: '80px',
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
      
      {/* Heatmap Grid */}
      <HeatmapGrid>
        {/* Header row */}
        <Box></Box> {/* Empty corner cell */}
        {data.docks?.map((dock, i) => (
          <HeatmapCell key={`dock-${i}`} bgcolor="#f5f5f5">
            {dock}
          </HeatmapCell>
        ))}
        
        {/* Time rows */}
        {data.hours?.map((hour, hourIndex) => (
          <React.Fragment key={`hour-${hourIndex}`}>
            <HeatmapCell bgcolor="#f5f5f5">
              {hour}
            </HeatmapCell>
            {data.docks?.map((_, dockIndex) => {
              const key = `${dockIndex}-${hourIndex}`;
              const cell = processedData[key];
              
              if (!cell || !cell.isMain) {
                return (
                  <HeatmapCell
                    key={key}
                    bgcolor={cell ? data.vehicleTypes[cell.vehicleType].color : '#ffffff'}
                  />
                );
              }
              
              return (
                <Tooltip title={`${cell.vehicleType} (${cell.duration} hours)`} key={key}>
                  <HeatmapCell
                    bgcolor={data.vehicleTypes[cell.vehicleType].color}
                    sx={{
                      gridRow: cell.duration > 1 ? `span ${cell.duration}` : 'auto',
                      height: cell.duration > 1 ? `${cell.duration * 40}px` : '40px'
                    }}
                  >
                    {isMobile ? '' : cell.vehicleType}
                  </HeatmapCell>
                </Tooltip>
              );
            })}
          </React.Fragment>
        ))}
      </HeatmapGrid>
    </HeatmapContainer>
  );
};

export default React.memo(DockOccupancyHeatmap);
