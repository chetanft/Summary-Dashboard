import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const KPIGroupContainer = ({ title, description, icon, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: '12px',
        border: '1px solid #E0E0E0',
        mb: 3
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon && (
          <Box sx={{ mr: 1, color: '#1976d2' }}>
            {icon}
          </Box>
        )}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      
      {/* Description */}
      {description && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      
      <Divider sx={{ my: 1 }} />
      
      {/* KPI Tiles */}
      <Box sx={{ mt: 2 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default KPIGroupContainer;
