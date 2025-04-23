# KpiCard Component Documentation

## Overview

The `KpiCard` component is a reusable component for displaying KPI data in a card format. It provides a consistent layout for KPI cards across the application.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `title` | React.ReactNode | Card title | - |
| `action` | React.ReactNode | Action component (e.g., drill-down button) | - |
| `children` | React.ReactNode | Card content | - |
| `sx` | Object | Additional styles | `{}` |

## Usage

```jsx
import KpiCard from './KpiCard';
import { Typography, IconButton, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const MyComponent = () => {
  return (
    <KpiCard
      title={
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" color="text.secondary">
            Total Orders
          </Typography>
          <IconButton size="small">
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      }
      action={
        <IconButton size="small" onClick={() => console.log('Drill down')}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      }
    >
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
            1000
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#FF3533' }}>
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              +4%
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Additional content */}
    </KpiCard>
  );
};
```

## Styling

The `KpiCard` component uses the following default styles:

- Padding: 24px (3 in MUI spacing)
- Border radius: 8px
- Height: 100%
- Display: flex
- Flex direction: column

You can override these styles by passing a `sx` prop to the component.

## Layout

The `KpiCard` component has the following layout:

1. **Header**: Contains the title and action components.
2. **Content**: Contains the children components.

The header is displayed as a flex container with space between the title and action components. The content is displayed as a flex container with flex-grow: 1 to fill the remaining space.

## Best Practices

1. **Title**: Use a consistent title format across all KPI cards. Typically, this includes a title text and an info icon.
2. **Action**: Use a consistent action format across all KPI cards. Typically, this is an arrow icon that opens a drill-down dialog.
3. **Content**: Structure the content in a consistent way across all KPI cards. Typically, this includes a main value, a trend indicator, and a chart or breakdown.
4. **Styling**: Use consistent styling across all KPI cards. This helps create a cohesive look and feel across the application.

## Example

```jsx
<KpiCard
  title={
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="subtitle1" color="text.secondary">
        Total Orders
      </Typography>
      <Tooltip title="Total number of orders in the system">
        <IconButton size="small">
          <InfoOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  }
  action={
    <IconButton size="small" onClick={() => onKPIClick && onKPIClick('total-orders', totalOrders)}>
      <ArrowForwardIcon fontSize="small" />
    </IconButton>
  }
>
  <Box sx={{ mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
        {totalOrders.value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, color: '#FF3533' }}>
        <Typography variant="body2" sx={{ ml: 0.5 }}>
          +{totalOrders.trendValue}%
        </Typography>
      </Box>
    </Box>
  </Box>
  
  <Grid container spacing={2}>
    <Grid item xs={4}>
      <Typography variant="body2" color="text.secondary">
        Partially Planned
      </Typography>
      <Typography variant="h6">
        {totalOrders.breakdown.partiallyPlanned.value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        ({totalOrders.breakdown.partiallyPlanned.percentage}%)
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography variant="body2" color="text.secondary">
        Unplanned
      </Typography>
      <Typography variant="h6">
        {totalOrders.breakdown.unplanned.value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        ({totalOrders.breakdown.unplanned.percentage}%)
      </Typography>
    </Grid>
    <Grid item xs={4}>
      <Typography variant="body2" color="text.secondary">
        Planned
      </Typography>
      <Typography variant="h6">
        {totalOrders.breakdown.planned.value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        ({totalOrders.breakdown.planned.percentage}%)
      </Typography>
    </Grid>
  </Grid>
  
  <Box sx={{ height: '150px', mt: 2 }}>
    <LineChartComponent
      data={totalOrders.trendChart}
      lines={[{ dataKey: 'value', color: '#FF3533', strokeWidth: 2 }]}
      xAxisKey="month"
      showGrid={true}
      height="100%"
    />
  </Box>
</KpiCard>
```
