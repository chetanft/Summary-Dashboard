import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Button } from '@mui/material';
import Layout from '../components/layout/Layout';
import colorUtils from '../theme/colorUtils';

/**
 * Color System Demo component
 *
 * This component showcases the color system of the application.
 * It displays all the colors in the palette and demonstrates how to use them.
 */
const ColorSystemDemo = () => {
  // Helper function to create a color swatch
  const ColorSwatch = ({ color, name, textColor = '#fff' }) => (
    <Box
      sx={{
        width: '100%',
        height: 80,
        bgcolor: color,
        color: textColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography variant="caption">{color}</Typography>
    </Box>
  );

  // Helper function to create a color row
  const ColorRow = ({ title, colors, textColors }) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(colors).map(([key, value], index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={key}>
            <ColorSwatch
              color={value}
              name={key}
              textColor={textColors ? textColors[index] : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  // Primary colors
  const primaryColors = {
    'primary.main': colorUtils.getColor('primary.main'),
    'primary.light': colorUtils.getColor('primary.light'),
    'primary.dark': colorUtils.getColor('primary.dark'),
  };

  // Secondary colors
  const secondaryColors = {
    'secondary.50': colorUtils.getColor('secondary.50'),
    'secondary.100': colorUtils.getColor('secondary.100'),
    'secondary.200': colorUtils.getColor('secondary.200'),
    'secondary.300': colorUtils.getColor('secondary.300'),
    'secondary.400': colorUtils.getColor('secondary.400'),
    'secondary.500': colorUtils.getColor('secondary.500'),
    'secondary.600': colorUtils.getColor('secondary.600'),
    'secondary.700': colorUtils.getColor('secondary.700'),
    'secondary.800': colorUtils.getColor('secondary.800'),
    'secondary.900': colorUtils.getColor('secondary.900'),
  };

  // Status colors
  const statusColors = {
    'success.main': colorUtils.getStatusColor('success', 'main'),
    'success.light': colorUtils.getStatusColor('success', 'light'),
    'success.dark': colorUtils.getStatusColor('success', 'dark'),
    'error.main': colorUtils.getStatusColor('error', 'main'),
    'error.light': colorUtils.getStatusColor('error', 'light'),
    'error.dark': colorUtils.getStatusColor('error', 'dark'),
    'warning.main': colorUtils.getStatusColor('warning', 'main'),
    'warning.light': colorUtils.getStatusColor('warning', 'light'),
    'warning.dark': colorUtils.getStatusColor('warning', 'dark'),
    'info.main': colorUtils.getStatusColor('info', 'main'),
    'info.light': colorUtils.getStatusColor('info', 'light'),
    'info.dark': colorUtils.getStatusColor('info', 'dark'),
  };

  // Text colors
  const textColors = {
    'text.primary': colorUtils.getColor('text.primary'),
    'text.secondary': colorUtils.getColor('text.secondary'),
    'text.disabled': colorUtils.getColor('text.disabled'),
    'text.dark': colorUtils.getColor('text.dark'),
    'text.medium': colorUtils.getColor('text.medium'),
    'text.light': colorUtils.getColor('text.light'),
  };

  // Background colors
  const backgroundColors = {
    'background.default': colorUtils.getColor('background.default'),
    'background.paper': colorUtils.getColor('background.paper'),
    'background.light': colorUtils.getColor('background.light'),
    'background.table.header': colorUtils.getColor('background.table.header'),
  };

  // Border colors
  const borderColors = {
    'border.light': colorUtils.getColor('border.light'),
    'border.medium': colorUtils.getColor('border.medium'),
    'border.default': colorUtils.getColor('border.default'),
    'divider': colorUtils.getColor('divider'),
  };

  // Action colors
  const actionColors = {
    'action.hover': colorUtils.getColor('action.hover'),
    'action.selected': colorUtils.getColor('action.selected'),
    'action.disabled': colorUtils.getColor('action.disabled'),
    'action.active': colorUtils.getColor('action.active'),
  };

  // Communication colors
  const communicationColors = {
    'communication.sim.main': colorUtils.getCommunicationColor('sim', 'main'),
    'communication.sim.light': colorUtils.getCommunicationColor('sim', 'light'),
    'communication.gps.main': colorUtils.getCommunicationColor('gps', 'main'),
    'communication.gps.light': colorUtils.getCommunicationColor('gps', 'light'),
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Color System
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Overview
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This page showcases the color system of the application. It displays all the colors in the palette and demonstrates how to use them.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The color system is defined in <code>colors.json</code> and can be accessed using the <code>colorUtils</code> functions.
          </Typography>
        </Paper>

        <ColorRow title="Primary Colors" colors={primaryColors} textColors={['#fff', '#fff', '#fff']} />
        <ColorRow title="Secondary Colors" colors={secondaryColors} textColors={['#000', '#000', '#000', '#000', '#000', '#fff', '#fff', '#fff', '#fff', '#fff']} />
        <ColorRow title="Status Colors" colors={statusColors} textColors={['#fff', '#000', '#fff', '#fff', '#000', '#fff', '#fff', '#000', '#fff', '#fff', '#000', '#fff']} />
        <ColorRow title="Text Colors" colors={textColors} textColors={['#fff', '#fff', '#fff', '#fff', '#fff', '#000']} />
        <ColorRow title="Background Colors" colors={backgroundColors} textColors={['#000', '#000', '#000', '#000']} />
        <ColorRow title="Border Colors" colors={borderColors} textColors={['#000', '#000', '#000', '#000']} />
        <ColorRow title="Action Colors" colors={actionColors} textColors={['#000', '#000', '#000', '#fff']} />
        <ColorRow title="Communication Colors" colors={communicationColors} textColors={['#fff', '#000', '#fff', '#000']} />

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" sx={{ mb: 3 }}>
          Usage Examples
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Using with Material-UI
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 1, mb: 1 }}>
                  Primary Button
                </Button>
                <Button variant="contained" color="secondary" sx={{ mr: 1, mb: 1 }}>
                  Secondary Button
                </Button>
                <Button variant="contained" color="error" sx={{ mr: 1, mb: 1 }}>
                  Error Button
                </Button>
                <Button variant="contained" color="warning" sx={{ mr: 1, mb: 1 }}>
                  Warning Button
                </Button>
                <Button variant="contained" color="success" sx={{ mr: 1, mb: 1 }}>
                  Success Button
                </Button>
                <Button variant="contained" color="info" sx={{ mr: 1, mb: 1 }}>
                  Info Button
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Button variant="outlined" color="primary" sx={{ mr: 1, mb: 1 }}>
                  Primary Button
                </Button>
                <Button variant="outlined" color="secondary" sx={{ mr: 1, mb: 1 }}>
                  Secondary Button
                </Button>
                <Button variant="outlined" color="error" sx={{ mr: 1, mb: 1 }}>
                  Error Button
                </Button>
                <Button variant="outlined" color="warning" sx={{ mr: 1, mb: 1 }}>
                  Warning Button
                </Button>
                <Button variant="outlined" color="success" sx={{ mr: 1, mb: 1 }}>
                  Success Button
                </Button>
                <Button variant="outlined" color="info" sx={{ mr: 1, mb: 1 }}>
                  Info Button
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Button variant="text" color="primary" sx={{ mr: 1, mb: 1 }}>
                  Primary Button
                </Button>
                <Button variant="text" color="secondary" sx={{ mr: 1, mb: 1 }}>
                  Secondary Button
                </Button>
                <Button variant="text" color="error" sx={{ mr: 1, mb: 1 }}>
                  Error Button
                </Button>
                <Button variant="text" color="warning" sx={{ mr: 1, mb: 1 }}>
                  Warning Button
                </Button>
                <Button variant="text" color="success" sx={{ mr: 1, mb: 1 }}>
                  Success Button
                </Button>
                <Button variant="text" color="info" sx={{ mr: 1, mb: 1 }}>
                  Info Button
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Using with CSS Variables
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div className="text-primary" style={{ marginBottom: '8px' }}>
                  This text uses the primary text color
                </div>
                <div className="text-secondary" style={{ marginBottom: '8px' }}>
                  This text uses the secondary text color
                </div>
                <div className="text-disabled" style={{ marginBottom: '8px' }}>
                  This text uses the disabled text color
                </div>
                <div className="status-success" style={{ marginBottom: '8px' }}>
                  This text uses the success color
                </div>
                <div className="status-error" style={{ marginBottom: '8px' }}>
                  This text uses the error color
                </div>
                <div className="status-warning" style={{ marginBottom: '8px' }}>
                  This text uses the warning color
                </div>
                <div className="status-info" style={{ marginBottom: '8px' }}>
                  This text uses the info color
                </div>
              </Box>
              <Box sx={{ mb: 2 }}>
                <div className="bg-default" style={{ padding: '8px', marginBottom: '8px', border: '1px solid var(--color-border-light)' }}>
                  This box uses the default background color
                </div>
                <div className="bg-paper" style={{ padding: '8px', marginBottom: '8px', border: '1px solid var(--color-border-light)' }}>
                  This box uses the paper background color
                </div>
                <div className="bg-light" style={{ padding: '8px', marginBottom: '8px', border: '1px solid var(--color-border-light)' }}>
                  This box uses the light background color
                </div>
                <div className="bg-table-header" style={{ padding: '8px', marginBottom: '8px', border: '1px solid var(--color-border-light)' }}>
                  This box uses the table header background color
                </div>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Using with JavaScript
              </Typography>
              <Box sx={{ mb: 2 }}>
                <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '4px', overflow: 'auto' }}>
                  {`import colorUtils from '../theme/colorUtils';

// Get a color by path
const primaryColor = colorUtils.getColor('primary.500');

// Get a color with alpha transparency
const primaryWithAlpha = colorUtils.getColorWithAlpha('primary.500', 0.5);

// Get a status color
const successColor = colorUtils.getStatusColor('success', 'main');

// Get a communication type color
const simColor = colorUtils.getCommunicationColor('sim', 'main');

// Use with Material-UI
<Box sx={{ backgroundColor: colorUtils.getColor('background.light') }}>
  <Typography sx={{ color: colorUtils.getColor('text.primary') }}>
    Hello World
  </Typography>
</Box>`}
                </pre>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default ColorSystemDemo;
