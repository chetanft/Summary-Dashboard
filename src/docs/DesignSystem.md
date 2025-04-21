# Design System Documentation

## Overview

This document outlines the design system for the TMS Dashboard application. The design system provides a set of reusable components, styles, and patterns to ensure consistency across the application.

## Theme Configuration

The application uses a unified theme configuration defined in `src/theme/unifiedThemeConfig.js`. This configuration includes:

- **Colors**: Primary, secondary, and semantic colors
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation levels
- **Component Overrides**: Default styling for MUI components

### Colors

The color palette is organized into the following categories:

```javascript
palette: {
  primary: {
    main: '#3f51b5',
    light: '#7986cb',
    dark: '#303f9f',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#f50057',
    light: '#ff4081',
    dark: '#c51162',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: '#ffffff',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9e9e9e',
  },
  background: {
    paper: '#ffffff',
    default: '#f5f7fa',
    light: '#f8f9fa',
  },
  divider: '#e0e0e0',
}
```

### Typography

The typography system defines consistent text styles:

```javascript
typography: {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.2,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.2,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.2,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.2,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  body1: {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    textTransform: 'none',
  },
  caption: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
  },
  overline: {
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },
}
```

## Component Library

The component library is organized according to the Atomic Design methodology:

### Atoms

Atoms are the basic building blocks of the interface:

- **StatusBadge**: Displays a status indicator with customizable appearance
- **TrendIndicator**: Shows a trend value with directional indicator
- **Icon**: Displays an icon from the icon registry

### Molecules

Molecules are groups of atoms bonded together:

- **EnhancedMetricCard**: Displays a metric with title, value, trend, and optional icon

### Organisms

Organisms are groups of molecules that form a relatively complex section:

- **StandardTable**: A comprehensive table component with sorting, pagination, selection, and expandable rows

## Component Usage

### EnhancedMetricCard

The EnhancedMetricCard component is used to display KPI metrics with optional trend indicators and charts.

```jsx
import { EnhancedMetricCard } from '../core';

<EnhancedMetricCard
  title="Revenue"
  value={1234.56}
  format="currency"
  trend={5.2}
  icon={AttachMoneyIcon}
  variant="elevated"
  size="medium"
/>
```

#### Props

- `title`: Title of the metric card
- `value`: Primary value to display
- `format`: Format to apply to the value ('currency', 'percentage', 'number', 'decimal')
- `trend`: Optional trend value
- `trendInverse`: Whether to inverse the trend indicator (negative is good, positive is bad)
- `icon`: Optional icon component
- `variant`: Variant of the card ('default', 'outlined', 'filled', 'elevated', 'status')
- `size`: Size of the card ('small', 'medium', 'large')
- `status`: Status for status variant ('success', 'warning', 'error', 'default')
- `tooltip`: Tooltip text
- `chart`: Chart component to display
- `chartHeight`: Height of the chart in pixels
- `onClick`: Function to call when the card is clicked
- `onDrillDown`: Function to call when the drill down button is clicked

### TrendIndicator

The TrendIndicator component is used to display trend values with up/down arrows.

```jsx
import { TrendIndicator } from '../core';

<TrendIndicator value={5.2} />
```

#### Props

- `value`: The trend value to display
- `inverse`: Whether to inverse the trend indicator (negative is good, positive is bad)
- `showIcon`: Whether to show the trend icon
- `size`: Size of the trend indicator ('small', 'medium', 'large')

### StandardTable

The StandardTable component is used to display tabular data with sorting, pagination, and row selection.

```jsx
import { StandardTable } from '../core';

<StandardTable
  columns={[
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'status', label: 'Status', sortable: true, renderCell: (row) => <StatusBadge status={row.status} label={row.statusText} /> }
  ]}
  data={rows}
  onRowClick={handleRowClick}
  selectable
/>
```

#### Props

- `columns`: Columns configuration
- `data`: Data to display in the table
- `initialSortBy`: Initial sort column
- `initialSortDirection`: Initial sort direction ('asc', 'desc')
- `onRowClick`: Function to call when a row is clicked
- `onSelectionChange`: Function to call when selection changes
- `selectable`: Whether rows are selectable
- `loading`: Whether the table is in a loading state
- `pagination`: Whether to show pagination
- `rowsPerPageOptions`: Options for rows per page
- `defaultRowsPerPage`: Default rows per page
- `stickyHeader`: Whether the header is sticky
- `emptyStateMessage`: Message to display when there is no data
- `rowIdField`: Field to use as row ID
- `zebra`: Whether to show zebra striping
- `headerBackgroundColor`: Background color for the header
- `variant`: Variant of the table ('default', 'outlined', 'filled', 'elevated')
- `size`: Size of the table ('small', 'medium', 'large')

### StatusBadge

The StatusBadge component is used to display status indicators.

```jsx
import { StatusBadge } from '../core';

<StatusBadge status="success" label="Completed" />
```

#### Props

- `status`: Status type ('success', 'warning', 'error', 'info', 'default', 'primary', 'secondary')
- `label`: Label to display
- `icon`: Optional icon component to display before the label
- `size`: Size of the badge ('small', 'medium', 'large')
- `variant`: Variant style of the badge ('contained', 'outlined', 'text')

### Icon

The Icon component is used to display icons from the icon registry.

```jsx
import { Icon } from '../core';

<Icon name="Truck" size={16} color="primary" />
```

#### Props

- `name`: Name of the icon in the registry
- `size`: Size of the icon in pixels
- `color`: Color of the icon (theme color, text color, grey color, or CSS color value)

## Best Practices

### Use Theme Colors

Always use theme colors instead of hardcoded color values:

```jsx
// Good
<Box sx={{ color: 'primary.main' }} />

// Bad
<Box sx={{ color: '#3f51b5' }} />
```

### Use Theme Spacing

Use theme spacing instead of hardcoded pixel values:

```jsx
// Good
<Box sx={{ padding: 2 }} /> // 16px (2 * 8px)

// Bad
<Box sx={{ padding: '16px' }} />
```

### Use Typography Variants

Use typography variants instead of custom font styles:

```jsx
// Good
<Typography variant="h4">Title</Typography>

// Bad
<Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Title</Typography>
```

### Use Core Components

Use core components instead of custom implementations:

```jsx
// Good
<EnhancedMetricCard title="Revenue" value={1234.56} format="currency" />

// Bad
<Card>
  <CardContent>
    <Typography variant="h6">Revenue</Typography>
    <Typography variant="h4">$1,234.56</Typography>
  </CardContent>
</Card>
```

## Migration Guide

When migrating from existing components to the new component library:

1. **KPI Cards**: Replace existing KPI card implementations with `EnhancedMetricCard`
2. **Status Indicators**: Replace custom status indicators with `StatusBadge`
3. **Tables**: Replace custom table implementations with `StandardTable`
4. **Trend Indicators**: Replace custom trend indicators with `TrendIndicator`
5. **Icons**: Replace direct Material-UI icon imports with `Icon` component

## Accessibility

The design system is built with accessibility in mind:

- **Color Contrast**: All colors meet WCAG 2.1 AA contrast requirements
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: All components include appropriate ARIA attributes
- **Focus Management**: Focus states are clearly visible

## Responsive Design

The design system supports responsive design:

- **Breakpoints**: The theme includes standard breakpoints for different screen sizes
- **Responsive Components**: Components adapt to different screen sizes
- **Responsive Typography**: Typography scales appropriately for different screen sizes

## Future Enhancements

Planned enhancements for the design system:

- **Dark Mode**: Support for dark mode
- **Theming**: Support for custom themes
- **Animation**: Standardized animation patterns
- **Form Components**: Enhanced form components with validation
- **Data Visualization**: Enhanced data visualization components
