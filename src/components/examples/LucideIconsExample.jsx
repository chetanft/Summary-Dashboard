import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Icon from '../common/Icon';

/**
 * Example component that demonstrates the usage of Lucide icons
 */
const LucideIconsExample = () => {
  // Common icons used in the application
  const commonIcons = [
    { name: 'Truck', label: 'Truck (Shipping)' },
    { name: 'Search', label: 'Search' },
    { name: 'Bell', label: 'Notifications' },
    { name: 'User', label: 'User' },
    { name: 'Settings', label: 'Settings' },
    { name: 'CheckCircle', label: 'Success' },
    { name: 'AlertCircle', label: 'Error' },
    { name: 'AlertTriangle', label: 'Warning' },
    { name: 'Info', label: 'Info' },
    { name: 'Plus', label: 'Add' },
    { name: 'Edit', label: 'Edit' },
    { name: 'Trash2', label: 'Delete' },
    { name: 'Filter', label: 'Filter' },
    { name: 'RefreshCw', label: 'Refresh' },
    { name: 'ChevronLeft', label: 'Previous' },
    { name: 'ChevronRight', label: 'Next' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lucide Icons Example
      </Typography>
      
      <Typography variant="body1" paragraph>
        This example demonstrates the usage of Lucide icons in the application.
        The new Icon component supports both Material UI and Lucide icons.
      </Typography>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Basic Usage
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Icon name="Truck" />
        <Typography>Default Lucide icon</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Icon name="Truck" useMui={true} />
        <Typography>Material UI icon (using useMui prop)</Typography>
      </Box>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Customizing Icons
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" size={24} />
          <Typography variant="caption">size=24</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" size={32} />
          <Typography variant="caption">size=32</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" size={48} />
          <Typography variant="caption">size=48</Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" color="primary.main" />
          <Typography variant="caption">primary</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" color="secondary.main" />
          <Typography variant="caption">secondary</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" color="success.main" />
          <Typography variant="caption">success</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" color="error.main" />
          <Typography variant="caption">error</Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" strokeWidth={1} />
          <Typography variant="caption">strokeWidth=1</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" strokeWidth={2} />
          <Typography variant="caption">strokeWidth=2 (default)</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Icon name="Truck" strokeWidth={3} />
          <Typography variant="caption">strokeWidth=3</Typography>
        </Box>
      </Box>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Common Icons
      </Typography>
      
      <Grid container spacing={2}>
        {commonIcons.map(({ name, label }) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={name}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={name} size={24} />
              </Box>
              <Typography variant="caption" sx={{ mt: 1, textAlign: 'center' }}>
                {label}
                <br />
                <code>{name}</code>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LucideIconsExample;
