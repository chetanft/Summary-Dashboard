# Freight Tiger – KPI Definitions for Cursor AI & Developer Tracking

## 🎯 Cursor AI JSON Schema Per KPI
```json
[
  {
    "kpi_id": 0,
    "title": "Total Orders",
    "category": "Planning",
    "chart_type": "Text + Mini Stats",
    "elements": [
      "Total Count",
      "Planned",
      "Partially Planned",
      "Unplanned"
    ],
    "primary_value": "1000",
    "other_values": [
      "104 Planned",
      "204 Partially",
      "692 Unplanned"
    ],
    "description_for_cursor_ai": "Display 3 values below a bold total count. Use delta indicators in red/green."
  },
  {
    "kpi_id": 1,
    "title": "Planned Logistics Cost",
    "category": "Planning",
    "chart_type": "Single Value",
    "elements": [
      "Amount",
      "Delta"
    ],
    "primary_value": "\u20b921,71,88,000",
    "other_values": [
      "+4%"
    ],
    "description_for_cursor_ai": "Use currency component with upward arrow for trend change."
  },
  {
    "kpi_id": 2,
    "title": "Orders Planned",
    "category": "Planning",
    "chart_type": "Donut + Bar",
    "elements": [
      "Planned Count",
      "Fulfilled Orders",
      "Unfulfilled Orders",
      "SLA Breached Unfulfilled"
    ],
    "primary_value": "104",
    "other_values": [
      "35 Fulfilled",
      "11 Unfulfilled",
      "SLA Breach by days"
    ],
    "description_for_cursor_ai": "Donut chart on left, red-bar SLA breakdown on right. Label segments clearly."
  },
  {
    "kpi_id": 3,
    "title": "Active Indents",
    "category": "Pre Dispatch",
    "chart_type": "Split Text",
    "elements": [
      "Total",
      "Accepted",
      "Pending"
    ],
    "primary_value": "100",
    "other_values": [
      "54 Accepted",
      "46 Pending"
    ],
    "description_for_cursor_ai": "Two segment stacked layout: numeric badges for accepted/pending."
  },
  {
    "kpi_id": 4,
    "title": "Pending Acceptance",
    "category": "Pre Dispatch",
    "chart_type": "Donut + Bar",
    "elements": [
      "Accepted",
      "TAT Breached"
    ],
    "primary_value": "46",
    "other_values": [
      "11 Breached",
      "35 Not Breached"
    ],
    "description_for_cursor_ai": "Donut chart with a TAT SLA breached bar. Include color-coded bars."
  },
  {
    "kpi_id": 5,
    "title": "Accepted",
    "category": "Pre Dispatch",
    "chart_type": "Donut",
    "elements": [
      "Accepted Count",
      "In Reporting"
    ],
    "primary_value": "54",
    "other_values": [
      "46 Reporting"
    ],
    "description_for_cursor_ai": "Use percentage label inside the donut. Add sublabel 'In Reporting'."
  },
  {
    "kpi_id": 6,
    "title": "Fulfilment Delay",
    "category": "Pre Dispatch",
    "chart_type": "Bar + Line",
    "elements": [
      "Journeys",
      "Aging",
      "By Transporter Type"
    ],
    "primary_value": "22",
    "other_values": [
      "Grouped Bars"
    ],
    "description_for_cursor_ai": "Horizontal bar chart with transporter-wise splits. Use color tokens for transporters."
  },
  {
    "kpi_id": 7,
    "title": "Vehicle Assignment Pending",
    "category": "Pre Dispatch",
    "chart_type": "Bar + Pie",
    "elements": [
      "Journeys",
      "Transporter Type",
      "Age"
    ],
    "primary_value": "54",
    "other_values": [
      "Grouped Bars"
    ],
    "description_for_cursor_ai": "Same as Fulfilment Delay, with added pending reason breakdown."
  },
  {
    "kpi_id": 8,
    "title": "Vehicle Report Pending",
    "category": "Pre Dispatch",
    "chart_type": "Bar + Pie",
    "elements": [
      "Journeys",
      "Transporter Type",
      "Age"
    ],
    "primary_value": "54",
    "other_values": [
      "Grouped Bars"
    ],
    "description_for_cursor_ai": "Use pie + bar like 'Vehicle Assignment Pending'. Mark partial overlap with previous card."
  },
  {
    "kpi_id": 9,
    "title": "Expired Indents",
    "category": "Pre Dispatch",
    "chart_type": "Line",
    "elements": [
      "Count",
      "Trend"
    ],
    "primary_value": "22",
    "other_values": [
      "Mini Line Chart"
    ],
    "description_for_cursor_ai": "Use line chart below for trend visualization over time."
  },
  {
    "kpi_id": 10,
    "title": "Requests Cancelled",
    "category": "Pre Dispatch",
    "chart_type": "Line",
    "elements": [
      "Count",
      "Trend"
    ],
    "primary_value": "22",
    "other_values": [
      "Mini Line Chart"
    ],
    "description_for_cursor_ai": "Same as Expired Indents, red line chart, rising trend."
  },
  {
    "kpi_id": 11,
    "title": "Vehicle Changed Indents",
    "category": "Pre Dispatch",
    "chart_type": "Line",
    "elements": [
      "Count",
      "Trend"
    ],
    "primary_value": "22",
    "other_values": [
      "Mini Line Chart"
    ],
    "description_for_cursor_ai": "Same as above, just change label to Vehicle Changed."
  },
  {
    "kpi_id": 12,
    "title": "Active Journeys",
    "category": "Pre Transit",
    "chart_type": "Single Value",
    "elements": [
      "Total"
    ],
    "primary_value": "10",
    "other_values": [],
    "description_for_cursor_ai": "Use large number badge. Optional tooltip for context."
  },
  {
    "kpi_id": 13,
    "title": "Truck Movement Timeline",
    "category": "Pre Transit",
    "chart_type": "Gantt",
    "elements": [
      "Timeline by Truck Type"
    ],
    "primary_value": "",
    "other_values": [],
    "description_for_cursor_ai": "Gantt chart per truck type across timeline. Highlight active bars."
  },
  {
    "kpi_id": 14,
    "title": "Breakdown / Replaced / Held",
    "category": "Pre Transit",
    "chart_type": "Bar",
    "elements": [
      "Breakdown Types",
      "Counts"
    ],
    "primary_value": "2",
    "other_values": [
      "Breakdown=1",
      "Replaced=1"
    ],
    "description_for_cursor_ai": "Horizontal bar for Breakdown vs Replaced. Use icon labels for types."
  },
  {
    "kpi_id": 15,
    "title": "Truck Arrival",
    "category": "Pre Transit",
    "chart_type": "Bar",
    "elements": [
      "Truck Types",
      "Counts"
    ],
    "primary_value": "14",
    "other_values": [
      "Grouped Bars"
    ],
    "description_for_cursor_ai": "Bar chart by Truck Type. Add tooltip per bar with counts."
  },
  {
    "kpi_id": 16,
    "title": "Vehicle Report Pending",
    "category": "Pre Transit",
    "chart_type": "Bar + Pie",
    "elements": [
      "Journeys",
      "Transporter Type",
      "Age"
    ],
    "primary_value": "54",
    "other_values": [
      "Grouped Bars"
    ],
    "description_for_cursor_ai": "Same pattern as Pre Dispatch card, reuse chart structure."
  },
  {
    "kpi_id": 17,
    "title": "Loading Vehicles",
    "category": "At Loading",
    "chart_type": "Single Value",
    "elements": [
      "Count"
    ],
    "primary_value": "10",
    "other_values": [],
    "description_for_cursor_ai": "Display single bold number. Tooltip to explain loading process."
  },
  {
    "kpi_id": 18,
    "title": "Detained Vehicles",
    "category": "At Loading",
    "chart_type": "Donut",
    "elements": [
      "At Gate",
      "At Dock"
    ],
    "primary_value": "6",
    "other_values": [
      "3 Gate",
      "3 Dock"
    ],
    "description_for_cursor_ai": "Donut split by Gate and Dock. Use Freight Tiger secondary colors."
  },
  {
    "kpi_id": 19,
    "title": "Dock Occupancy",
    "category": "At Loading",
    "chart_type": "Gantt",
    "elements": [
      "Dock vs Time vs Truck"
    ],
    "primary_value": "",
    "other_values": [],
    "description_for_cursor_ai": "Horizontal Gantt over time. Each truck maps to dock row."
  },
  {
    "kpi_id": 20,
    "title": "Active Journeys",
    "category": "In Transit",
    "chart_type": "Single Value",
    "elements": [
      "Total"
    ],
    "primary_value": "84",
    "other_values": [],
    "description_for_cursor_ai": "Use card structure with large count. Optional filter to highlight SLA journeys."
  },
  {
    "kpi_id": 21,
    "title": "Starred Journeys",
    "category": "In Transit",
    "chart_type": "Single Value",
    "elements": [
      "Total"
    ],
    "primary_value": "24",
    "other_values": [],
    "description_for_cursor_ai": "Bold number on top. Optional star icon toggle (future feature)."
  },
  {
    "kpi_id": 22,
    "title": "Delayed",
    "category": "In Transit",
    "chart_type": "Bar + Text",
    "elements": [
      "Count",
      "By Transporter",
      "By Age"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Bar chart by aging buckets and transporter type."
  },
  {
    "kpi_id": 23,
    "title": "Delivering Today",
    "category": "In Transit",
    "chart_type": "Bar",
    "elements": [
      "Count",
      "By Age",
      "By Transporter"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Bar chart per age group. Show timeline bucket labels clearly."
  },
  {
    "kpi_id": 24,
    "title": "Untracked",
    "category": "In Transit",
    "chart_type": "Pie",
    "elements": [
      "SIM Consent",
      "Unknown",
      "Others"
    ],
    "primary_value": "13",
    "other_values": [],
    "description_for_cursor_ai": "Pie chart showing 3 categories. Color-coded legend. SIM consent tooltip."
  },
  {
    "kpi_id": 25,
    "title": "Long Stoppage",
    "category": "In Transit",
    "chart_type": "Bar + Text",
    "elements": [
      "Count",
      "By Age",
      "By Transporter"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Bar chart aging distribution with SLA breach highlight."
  },
  {
    "kpi_id": 26,
    "title": "Stop Breach",
    "category": "In Transit",
    "chart_type": "Bar + Pie",
    "elements": [
      "Count",
      "By Customer",
      "By Age"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Use bar + pie combo. Highlight top breaching customers."
  },
  {
    "kpi_id": 27,
    "title": "E Way Bill Expiring",
    "category": "In Transit",
    "chart_type": "Bar",
    "elements": [
      "Expiring Timeline"
    ],
    "primary_value": "22",
    "other_values": [
      "12 Expired"
    ],
    "description_for_cursor_ai": "Bar chart with time remaining segments. Tag 'Expired' in red."
  },
  {
    "kpi_id": 28,
    "title": "Route Deviation",
    "category": "In Transit",
    "chart_type": "Line",
    "elements": [
      "Trend"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Trend line in red. Tooltip explains breach nature."
  },
  {
    "kpi_id": 29,
    "title": "Suspected Diversion",
    "category": "In Transit",
    "chart_type": "Line",
    "elements": [
      "Trend"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Same as Route Deviation. Keep consistent style."
  },
  {
    "kpi_id": 30,
    "title": "Temperature Breached",
    "category": "In Transit",
    "chart_type": "Line",
    "elements": [
      "Trend"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Trend line with temp limit shown. Add temp range if data allows."
  },
  {
    "kpi_id": 31,
    "title": "Over Speeding",
    "category": "At Unloading",
    "chart_type": "Line + Icon",
    "elements": [
      "Trend",
      "SLA Status"
    ],
    "primary_value": "22",
    "other_values": [],
    "description_for_cursor_ai": "Trend line with green SLA check. Add SLA breached tag if needed."
  },
  {
    "kpi_id": 32,
    "title": "Unloading Vehicles",
    "category": "At Unloading",
    "chart_type": "Single Value",
    "elements": [
      "Count"
    ],
    "primary_value": "10",
    "other_values": [],
    "description_for_cursor_ai": "Display vehicle count. Optional ETA to dock if available."
  },
  {
    "kpi_id": 33,
    "title": "Detained Vehicles",
    "category": "Post Delivery",
    "chart_type": "Bar",
    "elements": [
      "Truck Numbers",
      "Detention Time"
    ],
    "primary_value": "6",
    "other_values": [
      "Per Truck Detention"
    ],
    "description_for_cursor_ai": "Horizontal bar chart per vehicle. Show detention duration as time bar."
  },
  {
    "kpi_id": 34,
    "title": "Approved Invoices",
    "category": "Post Delivery",
    "chart_type": "Single Value",
    "elements": [
      "Amount",
      "Count"
    ],
    "primary_value": "\u20b99.4L",
    "other_values": [
      "94"
    ],
    "description_for_cursor_ai": "Show amount with invoice count badge."
  },
  {
    "kpi_id": 35,
    "title": "Overcharged Invoices",
    "category": "Post Delivery",
    "chart_type": "Single Value",
    "elements": [
      "Amount",
      "Count"
    ],
    "primary_value": "\u20b915.4L",
    "other_values": [
      "94"
    ],
    "description_for_cursor_ai": "Show amount with invoice count badge."
  },
  {
    "kpi_id": 36,
    "title": "Rejected Invoices",
    "category": "Post Delivery",
    "chart_type": "Single Value",
    "elements": [
      "Amount",
      "Count"
    ],
    "primary_value": "\u20b94.4L",
    "other_values": [
      "94"
    ],
    "description_for_cursor_ai": "Show amount with invoice count badge."
  },
  {
    "kpi_id": 37,
    "title": "Disputed Invoices",
    "category": "Post Delivery",
    "chart_type": "Single Value",
    "elements": [
      "Amount",
      "Count"
    ],
    "primary_value": "\u20b91.4L",
    "other_values": [
      "94"
    ],
    "description_for_cursor_ai": "Show amount with invoice count badge."
  }
]
```

## ✅ Developer Stories Per KPI
### 1. Total Orders
- **Category:** Planning
- **Chart Type:** Text + Mini Stats
- **Primary Value:** 1000
- **Elements Shown:** Total Count, Planned, Partially Planned, Unplanned
- **Additional Values:** 104 Planned, 204 Partially, 692 Unplanned
- **Implementation Notes for Augmented Code:** Display 3 values below a bold total count. Use delta indicators in red/green.

### 2. Planned Logistics Cost
- **Category:** Planning
- **Chart Type:** Single Value
- **Primary Value:** ₹21,71,88,000
- **Elements Shown:** Amount, Delta
- **Additional Values:** +4%
- **Implementation Notes for Augmented Code:** Use currency component with upward arrow for trend change.

### 3. Orders Planned
- **Category:** Planning
- **Chart Type:** Donut + Bar
- **Primary Value:** 104
- **Elements Shown:** Planned Count, Fulfilled Orders, Unfulfilled Orders, SLA Breached Unfulfilled
- **Additional Values:** 35 Fulfilled, 11 Unfulfilled, SLA Breach by days
- **Implementation Notes for Augmented Code:** Donut chart on left, red-bar SLA breakdown on right. Label segments clearly.

### 4. Active Indents
- **Category:** Pre Dispatch
- **Chart Type:** Split Text
- **Primary Value:** 100
- **Elements Shown:** Total, Accepted, Pending
- **Additional Values:** 54 Accepted, 46 Pending
- **Implementation Notes for Augmented Code:** Two segment stacked layout: numeric badges for accepted/pending.

### 5. Pending Acceptance
- **Category:** Pre Dispatch
- **Chart Type:** Donut + Bar
- **Primary Value:** 46
- **Elements Shown:** Accepted, TAT Breached
- **Additional Values:** 11 Breached, 35 Not Breached
- **Implementation Notes for Augmented Code:** Donut chart with a TAT SLA breached bar. Include color-coded bars.

### 6. Accepted
- **Category:** Pre Dispatch
- **Chart Type:** Donut
- **Primary Value:** 54
- **Elements Shown:** Accepted Count, In Reporting
- **Additional Values:** 46 Reporting
- **Implementation Notes for Augmented Code:** Use percentage label inside the donut. Add sublabel 'In Reporting'.

### 7. Fulfilment Delay
- **Category:** Pre Dispatch
- **Chart Type:** Bar + Line
- **Primary Value:** 22
- **Elements Shown:** Journeys, Aging, By Transporter Type
- **Additional Values:** Grouped Bars
- **Implementation Notes for Augmented Code:** Horizontal bar chart with transporter-wise splits. Use color tokens for transporters.

### 8. Vehicle Assignment Pending
- **Category:** Pre Dispatch
- **Chart Type:** Bar + Pie
- **Primary Value:** 54
- **Elements Shown:** Journeys, Transporter Type, Age
- **Additional Values:** Grouped Bars
- **Implementation Notes for Augmented Code:** Same as Fulfilment Delay, with added pending reason breakdown.

### 9. Vehicle Report Pending
- **Category:** Pre Dispatch
- **Chart Type:** Bar + Pie
- **Primary Value:** 54
- **Elements Shown:** Journeys, Transporter Type, Age
- **Additional Values:** Grouped Bars
- **Implementation Notes for Augmented Code:** Use pie + bar like 'Vehicle Assignment Pending'. Mark partial overlap with previous card.

### 10. Expired Indents
- **Category:** Pre Dispatch
- **Chart Type:** Line
- **Primary Value:** 22
- **Elements Shown:** Count, Trend
- **Additional Values:** Mini Line Chart
- **Implementation Notes for Augmented Code:** Use line chart below for trend visualization over time.

### 11. Requests Cancelled
- **Category:** Pre Dispatch
- **Chart Type:** Line
- **Primary Value:** 22
- **Elements Shown:** Count, Trend
- **Additional Values:** Mini Line Chart
- **Implementation Notes for Augmented Code:** Same as Expired Indents, red line chart, rising trend.

### 12. Vehicle Changed Indents
- **Category:** Pre Dispatch
- **Chart Type:** Line
- **Primary Value:** 22
- **Elements Shown:** Count, Trend
- **Additional Values:** Mini Line Chart
- **Implementation Notes for Augmented Code:** Same as above, just change label to Vehicle Changed.

### 13. Active Journeys
- **Category:** Pre Transit
- **Chart Type:** Single Value
- **Primary Value:** 10
- **Elements Shown:** Total
- **Implementation Notes for Augmented Code:** Use large number badge. Optional tooltip for context.

### 14. Truck Movement Timeline
- **Category:** Pre Transit
- **Chart Type:** Gantt
- **Primary Value:** 
- **Elements Shown:** Timeline by Truck Type
- **Implementation Notes for Augmented Code:** Gantt chart per truck type across timeline. Highlight active bars.

### 15. Breakdown / Replaced / Held
- **Category:** Pre Transit
- **Chart Type:** Bar
- **Primary Value:** 2
- **Elements Shown:** Breakdown Types, Counts
- **Additional Values:** Breakdown=1, Replaced=1
- **Implementation Notes for Augmented Code:** Horizontal bar for Breakdown vs Replaced. Use icon labels for types.

### 16. Truck Arrival
- **Category:** Pre Transit
- **Chart Type:** Bar
- **Primary Value:** 14
- **Elements Shown:** Truck Types, Counts
- **Additional Values:** Grouped Bars
- **Implementation Notes for Augmented Code:** Bar chart by Truck Type. Add tooltip per bar with counts.

### 17. Vehicle Report Pending
- **Category:** Pre Transit
- **Chart Type:** Bar + Pie
- **Primary Value:** 54
- **Elements Shown:** Journeys, Transporter Type, Age
- **Additional Values:** Grouped Bars
- **Implementation Notes for Augmented Code:** Same pattern as Pre Dispatch card, reuse chart structure.

### 18. Loading Vehicles
- **Category:** At Loading
- **Chart Type:** Single Value
- **Primary Value:** 10
- **Elements Shown:** Count
- **Implementation Notes for Augmented Code:** Display single bold number. Tooltip to explain loading process.

### 19. Detained Vehicles
- **Category:** At Loading
- **Chart Type:** Donut
- **Primary Value:** 6
- **Elements Shown:** At Gate, At Dock
- **Additional Values:** 3 Gate, 3 Dock
- **Implementation Notes for Augmented Code:** Donut split by Gate and Dock. Use Freight Tiger secondary colors.

### 20. Dock Occupancy
- **Category:** At Loading
- **Chart Type:** Gantt
- **Primary Value:** 
- **Elements Shown:** Dock vs Time vs Truck
- **Implementation Notes for Augmented Code:** Horizontal Gantt over time. Each truck maps to dock row.

### 21. Active Journeys
- **Category:** In Transit
- **Chart Type:** Single Value
- **Primary Value:** 84
- **Elements Shown:** Total
- **Implementation Notes for Augmented Code:** Use card structure with large count. Optional filter to highlight SLA journeys.

### 22. Starred Journeys
- **Category:** In Transit
- **Chart Type:** Single Value
- **Primary Value:** 24
- **Elements Shown:** Total
- **Implementation Notes for Augmented Code:** Bold number on top. Optional star icon toggle (future feature).

### 23. Delayed
- **Category:** In Transit
- **Chart Type:** Bar + Text
- **Primary Value:** 22
- **Elements Shown:** Count, By Transporter, By Age
- **Implementation Notes for Augmented Code:** Bar chart by aging buckets and transporter type.

### 24. Delivering Today
- **Category:** In Transit
- **Chart Type:** Bar
- **Primary Value:** 22
- **Elements Shown:** Count, By Age, By Transporter
- **Implementation Notes for Augmented Code:** Bar chart per age group. Show timeline bucket labels clearly.

### 25. Untracked
- **Category:** In Transit
- **Chart Type:** Pie
- **Primary Value:** 13
- **Elements Shown:** SIM Consent, Unknown, Others
- **Implementation Notes for Augmented Code:** Pie chart showing 3 categories. Color-coded legend. SIM consent tooltip.

### 26. Long Stoppage
- **Category:** In Transit
- **Chart Type:** Bar + Text
- **Primary Value:** 22
- **Elements Shown:** Count, By Age, By Transporter
- **Implementation Notes for Augmented Code:** Bar chart aging distribution with SLA breach highlight.

### 27. Stop Breach
- **Category:** In Transit
- **Chart Type:** Bar + Pie
- **Primary Value:** 22
- **Elements Shown:** Count, By Customer, By Age
- **Implementation Notes for Augmented Code:** Use bar + pie combo. Highlight top breaching customers.

### 28. E Way Bill Expiring
- **Category:** In Transit
- **Chart Type:** Bar
- **Primary Value:** 22
- **Elements Shown:** Expiring Timeline
- **Additional Values:** 12 Expired
- **Implementation Notes for Augmented Code:** Bar chart with time remaining segments. Tag 'Expired' in red.

### 29. Route Deviation
- **Category:** In Transit
- **Chart Type:** Line
- **Primary Value:** 22
- **Elements Shown:** Trend
- **Implementation Notes for Augmented Code:** Trend line in red. Tooltip explains breach nature.

### 30. Suspected Diversion
- **Category:** In Transit
- **Chart Type:** Line
- **Primary Value:** 22
- **Elements Shown:** Trend
- **Implementation Notes for Augmented Code:** Same as Route Deviation. Keep consistent style.

### 31. Temperature Breached
- **Category:** In Transit
- **Chart Type:** Line
- **Primary Value:** 22
- **Elements Shown:** Trend
- **Implementation Notes for Augmented Code:** Trend line with temp limit shown. Add temp range if data allows.

### 32. Over Speeding
- **Category:** At Unloading
- **Chart Type:** Line + Icon
- **Primary Value:** 22
- **Elements Shown:** Trend, SLA Status
- **Implementation Notes for Augmented Code:** Trend line with green SLA check. Add SLA breached tag if needed.

### 33. Unloading Vehicles
- **Category:** At Unloading
- **Chart Type:** Single Value
- **Primary Value:** 10
- **Elements Shown:** Count
- **Implementation Notes for Augmented Code:** Display vehicle count. Optional ETA to dock if available.

### 34. Detained Vehicles
- **Category:** Post Delivery
- **Chart Type:** Bar
- **Primary Value:** 6
- **Elements Shown:** Truck Numbers, Detention Time
- **Additional Values:** Per Truck Detention
- **Implementation Notes for Augmented Code:** Horizontal bar chart per vehicle. Show detention duration as time bar.

### 35. Approved Invoices
- **Category:** Post Delivery
- **Chart Type:** Single Value
- **Primary Value:** ₹9.4L
- **Elements Shown:** Amount, Count
- **Additional Values:** 94
- **Implementation Notes for Augmented Code:** Show amount with invoice count badge.

### 36. Overcharged Invoices
- **Category:** Post Delivery
- **Chart Type:** Single Value
- **Primary Value:** ₹15.4L
- **Elements Shown:** Amount, Count
- **Additional Values:** 94
- **Implementation Notes for Augmented Code:** Show amount with invoice count badge.

### 37. Rejected Invoices
- **Category:** Post Delivery
- **Chart Type:** Single Value
- **Primary Value:** ₹4.4L
- **Elements Shown:** Amount, Count
- **Additional Values:** 94
- **Implementation Notes for Augmented Code:** Show amount with invoice count badge.

### 38. Disputed Invoices
- **Category:** Post Delivery
- **Chart Type:** Single Value
- **Primary Value:** ₹1.4L
- **Elements Shown:** Amount, Count
- **Additional Values:** 94
- **Implementation Notes for Augmented Code:** Show amount with invoice count badge.
