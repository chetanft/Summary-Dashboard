import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, TextField, InputAdornment, Divider, Tabs, Tab } from '@mui/material';
import Icon, { useIconRegistry } from '../components/common/Icon';
import LucideIconsExample from '../components/examples/LucideIconsExample';

/**
 * Demo page for showcasing icons
 */
const IconsDemo = () => {
  const { materialIcons, lucideIcons, iconMapping } = useIconRegistry();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Get all Material UI icon names
  const muiIconNames = Object.keys(materialIcons);

  // Get all Lucide icon names
  const lucideIconNames = Object.keys(lucideIcons).filter(name =>
    typeof lucideIcons[name] === 'function' && name !== 'default'
  );

  // Filter icons based on search term
  const filteredMuiIcons = muiIconNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLucideIcons = lucideIconNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get mapped icons (MUI icons with Lucide equivalents)
  const mappedIcons = Object.entries(iconMapping).map(([muiName, lucideName]) => ({
    muiName,
    lucideName,
  }));

  const filteredMappedIcons = mappedIcons.filter(({ muiName, lucideName }) =>
    muiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lucideName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Icon Library Demo
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Examples" />
        <Tab label="Icon Browser" />
      </Tabs>

      {tabValue === 0 ? (
        <LucideIconsExample />
      ) : (
        <>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="Search" />
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="h5" gutterBottom>
            Icon Comparison (Material UI vs Lucide)
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This section shows Material UI icons and their Lucide equivalents side by side.
          </Typography>
        </>
      )}

      {tabValue === 1 && (
        <>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" fontWeight="bold">Material UI Icon</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" fontWeight="bold">Lucide Icon</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" fontWeight="bold">Icon Names</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {filteredMappedIcons.length > 0 ? (
              filteredMappedIcons.map(({ muiName, lucideName }) => (
                <Grid container spacing={2} key={muiName} sx={{ py: 1 }}>
                  <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon name={muiName} useMui={true} sx={{ mr: 1 }} />
                    <Icon name={muiName} useMui={true} sx={{ mr: 1 }} fontSize="small" />
                    <Icon name={muiName} useMui={true} fontSize="large" />
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Icon name={lucideName} sx={{ mr: 1 }} />
                    <Icon name={lucideName} sx={{ mr: 1 }} size={18} />
                    <Icon name={lucideName} size={28} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">
                      MUI: <code>{muiName}</code>
                    </Typography>
                    <Typography variant="body2">
                      Lucide: <code>{lucideName}</code>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" sx={{ py: 2, textAlign: 'center' }}>
                No matching icons found
              </Typography>
            )}
          </Paper>

          <Typography variant="h5" gutterBottom>
            All Lucide Icons
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This section shows all available Lucide icons.
          </Typography>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              {filteredLucideIcons.slice(0, 100).map(name => (
                <Grid item xs={6} sm={4} md={3} lg={2} key={name} sx={{ textAlign: 'center' }}>
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
                    <Typography variant="caption" sx={{ mt: 1, wordBreak: 'break-word' }}>
                      {name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}

              {filteredLucideIcons.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ py: 2, textAlign: 'center' }}>
                    No matching icons found
                  </Typography>
                </Grid>
              )}

              {filteredLucideIcons.length > 100 && (
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ py: 2, textAlign: 'center' }}>
                    Showing 100 of {filteredLucideIcons.length} icons. Refine your search to see more specific results.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default IconsDemo;
