# Color Style Guide

This document provides guidelines for using colors in the TMS Dashboard application.

## Color Palette

The TMS Dashboard uses a comprehensive color palette defined in `colors.json`. The palette includes:

- **Primary Colors**: Blue shades used for primary actions, buttons, and links
- **Secondary Colors**: Neutral shades used for text, backgrounds, and borders
- **Status Colors**: Colors for success, error, warning, and info states
- **Text Colors**: Colors for different text elements
- **Background Colors**: Colors for different background elements
- **Border Colors**: Colors for borders and dividers
- **Action Colors**: Colors for interactive elements
- **Communication Colors**: Colors for different communication types

## Using Colors in JavaScript/React

### Import the Color Utilities

```jsx
import colorUtils from '../theme/colorUtils';
```

### Get a Color by Path

```jsx
// Get a color by path
const primaryColor = colorUtils.getColor('primary.500'); // #0066FF
const textColor = colorUtils.getColor('text.primary'); // #434F64
```

### Get a Color with Alpha Transparency

```jsx
// Get a color with alpha transparency
const primaryWithAlpha = colorUtils.getColorWithAlpha('primary.500', 0.5); // rgba(0, 102, 255, 0.5)
```

### Get a Status Color

```jsx
// Get a status color
const successColor = colorUtils.getStatusColor('success', 'main'); // #00C638
const errorLight = colorUtils.getStatusColor('error', 'light'); // #FFEBEA
```

### Get a Communication Type Color

```jsx
// Get a communication type color
const simColor = colorUtils.getCommunicationColor('sim', 'main'); // #319795
const gpsLight = colorUtils.getCommunicationColor('gps', 'light'); // #F0FFF4
```

### Using with Material-UI

```jsx
import { Box, Typography } from '@mui/material';
import colorUtils from '../theme/colorUtils';

const MyComponent = () => {
  return (
    <Box sx={{
      backgroundColor: colorUtils.getColor('background.light'),
      border: `1px solid ${colorUtils.getColor('border.light')}`,
      padding: 2
    }}>
      <Typography sx={{ color: colorUtils.getColor('text.primary') }}>
        Hello World
      </Typography>
    </Box>
  );
};
```

## Using Colors in CSS

### Import the CSS Variables

```css
@import '../theme/colors.css';
```

### Using CSS Variables

```css
.my-element {
  color: var(--color-text-primary);
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border-light);
}
```

### Using CSS Classes

```html
<div class="bg-light">
  <p class="text-primary">Hello World</p>
  <span class="status-success">Success</span>
</div>
```

## Color Usage Guidelines

### Text Colors

- Use `text.primary` for main content text
- Use `text.secondary` for secondary text, labels, and placeholders
- Use `text.disabled` for disabled text
- Use `text.dark` for headings and important text
- Use `text.medium` for subheadings
- Use `text.light` for less important text

### Status Colors

- Use `status.success` for success messages, completed actions, and positive indicators
- Use `status.error` for error messages, failed actions, and negative indicators
- Use `status.warning` for warning messages and cautionary indicators
- Use `status.info` for informational messages and neutral indicators

### Background Colors

- Use `background.default` for the main application background
- Use `background.paper` for cards, dialogs, and other elevated elements
- Use `background.light` for secondary backgrounds
- Use `background.table.header` for table headers

### Border Colors

- Use `border.light` for light borders
- Use `border.medium` for medium borders
- Use `border.default` for default borders

## Color Accessibility

Ensure sufficient contrast between text and background colors to maintain readability. The following combinations provide good contrast:

- `text.primary` on `background.paper` or `background.light`
- `text.secondary` on `background.paper`
- `text.dark` on `background.light` or `background.paper`
- White text on `primary.500`, `primary.600`, or `primary.700`

## Updating Colors

To update the color palette:

1. Edit the `colors.json` file
2. Update the CSS variables in `colors.css` if necessary
3. Document any changes in this guide

## Color Reference

### Primary Colors

| Name | Hex Code | Description |
|------|----------|-------------|
| primary.main | #434F64 | Main dark color, used for primary actions |
| primary.light | #5F697B | Light dark color, used for secondary actions |
| primary.dark | #2D3748 | Dark dark color, used for hover states |

### Status Colors

| Name | Hex Code | Description |
|------|----------|-------------|
| status.success.main | #00C638 | Green, used for success states |
| status.success.light | #DFFFEA | Light green, used for success backgrounds |
| status.success.dark | #00763D | Dark green |
| status.error.main | #FF3533 | Red, used for error states |
| status.error.light | #FFEBEA | Light red, used for error backgrounds |
| status.error.dark | #B80100 | Dark red |
| status.warning.main | #FF6C19 | Orange, used for warning states |
| status.warning.light | #FFEBDC | Light orange, used for warning backgrounds |
| status.warning.dark | #DD6A00 | Dark orange |
| status.info.main | #4299E1 | Blue, used for info states |
| status.info.light | rgba(66, 153, 225, 0.1) | Light blue, used for info backgrounds |
| status.info.dark | #3182CE | Dark blue |
