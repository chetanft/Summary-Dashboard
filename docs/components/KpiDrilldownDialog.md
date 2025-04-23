# KpiDrilldownDialog Component Documentation

## Overview

The `KpiDrilldownDialog` component is a dialog component for displaying detailed KPI information. It is used to show more detailed information about a KPI when a user clicks on the drill-down button in a KPI card.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `open` | boolean | Whether the dialog is open | - |
| `onClose` | Function | Function to close the dialog | - |
| `kpiId` | string | ID of the KPI | - |
| `kpiData` | Object | Data for the KPI | - |

## Usage

```jsx
import KpiDrilldownDialog from './KpiDrilldownDialog';

const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState({ id: null, data: null });
  
  const handleKPIClick = (kpiId, kpiData) => {
    setSelectedKpi({ id: kpiId, data: kpiData });
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      {/* Other components */}
      
      <KpiDrilldownDialog
        open={open}
        onClose={handleClose}
        kpiId={selectedKpi.id}
        kpiData={selectedKpi.data}
      />
    </>
  );
};
```

## Layout

The `KpiDrilldownDialog` component has the following layout:

1. **Dialog Title**: Contains the KPI name and action buttons (download and close).
2. **Dialog Content**: Contains the KPI details and chart.
   - **KPI Details**: Contains the KPI description and current value.
   - **Chart**: Contains a detailed chart showing the breakdown or trend of the KPI.
3. **Dialog Actions**: Contains the close button.

## Chart Rendering

The `KpiDrilldownDialog` component renders different charts based on the KPI ID:

1. **total-orders**: Renders a line chart showing the total orders trend.
2. **planned-logistic-cost**: Renders a donut chart showing the transporter breakdown.
3. **orders-planned**: Renders a bar chart showing the SLA breached orders.
4. **indent-status**, **accepted-split**: Renders a donut chart showing the breakdown.
5. **pickup-sla-breached**: Renders a bar chart showing the SLA breach breakdown.
6. **delivered-vs-in-transit**: Renders a donut chart showing the breakdown.
7. **trip-delay-flag**: Renders a bar chart showing the delay breakdown.
8. **eta-accuracy**: Renders a line chart showing the ETA accuracy trend.
9. **epod-submitted-vs-pending**, **invoice-status**: Renders a donut chart showing the breakdown.
10. **epod-approval-rate**: Renders a donut chart showing the approval breakdown.

If no chart is available for the KPI, a message is displayed.

## KPI Descriptions

The `KpiDrilldownDialog` component provides descriptions for each KPI:

1. **total-orders**: "Total number of orders in the system, including planned, partially planned, and unplanned orders."
2. **planned-logistic-cost**: "Total planned logistics cost across all transporters, broken down by transporter."
3. **orders-planned**: "Number of orders that have been planned, including fulfillment status and SLA breached orders."
4. **indent-status**: "Status of indents, showing the breakdown between accepted and pending indents."
5. **accepted-split**: "Breakdown of accepted indents, showing the split between reporting and assign."
6. **pickup-sla-breached**: "Percentage of pickups with SLA breach, broken down by time categories."
7. **delivered-vs-in-transit**: "Split of delivered vs in-transit trips, showing the current status of all trips."
8. **trip-delay-flag**: "Percentage of trips with SLA breach, broken down by delay categories."
9. **eta-accuracy**: "Accuracy of estimated time of arrival, showing the trend over time."
10. **epod-submitted-vs-pending**: "Split of ePOD submission status, showing submitted vs pending ePODs."
11. **epod-approval-rate**: "Approval rate of submitted ePODs, broken down by approval status."
12. **invoice-status**: "Status of invoices, showing the breakdown between generated and pending invoices."

## Value Formatting

The `KpiDrilldownDialog` component formats KPI values based on the KPI data:

1. If the KPI has a unit, the value is displayed with the unit.
2. Otherwise, the value is displayed as is.

## Actions

The `KpiDrilldownDialog` component provides the following actions:

1. **Download**: Allows the user to download the KPI data (currently logs to console).
2. **Close**: Closes the dialog.

## Best Practices

1. **KPI Description**: Provide a clear and concise description of the KPI.
2. **Current Value**: Display the current value of the KPI with trend information.
3. **Chart**: Provide a detailed chart showing the breakdown or trend of the KPI.
4. **Actions**: Provide actions for the user to interact with the KPI data.

## Example

```jsx
<KpiDrilldownDialog
  open={drilldownOpen}
  onClose={handleCloseDrilldown}
  kpiId="total-orders"
  kpiData={{
    id: "total-orders",
    name: "Total Orders",
    value: 1000,
    trend: "up",
    trendValue: 4,
    breakdown: {
      planned: { value: 104, percentage: 10.4 },
      partiallyPlanned: { value: 204, percentage: 20.4 },
      unplanned: { value: 692, percentage: 69.2 }
    },
    trendChart: [
      { month: "Feb", value: 850, date: "2023-02-15" },
      { month: "Mar", value: 900, date: "2023-03-15" },
      { month: "Apr", value: 950, date: "2023-04-15" },
      { month: "May", value: 980, date: "2023-05-15" },
      { month: "Jun", value: 1000, date: "2023-06-15" }
    ]
  }}
/>
```
