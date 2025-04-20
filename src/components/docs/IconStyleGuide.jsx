import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Icon from '../common/Icon';

/**
 * Icon Style Guide component that documents icon usage guidelines
 */
const IconStyleGuide = () => {
  // Common icon sizes
  const iconSizes = [
    { name: 'Small', size: 16, description: 'For small UI elements, badges, and tight spaces' },
    { name: 'Medium', size: 20, description: 'Default size for most UI elements' },
    { name: 'Large', size: 24, description: 'For buttons, headers, and emphasized UI elements' },
    { name: 'Extra Large', size: 32, description: 'For featured elements and illustrations' },
  ];

  // Common icon colors
  const iconColors = [
    { name: 'Primary', color: '#1976D2', description: 'For primary actions and navigation' },
    { name: 'Secondary', color: '#9C27B0', description: 'For secondary actions and emphasis' },
    { name: 'Success', color: '#00763D', description: 'For success states and confirmations' },
    { name: 'Warning', color: '#FF6C19', description: 'For warning states and alerts' },
    { name: 'Error', color: '#FF3533', description: 'For error states and critical actions' },
    { name: 'Info', color: '#0288D1', description: 'For informational elements' },
    { name: 'Default', color: '#434F64', description: 'For general UI elements' },
    { name: 'Muted', color: '#8A94A6', description: 'For disabled or less important elements' },
  ];

  // Common icon stroke widths
  const iconStrokeWidths = [
    { width: 1, description: 'For lighter, more delicate appearance' },
    { width: 1.5, description: 'For standard UI elements' },
    { width: 2, description: 'Default stroke width, for most UI elements' },
    { width: 2.5, description: 'For emphasis and better visibility' },
    { width: 3, description: 'For strong emphasis and high contrast' },
  ];

  // Common icon usage patterns
  const iconUsagePatterns = [
    {
      name: 'Navigation',
      icon: 'Menu',
      description: 'Used in navigation menus, sidebars, and headers',
      example: <Icon name="Menu" size={20} />,
    },
    {
      name: 'Action',
      icon: 'Plus',
      description: 'Used for actions like add, create, or edit',
      example: <Icon name="Plus" size={20} />,
    },
    {
      name: 'Status',
      icon: 'CheckCircle',
      description: 'Used to indicate status like success, warning, or error',
      example: <Icon name="CheckCircle" size={20} color="#00763D" />,
    },
    {
      name: 'Toggle',
      icon: 'ChevronDown',
      description: 'Used for expandable/collapsible elements',
      example: <Icon name="ChevronDown" size={20} />,
    },
    {
      name: 'Notification',
      icon: 'Bell',
      description: 'Used for notifications and alerts',
      example: <Icon name="Bell" size={20} />,
    },
    {
      name: 'Feedback',
      icon: 'AlertTriangle',
      description: 'Used for user feedback and system messages',
      example: <Icon name="AlertTriangle" size={20} color="#FF6C19" />,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Icon Style Guide
      </Typography>
      
      <Typography variant="body1" paragraph>
        This style guide provides guidelines for using icons consistently throughout the application.
        We use Lucide icons as our primary icon set, with Material UI icons as a fallback for backward compatibility.
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Icon Sizes
        </Typography>
        
        <Typography variant="body2" paragraph>
          Use consistent icon sizes based on the context and importance of the icon.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {iconSizes.map((item) => (
            <Grid item xs={6} sm={3} key={item.name}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Icon name="Settings" size={item.size} sx={{ mb: 1 }} />
                <Typography variant="subtitle2">{item.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.size}px
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>Pixels</TableCell>
                <TableCell>Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iconSizes.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.size}px</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Icon Colors
        </Typography>
        
        <Typography variant="body2" paragraph>
          Use consistent icon colors based on the context and meaning of the icon.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {iconColors.map((item) => (
            <Grid item xs={6} sm={3} key={item.name}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Icon name="Circle" size={24} color={item.color} sx={{ mb: 1 }} />
                <Typography variant="subtitle2">{item.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.color}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>Hex</TableCell>
                <TableCell>Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iconColors.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Icon Stroke Width
        </Typography>
        
        <Typography variant="body2" paragraph>
          Lucide icons support customizable stroke width. Use consistent stroke width based on the context and importance of the icon.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {iconStrokeWidths.map((item) => (
            <Grid item xs={6} sm={2.4} key={item.width}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Icon name="Settings" size={24} strokeWidth={item.width} sx={{ mb: 1 }} />
                <Typography variant="subtitle2">Stroke {item.width}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Stroke Width</TableCell>
                <TableCell>Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iconStrokeWidths.map((item) => (
                <TableRow key={item.width}>
                  <TableCell>{item.width}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Icon Usage Patterns
        </Typography>
        
        <Typography variant="body2" paragraph>
          Use icons consistently based on their meaning and context.
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pattern</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iconUsagePatterns.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.icon}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.example}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Best Practices
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          Do:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">
              Use icons consistently across the application
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Use icons to enhance, not replace, text labels (except in well-established patterns)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Use appropriate icon sizes based on the context
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Use color to reinforce meaning, not as the only indicator
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Ensure sufficient contrast between icon and background
            </Typography>
          </li>
        </ul>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>
          Don't:
        </Typography>
        <ul>
          <li>
            <Typography variant="body2">
              Use too many icons in a single view, which can create visual noise
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Use icons that don't clearly communicate their meaning
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Mix icon styles (stick to Lucide icons)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Use icons that are too small to be recognizable
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Overuse decorative icons that don't add functional value
            </Typography>
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default IconStyleGuide;
