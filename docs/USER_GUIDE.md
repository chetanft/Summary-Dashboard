# TMS Dashboard User Guide

This guide provides instructions for using the TMS Dashboard application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Accessing the Dashboard](#accessing-the-dashboard)
  - [Logging In](#logging-in)
  - [Dashboard Overview](#dashboard-overview)
- [Summary Dashboard](#summary-dashboard)
  - [Key Performance Indicators](#key-performance-indicators)
  - [Charts and Visualizations](#charts-and-visualizations)
  - [Data Filtering](#data-filtering)
- [Order Management](#order-management)
  - [Viewing Orders](#viewing-orders)
  - [Order Details](#order-details)
  - [Order Timeline](#order-timeline)
  - [Order Comments](#order-comments)
- [Alerts](#alerts)
  - [Viewing Alerts](#viewing-alerts)
  - [Alert Details](#alert-details)
  - [Acknowledging Alerts](#acknowledging-alerts)
  - [Resolving Alerts](#resolving-alerts)
- [User Settings](#user-settings)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Getting Started

### Accessing the Dashboard

The TMS Dashboard is accessible at the following URL:

```
https://tms-dashboard.example.com
```

### Logging In

1. Navigate to the dashboard URL
2. Enter your email and password
3. Select your role (CXO, Company User, or Branch User)
4. Click the "Login" button

For testing purposes, you can use the following credentials:

- CXO: `cxo@example.com` / `password`
- Company User: `company@example.com` / `password`
- Branch User: `branch@example.com` / `password`

### Dashboard Overview

The TMS Dashboard is organized into three main sections:

1. **Summary**: Overview of key performance indicators
2. **Order Data**: Detailed view of orders and their status
3. **Alerts**: Operational alerts requiring attention

Use the navigation tabs at the top of the dashboard to switch between these sections.

## Summary Dashboard

The Summary Dashboard provides an overview of key performance indicators (KPIs) and visualizations.

### Key Performance Indicators

The dashboard displays several KPIs:

- **Freight Budget vs Actual**: Comparison of budgeted and actual freight costs
- **On-Time Delivery**: Percentage of deliveries completed on time
- **Avg. Cost per KM**: Average cost per kilometer
- **Vehicle Utilization**: Percentage of vehicle capacity utilized
- **Fuel Efficiency**: Average fuel efficiency in kilometers per liter
- **Daily Orders**: Number of orders processed daily
- **Delivery Exceptions**: Number of delivery exceptions
- **Avg. Transit Time**: Average time taken for transit
- **Customer Satisfaction**: Average customer satisfaction rating

Each KPI is color-coded to indicate performance:
- Green: Meeting or exceeding target
- Yellow: Slightly below target
- Red: Significantly below target

### Charts and Visualizations

The dashboard includes various charts and visualizations:

- **Bar Charts**: For comparing values across categories
- **Line Charts**: For showing trends over time
- **Area Charts**: For showing cumulative values over time
- **Sparklines**: For showing trends in a compact format

Hover over chart elements to see detailed information.

### Data Filtering

You can filter the dashboard data using the following controls:

1. **Date Range Selector**: Filter data by date range
2. **Timeframe Selector**: View data by day, week, month, or year
3. **Refresh Button**: Refresh the dashboard data

## Order Management

The Order Management section allows you to view and manage orders.

### Viewing Orders

1. Click the "Order Data" tab in the dashboard header
2. The orders table displays all orders with key information
3. Use the search box to find specific orders
4. Click on column headers to sort the table

### Order Details

To view detailed information about an order:

1. Click the "View Details" button on an order row
2. The order details pane will open on the right side
3. The details tab shows basic order information, including:
   - SO Number, weight, cost, etc.
   - Sender, Ship To, and Bill To information
   - Current status and next milestone
   - Generated IDs for each milestone

### Order Timeline

To view the timeline of an order:

1. Open the order details pane
2. Click the "Timeline" tab
3. The timeline shows all events in the order's journey
4. Click on timeline events to see more details

### Order Comments

To view and add comments to an order:

1. Open the order details pane
2. Click the "Comments" tab
3. View existing comments
4. Add a new comment using the comment form at the bottom

## Alerts

The Alerts section allows you to view and manage operational alerts.

### Viewing Alerts

1. Click the "Alerts" tab in the dashboard header
2. The alerts table displays all alerts with key information
3. Use the search box to find specific alerts
4. Use the filters to filter alerts by severity, type, and status

### Alert Details

To view detailed information about an alert:

1. Click the "View" button on an alert row
2. The alert details pane will open on the right side
3. The details pane shows:
   - Alert title and description
   - Severity, type, and status
   - Created and updated timestamps
   - Assigned user
   - Related order
   - Available actions

### Acknowledging Alerts

To acknowledge an alert:

1. Open the alert details pane
2. Click the "Acknowledge" button
3. The alert status will change to "Acknowledged"
4. The alert will be assigned to you

### Resolving Alerts

To resolve an alert:

1. Open the alert details pane
2. Click the "Resolve" button
3. Enter resolution details if prompted
4. The alert status will change to "Resolved"

## User Settings

To access user settings:

1. Click on your profile icon in the top-right corner
2. Select "Settings" from the dropdown menu
3. Update your profile information
4. Change your password
5. Configure notification preferences
6. Click "Save" to apply changes

## Troubleshooting

### Common Issues

#### Dashboard Not Loading

If the dashboard is not loading:

1. Check your internet connection
2. Clear your browser cache
3. Try logging out and logging back in
4. Contact support if the issue persists

#### Data Not Refreshing

If the dashboard data is not refreshing:

1. Click the refresh button in the dashboard header
2. Check your internet connection
3. Try logging out and logging back in
4. Contact support if the issue persists

#### Unable to View Order Details

If you cannot view order details:

1. Check if you have the necessary permissions
2. Try refreshing the page
3. Contact support if the issue persists

## FAQ

### General Questions

**Q: How often is the dashboard data updated?**

A: The dashboard data is updated in real-time. You can also manually refresh the data using the refresh button.

**Q: Can I export data from the dashboard?**

A: Yes, you can export data from the dashboard by clicking the export button in the top-right corner of each section.

**Q: How do I change my password?**

A: You can change your password by clicking on your profile icon in the top-right corner, selecting "Settings", and then clicking "Change Password".

### Order Management

**Q: How do I search for a specific order?**

A: You can search for a specific order by entering the SO number, sender name, or receiver name in the search box on the Order Data page.

**Q: Can I add comments to an order?**

A: Yes, you can add comments to an order by opening the order details pane, clicking the "Comments" tab, and using the comment form at the bottom.

### Alerts

**Q: How are alert severities determined?**

A: Alert severities are determined based on the impact of the issue:
- Critical: Immediate attention required, significant impact on operations
- High: Urgent attention required, moderate impact on operations
- Medium: Attention required, minor impact on operations
- Low: Awareness required, minimal impact on operations

**Q: What happens when I acknowledge an alert?**

A: When you acknowledge an alert, it is assigned to you and its status changes to "Acknowledged". This indicates that someone is working on the issue.

**Q: What happens when I resolve an alert?**

A: When you resolve an alert, its status changes to "Resolved". This indicates that the issue has been addressed and no further action is required.
