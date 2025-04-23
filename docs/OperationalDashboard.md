# Operational Dashboard Documentation

## Overview

The Operational Dashboard provides a comprehensive view of logistics operations across different stages of the supply chain. It is designed to help users monitor key performance indicators (KPIs) and make data-driven decisions.

## Dashboard Sections

The dashboard is divided into four main sections:

1. **Planning**: Displays KPIs related to order planning, logistics cost, and order fulfillment.
2. **Pre-Dispatch**: Shows KPIs related to indent status, accepted split, and pickup SLA breaches.
3. **In-Transit**: Presents KPIs related to delivered vs in-transit trips, trip delay flags, and ETA accuracy.
4. **Post-Delivery**: Displays KPIs related to ePOD submission, approval rates, and invoice status.

## User Roles

The dashboard supports three user roles, each with a different level of data aggregation:

1. **CXO**: Shows aggregated data across all branches and companies.
2. **Company**: Shows aggregated data for a specific company.
3. **Branch**: Shows data for a specific branch.

## Locations

The dashboard allows filtering data by location:

1. **MDC Labs, Amritsar**: Default location.
2. **Tata Motors, Pune**: Shows data specific to Tata Motors in Pune.
3. **Freight Tiger HQ, Mumbai**: Shows data specific to Freight Tiger HQ in Mumbai.
4. **Logistics Hub, Delhi**: Shows data specific to the Logistics Hub in Delhi.

## Search Functionality

The dashboard includes a search functionality that allows users to filter data based on a search term.

## KPI Drill-Down

Each KPI card in the dashboard supports drill-down functionality. Clicking on the arrow icon in a KPI card opens a detailed view of the KPI, including:

1. **KPI Description**: A detailed description of the KPI.
2. **Current Value**: The current value of the KPI with trend information.
3. **Detailed Chart**: A detailed chart showing the breakdown or trend of the KPI.

## Components

### Core Components

1. **KpiCard**: A reusable component for displaying KPI data in a card format.
2. **LocationSelector**: A component for selecting a location.
3. **SearchInput**: A component for searching and filtering data.
4. **KpiDrilldownDialog**: A dialog component for displaying detailed KPI information.

### Section Components

1. **PlanningSection**: Displays KPIs related to planning.
2. **PreDispatchSection**: Displays KPIs related to pre-dispatch.
3. **InTransitSection**: Displays KPIs related to in-transit.
4. **PostDeliverySection**: Displays KPIs related to post-delivery.

### Chart Components

1. **DonutChartComponent**: A component for displaying donut charts.
2. **LineChartComponent**: A component for displaying line charts.
3. **BarChartComponent**: A component for displaying bar charts.

## Services

### Operational Dashboard Service

The `operationalDashboardService.js` file provides functions for fetching and transforming operational dashboard data:

1. **getOperationalDashboardData**: Gets operational dashboard data with appropriate filtering and transformations.
2. **applyTimeFiltering**: Applies time-based filtering to dashboard data.
3. **filterDataByDateRange**: Filters data by date range.
4. **filterDataByLocation**: Filters data by location.
5. **filterDataBySearchTerm**: Filters data by search term.

## Utilities

### Date Utilities

The `dateUtils.js` file provides functions for working with dates:

1. **getMonthToDateRange**: Gets month-to-date date range.
2. **getLastSixMonthsRange**: Gets last six months date range.
3. **filterDataByDateRange**: Filters data by date range.

### User Role Utilities

The `userRoleUtils.js` file provides functions for transforming data based on user role:

1. **transformDataForUserRole**: Transforms data based on user role.
2. **transformForCXO**: Transforms data for CXO role.
3. **transformForCompany**: Transforms data for Company role.
4. **transformForBranch**: Transforms data for Branch role.

### Chart Utilities

The `chartUtils.jsx` file provides functions for working with charts:

1. **formatLargeNumber**: Formats large numbers with appropriate suffixes.
2. **formatCurrency**: Formats currency values with appropriate symbol and suffixes.
3. **getPerformanceColor**: Gets color based on performance compared to target.
4. **transformBarChartData**: Transforms data for a bar chart.
5. **transformLineChartData**: Transforms data for a line chart.
6. **getCustomTooltip**: Gets custom tooltip content for charts.
7. **getChartDimensions**: Gets chart dimensions based on container size.

## Data Structure

### Planning KPI Data

The `planningKpiData.js` file defines the data structure for planning KPIs:

1. **totalOrders**: Total number of orders with breakdown by planning status.
2. **plannedLogisticCost**: Planned logistics cost with breakdown by transporter.
3. **ordersPlanned**: Number of orders planned with fulfillment status and SLA breached orders.

### Pre-Dispatch KPI Data

The `preDispatchKpiData.js` file defines the data structure for pre-dispatch KPIs:

1. **indentStatus**: Status of indents with breakdown by acceptance status.
2. **acceptedSplit**: Breakdown of accepted indents by reporting and assign.
3. **pickupSlaBreached**: Percentage of pickups with SLA breach with breakdown by time categories.

### In-Transit KPI Data

The `inTransitKpiData.js` file defines the data structure for in-transit KPIs:

1. **deliveredVsInTransit**: Split of delivered vs in-transit trips.
2. **tripDelayFlag**: Percentage of trips with SLA breach with breakdown by delay categories.
3. **etaAccuracy**: Accuracy of estimated time of arrival with trend over time.

### Post-Delivery KPI Data

The `postDeliveryKpiData.js` file defines the data structure for post-delivery KPIs:

1. **epodSubmittedVsPending**: Split of ePOD submission status.
2. **epodApprovalRate**: Approval rate of submitted ePODs with breakdown by approval status.
3. **invoiceStatus**: Status of invoices with breakdown by generation status.

## Time-Based Filtering

The dashboard applies different time-based filtering to different sections:

1. **Planning, Pre-Dispatch, In-Transit**: Shows data up to month-to-date.
2. **Post-Delivery**: Shows data for the last six months.

## Future Enhancements

1. **Export Functionality**: Add the ability to export KPI data to CSV or Excel.
2. **Custom Date Range**: Allow users to select a custom date range for filtering data.
3. **Alerts and Notifications**: Add alerts and notifications for critical KPIs.
4. **Comparative Analysis**: Add the ability to compare KPIs across different time periods.
5. **Predictive Analytics**: Add predictive analytics to forecast future KPI values.
