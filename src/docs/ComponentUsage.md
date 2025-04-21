# Component Usage Guide

This guide provides examples of how to use the core components in the TMS Dashboard application.

## Table of Contents

1. [EnhancedMetricCard](#enhancedmetriccard)
2. [TrendIndicator](#trendindicator)
3. [StandardTable](#standardtable)
4. [StatusBadge](#statusbadge)
5. [Icon](#icon)
6. [Common Patterns](#common-patterns)

## EnhancedMetricCard

The `EnhancedMetricCard` component is used to display KPI metrics with optional trend indicators and charts.

### Basic Usage

```jsx
import { EnhancedMetricCard } from '../core';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function RevenueCard() {
  return (
    <EnhancedMetricCard
      title="Revenue"
      value={1234.56}
      format="currency"
      trend={5.2}
      icon={AttachMoneyIcon}
    />
  );
}
```

### With Chart

```jsx
import { EnhancedMetricCard } from '../core';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LineChart from '../charts/LineChart';

function RevenueCardWithChart() {
  const chartData = [
    { date: '2023-01', value: 1000 },
    { date: '2023-02', value: 1200 },
    { date: '2023-03', value: 1100 },
    { date: '2023-04', value: 1300 },
  ];

  return (
    <EnhancedMetricCard
      title="Revenue"
      value={1300}
      format="currency"
      trend={8.3}
      icon={AttachMoneyIcon}
      chart={<LineChart data={chartData} />}
      chartHeight={200}
    />
  );
}
```

### With Drill Down

```jsx
import { EnhancedMetricCard } from '../core';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function VehicleUtilizationCard() {
  const handleDrillDown = (kpi) => {
    console.log('Drill down clicked for', kpi);
    // Open drill down view
  };

  return (
    <EnhancedMetricCard
      title="Vehicle Utilization"
      value={84}
      format="percentage"
      trend={-2.5}
      trendInverse={true} // Lower is worse for this metric
      icon={LocalShippingIcon}
      onDrillDown={() => handleDrillDown('vehicle_utilization')}
    />
  );
}
```

### Variants

```jsx
import { Grid } from '@mui/material';
import { EnhancedMetricCard } from '../core';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function MetricCardVariants() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Default Variant"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          variant="default"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Outlined Variant"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Filled Variant"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          variant="filled"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Elevated Variant"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          variant="elevated"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Status Variant"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          variant="status"
          status="success"
        />
      </Grid>
    </Grid>
  );
}
```

### Sizes

```jsx
import { Grid } from '@mui/material';
import { EnhancedMetricCard } from '../core';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function MetricCardSizes() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Small Size"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Medium Size"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          size="medium"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <EnhancedMetricCard
          title="Large Size"
          value={1234.56}
          format="currency"
          trend={5.2}
          icon={AttachMoneyIcon}
          size="large"
        />
      </Grid>
    </Grid>
  );
}
```

## TrendIndicator

The `TrendIndicator` component is used to display trend values with up/down arrows.

### Basic Usage

```jsx
import { TrendIndicator } from '../core';

function TrendExample() {
  return (
    <div>
      <TrendIndicator value={5.2} />
      <TrendIndicator value={-3.1} />
      <TrendIndicator value={0} />
    </div>
  );
}
```

### Inverse Trend

For metrics where lower is better (e.g., error rates, costs):

```jsx
import { TrendIndicator } from '../core';

function InverseTrendExample() {
  return (
    <div>
      <TrendIndicator value={5.2} inverse={true} /> {/* Bad trend */}
      <TrendIndicator value={-3.1} inverse={true} /> {/* Good trend */}
    </div>
  );
}
```

### Sizes

```jsx
import { TrendIndicator } from '../core';

function TrendSizesExample() {
  return (
    <div>
      <TrendIndicator value={5.2} size="small" />
      <TrendIndicator value={5.2} size="medium" />
      <TrendIndicator value={5.2} size="large" />
    </div>
  );
}
```

## StandardTable

The `StandardTable` component is used to display tabular data with sorting, pagination, and row selection.

### Basic Usage

```jsx
import { StandardTable, StatusBadge } from '../core';

function BasicTable() {
  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'status', label: 'Status', sortable: true, 
      renderCell: (row) => (
        <StatusBadge 
          status={row.status} 
          label={row.statusText} 
        />
      )
    },
    { id: 'date', label: 'Date', sortable: true },
  ];

  const data = [
    { id: 1, name: 'John Doe', status: 'success', statusText: 'Active', date: '2023-01-01' },
    { id: 2, name: 'Jane Smith', status: 'warning', statusText: 'Pending', date: '2023-01-02' },
    { id: 3, name: 'Bob Johnson', status: 'error', statusText: 'Inactive', date: '2023-01-03' },
  ];

  return (
    <StandardTable
      columns={columns}
      data={data}
      initialSortBy="id"
      initialSortDirection="asc"
    />
  );
}
```

### With Selection

```jsx
import { useState } from 'react';
import { StandardTable, StatusBadge } from '../core';

function SelectableTable() {
  const [selected, setSelected] = useState([]);

  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'status', label: 'Status', sortable: true, 
      renderCell: (row) => (
        <StatusBadge 
          status={row.status} 
          label={row.statusText} 
        />
      )
    },
  ];

  const data = [
    { id: 1, name: 'John Doe', status: 'success', statusText: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'warning', statusText: 'Pending' },
    { id: 3, name: 'Bob Johnson', status: 'error', statusText: 'Inactive' },
  ];

  const handleSelectionChange = (newSelected) => {
    setSelected(newSelected);
    console.log('Selected rows:', newSelected);
  };

  return (
    <StandardTable
      columns={columns}
      data={data}
      selectable={true}
      onSelectionChange={handleSelectionChange}
    />
  );
}
```

### With Row Click

```jsx
import { StandardTable } from '../core';

function ClickableTable() {
  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  const handleRowClick = (row) => {
    console.log('Row clicked:', row);
    // Navigate to detail page or open modal
  };

  return (
    <StandardTable
      columns={columns}
      data={data}
      onRowClick={handleRowClick}
      highlightOnHover={true}
    />
  );
}
```

### Variants and Sizes

```jsx
import { StandardTable } from '../core';

function TableVariantsAndSizes() {
  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
  ];

  const data = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  return (
    <div>
      <h3>Outlined Small</h3>
      <StandardTable
        columns={columns}
        data={data}
        variant="outlined"
        size="small"
      />

      <h3>Filled Medium</h3>
      <StandardTable
        columns={columns}
        data={data}
        variant="filled"
        size="medium"
      />

      <h3>Elevated Large</h3>
      <StandardTable
        columns={columns}
        data={data}
        variant="elevated"
        size="large"
      />
    </div>
  );
}
```

## StatusBadge

The `StatusBadge` component is used to display status indicators.

### Basic Usage

```jsx
import { StatusBadge } from '../core';

function StatusBadgeExample() {
  return (
    <div>
      <StatusBadge status="success" label="Completed" />
      <StatusBadge status="warning" label="Pending" />
      <StatusBadge status="error" label="Failed" />
      <StatusBadge status="info" label="In Progress" />
      <StatusBadge status="default" label="Unknown" />
    </div>
  );
}
```

### With Icons

```jsx
import { StatusBadge } from '../core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

function StatusBadgeWithIconsExample() {
  return (
    <div>
      <StatusBadge status="success" label="Completed" icon={CheckCircleIcon} />
      <StatusBadge status="warning" label="Pending" icon={WarningIcon} />
      <StatusBadge status="error" label="Failed" icon={ErrorIcon} />
      <StatusBadge status="info" label="In Progress" icon={InfoIcon} />
    </div>
  );
}
```

### Variants and Sizes

```jsx
import { StatusBadge } from '../core';

function StatusBadgeVariantsAndSizesExample() {
  return (
    <div>
      <h3>Contained</h3>
      <StatusBadge status="success" label="Small" size="small" variant="contained" />
      <StatusBadge status="success" label="Medium" size="medium" variant="contained" />
      <StatusBadge status="success" label="Large" size="large" variant="contained" />

      <h3>Outlined</h3>
      <StatusBadge status="warning" label="Small" size="small" variant="outlined" />
      <StatusBadge status="warning" label="Medium" size="medium" variant="outlined" />
      <StatusBadge status="warning" label="Large" size="large" variant="outlined" />

      <h3>Text</h3>
      <StatusBadge status="error" label="Small" size="small" variant="text" />
      <StatusBadge status="error" label="Medium" size="medium" variant="text" />
      <StatusBadge status="error" label="Large" size="large" variant="text" />
    </div>
  );
}
```

## Icon

The `Icon` component is used to display icons from the icon registry.

### Basic Usage

```jsx
import { Icon } from '../core';

function IconExample() {
  return (
    <div>
      <Icon name="Truck" size={24} />
      <Icon name="Package" size={24} />
      <Icon name="User" size={24} />
    </div>
  );
}
```

### With Colors

```jsx
import { Icon } from '../core';

function IconColorsExample() {
  return (
    <div>
      <Icon name="Truck" size={24} color="primary" />
      <Icon name="Truck" size={24} color="secondary" />
      <Icon name="Truck" size={24} color="success" />
      <Icon name="Truck" size={24} color="error" />
      <Icon name="Truck" size={24} color="warning" />
      <Icon name="Truck" size={24} color="info" />
      <Icon name="Truck" size={24} color="text.primary" />
      <Icon name="Truck" size={24} color="text.secondary" />
      <Icon name="Truck" size={24} color="grey.500" />
      <Icon name="Truck" size={24} color="#ff0000" />
    </div>
  );
}
```

## Common Patterns

### KPI Dashboard

```jsx
import { Grid } from '@mui/material';
import { EnhancedMetricCard } from '../core';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function KPIDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <EnhancedMetricCard
          title="Total Journeys"
          value={1234}
          format="number"
          trend={5.2}
          icon={LocalShippingIcon}
          variant="elevated"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <EnhancedMetricCard
          title="Revenue"
          value={1234567}
          format="currency"
          trend={8.3}
          icon={AttachMoneyIcon}
          variant="elevated"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <EnhancedMetricCard
          title="Avg. Delivery Time"
          value={4.5}
          secondaryValue="days"
          trend={-2.1}
          trendInverse={true}
          icon={AccessTimeIcon}
          variant="elevated"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <EnhancedMetricCard
          title="On-Time Delivery"
          value={92.5}
          format="percentage"
          trend={3.7}
          icon={CheckCircleIcon}
          variant="elevated"
        />
      </Grid>
    </Grid>
  );
}
```

### Data Table with Actions

```jsx
import { useState } from 'react';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { StandardTable, StatusBadge, Icon } from '../core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DataTableWithActions() {
  const [selected, setSelected] = useState([]);

  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'status', label: 'Status', sortable: true, 
      renderCell: (row) => (
        <StatusBadge 
          status={row.status} 
          label={row.statusText} 
        />
      )
    },
    { id: 'actions', label: 'Actions', align: 'center',
      renderCell: (row) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    },
  ];

  const data = [
    { id: 1, name: 'John Doe', status: 'success', statusText: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'warning', statusText: 'Pending' },
    { id: 3, name: 'Bob Johnson', status: 'error', statusText: 'Inactive' },
  ];

  const handleSelectionChange = (newSelected) => {
    setSelected(newSelected);
  };

  const handleEdit = (row) => {
    console.log('Edit row:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete:', selected);
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        {selected.length > 0 && (
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={handleBulkDelete}
          >
            Delete Selected ({selected.length})
          </Button>
        )}
      </Box>
      <StandardTable
        columns={columns}
        data={data}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        variant="outlined"
      />
    </Box>
  );
}
```

### Status Timeline

```jsx
import { Box, Paper, Typography, Divider } from '@mui/material';
import { StatusBadge, Icon } from '../core';

function StatusTimeline() {
  const events = [
    { id: 1, status: 'success', label: 'Order Created', timestamp: '2023-01-01 09:00', icon: 'ShoppingCart' },
    { id: 2, status: 'success', label: 'Payment Received', timestamp: '2023-01-01 09:15', icon: 'CreditCard' },
    { id: 3, status: 'success', label: 'Order Processed', timestamp: '2023-01-01 10:30', icon: 'Package' },
    { id: 4, status: 'warning', label: 'In Transit', timestamp: '2023-01-02 08:45', icon: 'Truck' },
    { id: 5, status: 'error', label: 'Delivery Delayed', timestamp: '2023-01-03 14:20', icon: 'Clock' },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Order Timeline</Typography>
      <Box sx={{ mt: 2 }}>
        {events.map((event, index) => (
          <Box key={event.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
              <Box sx={{ mr: 2 }}>
                <Icon name={event.icon} size={24} color={`${event.status}.main`} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">{event.label}</Typography>
                  <StatusBadge status={event.status} label={event.status} size="small" />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {event.timestamp}
                </Typography>
              </Box>
            </Box>
            {index < events.length - 1 && (
              <Box sx={{ ml: 3, borderLeft: '1px dashed', borderColor: 'divider', height: 20 }} />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
```
