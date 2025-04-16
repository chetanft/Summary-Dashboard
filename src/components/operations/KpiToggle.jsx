import React from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';

/**
 * Toggle component for switching between FTL and PTL views
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeType - Active toggle value ('ftl' or 'ptl')
 * @param {Function} props.onChange - Change handler function
 * @param {Object} props.sx - Additional styles
 * @returns {JSX.Element}
 */
const KpiToggle = ({ activeType, onChange, sx = {} }) => {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <ToggleButtonGroup
        value={activeType}
        exclusive
        onChange={onChange}
        aria-label="FTL or PTL view"
        size="small"
        sx={{
          '& .MuiToggleButtonGroup-grouped': {
            border: '1px solid #E0E0E0',
            '&:not(:first-of-type)': {
              borderLeft: '1px solid #E0E0E0',
            },
          },
        }}
      >
        <ToggleButton 
          value="ftl" 
          aria-label="FTL"
          sx={{ 
            px: 3,
            py: 0.5,
            '&.Mui-selected': {
              backgroundColor: '#E3F2FD',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#BBDEFB'
              }
            }
          }}
        >
          FTL
        </ToggleButton>
        <ToggleButton 
          value="ptl" 
          aria-label="PTL"
          sx={{ 
            px: 3,
            py: 0.5,
            '&.Mui-selected': {
              backgroundColor: '#E3F2FD',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#BBDEFB'
              }
            }
          }}
        >
          PTL
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default KpiToggle;
