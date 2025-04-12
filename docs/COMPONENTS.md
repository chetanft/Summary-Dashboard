# TMS Dashboard Components

This document provides detailed information about the components used in the TMS Dashboard application.

## Table of Contents

- [Dashboard Components](#dashboard-components)
- [Order Components](#order-components)
- [Alert Components](#alert-components)
- [Authentication Components](#authentication-components)
- [Layout Components](#layout-components)
- [Chart Components](#chart-components)

## Dashboard Components

### Dashboard

The main dashboard component that displays KPIs and charts.

**Props:**
- None

**State:**
- `activeTab`: The currently active tab (summary, orderData, alerts)
- `loading`: Boolean indicating if data is being loaded
- `error`: Error message if data loading fails

**Usage:**
```jsx
<Dashboard />
```

### DashboardHeader

Header component with navigation tabs for the dashboard.

**Props:**
- `title`: The title of the dashboard
- `activeTab`: The currently active tab
- `onTabChange`: Function to handle tab changes

**Usage:**
```jsx
<DashboardHeader 
  title="Summary Dashboard" 
  activeTab="summary" 
  onTabChange={handleTabChange} 
/>
```

### HeroKPI

Large KPI component with a chart.

**Props:**
- `title`: The title of the KPI
- `data`: The data for the KPI, including actual, projected, budget, and chart data

**Usage:**
```jsx
<HeroKPI 
  title="Freight Budget vs Actual" 
  data={kpiData.heroKPI} 
/>
```

### SecondaryKPI

Smaller KPI component for secondary metrics.

**Props:**
- `title`: The title of the KPI
- `value`: The current value of the KPI
- `target`: The target value of the KPI
- `unit`: The unit of measurement (%, INR, etc.)
- `color`: The color of the KPI (green, yellow, red)

**Usage:**
```jsx
<SecondaryKPI 
  title="On-Time Delivery" 
  value="85" 
  target="90" 
  unit="%" 
  color="yellow" 
/>
```

### LineChartKPI

KPI component with a line chart visualization.

**Props:**
- `title`: The title of the KPI
- `value`: The current value of the KPI
- `target`: The target value of the KPI
- `data`: The data for the line chart

**Usage:**
```jsx
<LineChartKPI 
  title="Daily Orders" 
  value="42" 
  target="50" 
  data={dailyOrdersData} 
/>
```

### AlertIndicator

Component that displays alerts requiring attention.

**Props:**
- None (uses context for alert data)

**Usage:**
```jsx
<AlertIndicator />
```

## Order Components

### Orders

Component for listing and managing orders.

**Props:**
- None (uses context for order data)

**State:**
- `searchTerm`: The current search term
- `selectedOrderId`: The ID of the selected order
- `filteredOrders`: The filtered list of orders based on the search term

**Usage:**
```jsx
<Orders />
```

### OrderDetailsPane

Component for displaying detailed information about an order.

**Props:**
- `order`: The order object to display
- `timeline`: The timeline data for the order
- `comments`: The comments data for the order
- `onClose`: Function to handle closing the pane
- `onPrevious`: Function to navigate to the previous order
- `onNext`: Function to navigate to the next order

**State:**
- `tabValue`: The currently active tab (details, timeline, comments)

**Usage:**
```jsx
<OrderDetailsPane 
  order={selectedOrder}
  timeline={selectedTimeline}
  comments={selectedComments}
  onClose={handleClosePane}
  onPrevious={handlePreviousOrder}
  onNext={handleNextOrder}
/>
```

### OrderDetailsTab

Component for displaying basic order information.

**Props:**
- `order`: The order object to display

**Usage:**
```jsx
<OrderDetailsTab order={selectedOrder} />
```

### OrderTimelineTab

Component for visualizing the journey of an order.

**Props:**
- `timeline`: The timeline data for the order

**Usage:**
```jsx
<OrderTimelineTab timeline={selectedTimeline} />
```

### OrderCommentsTab

Component for displaying and adding comments to an order.

**Props:**
- `comments`: The comments data for the order

**Usage:**
```jsx
<OrderCommentsTab comments={selectedComments} />
```

## Alert Components

### Alerts

Component for listing and managing alerts.

**Props:**
- None (uses context for alert data)

**State:**
- `searchTerm`: The current search term
- `selectedSeverity`: The selected severity filter
- `selectedType`: The selected type filter
- `selectedStatus`: The selected status filter
- `selectedAlertId`: The ID of the selected alert
- `filteredAlerts`: The filtered list of alerts based on the filters

**Usage:**
```jsx
<Alerts />
```

### AlertDetailsPane

Component for displaying detailed information about an alert.

**Props:**
- `alert`: The alert object to display
- `onClose`: Function to handle closing the pane
- `onPrevious`: Function to navigate to the previous alert
- `onNext`: Function to navigate to the next alert

**Usage:**
```jsx
<AlertDetailsPane 
  alert={selectedAlert}
  onClose={handleClosePane}
  onPrevious={handlePreviousAlert}
  onNext={handleNextAlert}
/>
```

## Authentication Components

### Login

Component for user authentication.

**Props:**
- None

**State:**
- `email`: The user's email
- `password`: The user's password
- `role`: The selected user role
- `error`: Error message if login fails

**Usage:**
```jsx
<Login />
```

### ProtectedRoute

Component for protecting routes based on authentication.

**Props:**
- `children`: The components to render if authenticated

**Usage:**
```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

## Layout Components

### Layout

Main layout component for the application.

**Props:**
- `children`: The components to render within the layout
- `onRefresh`: Function to handle data refresh

**Usage:**
```jsx
<Layout onRefresh={handleRefresh}>
  <Dashboard />
</Layout>
```

### Header

Header component for the application.

**Props:**
- `onRefresh`: Function to handle data refresh

**Usage:**
```jsx
<Header onRefresh={handleRefresh} />
```

## Chart Components

### AreaChartComponent

Component for rendering area charts.

**Props:**
- `data`: The data for the chart
- `xKey`: The key for the x-axis
- `yKey`: The key for the y-axis
- `color`: The color of the area

**Usage:**
```jsx
<AreaChartComponent 
  data={chartData} 
  xKey="month" 
  yKey="value" 
  color="#1976d2" 
/>
```

### BarChartComponent

Component for rendering bar charts.

**Props:**
- `data`: The data for the chart
- `xKey`: The key for the x-axis
- `yKey`: The key for the y-axis
- `color`: The color of the bars

**Usage:**
```jsx
<BarChartComponent 
  data={chartData} 
  xKey="month" 
  yKey="value" 
  color="#1976d2" 
/>
```

### LineChartComponent

Component for rendering line charts.

**Props:**
- `data`: The data for the chart
- `xKey`: The key for the x-axis
- `yKey`: The key for the y-axis
- `color`: The color of the line

**Usage:**
```jsx
<LineChartComponent 
  data={chartData} 
  xKey="month" 
  yKey="value" 
  color="#1976d2" 
/>
```

### CompositeChartComponent

Component for rendering composite charts (combination of bar, line, and area).

**Props:**
- `data`: The data for the chart
- `bars`: Configuration for bar charts
- `lines`: Configuration for line charts
- `areas`: Configuration for area charts

**Usage:**
```jsx
<CompositeChartComponent 
  data={chartData} 
  bars={[{ dataKey: 'value', fill: '#1976d2' }]}
  lines={[{ dataKey: 'target', stroke: '#dc004e' }]}
  areas={[{ dataKey: 'projected', fill: '#f5f5f5' }]}
/>
```

### SparklineChart

Component for rendering small sparkline charts.

**Props:**
- `data`: The data for the chart
- `color`: The color of the sparkline

**Usage:**
```jsx
<SparklineChart 
  data={sparklineData} 
  color="#1976d2" 
/>
```
