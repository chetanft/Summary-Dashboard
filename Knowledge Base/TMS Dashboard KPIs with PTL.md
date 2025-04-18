# 📦 Freight & Logistics Dashboard KPIs (.md Spec)

This document outlines the full KPI structure and layout for operations dashboard page which is present in the toggle tabs for all user personas. remove current KPIs and these KPIs. Don't change the functionality, just update the KPIs only. remeber this updating doesn't get issues with netlify deployment.

---

## 🗺️ Layout Strategy

- Use a **3-column layout**
- Group by: `Planning`, `Pre Dispatch`, `In Transit`, `Post Delivery`
- Each section uses unique chart types (limit: no more than 2 of same chart type)
- Prioritize **donuts for statuses**, **bars for time/volume**, **tiles for totals**, and **trendlines only if needed**

---

## 📍 Planning

| KPI Name                     | Chart Type    | Notes                          |
|-----------------------------|---------------|--------------------------------|
| Orders Created              | Stat Tile     | Day-wise view                  |
| Orders Assigned to Trip     | Donut Chart   | Assigned vs Pending            |
| Order vs Trip Match Rate    | Stat Tile     | % match                        |
| Trip Creation Trend         | Line Chart    | Volume trend last 30 days      |

---

## 🚚 Pre Dispatch (Indent, Pre Transit, At Loading)

### 1. Indent & Pre Transit

| KPI Name                         | Chart Type     | Notes                                 |
|----------------------------------|----------------|---------------------------------------|
| Indent Status (Accepted/Pending) | Donut Chart    | Used once                             |
| Accepted Split (Reporting/Assign)| Donut Chart    | 2nd usage of donut                    |
| Vehicle Assignment Pending       | Bar Chart      | Time buckets: 6h, 4h, 2h              |
| Vehicle Reporting Pending        | Bar Chart      | Same bar format, different KPI        |
| Active Pre-Transits              | Stat Tile      | Count only                            |
| Delay for Fulfilment             | Stat Tile      | With alert color if breached          |

### 2. At Loading (Yard, Dock, TAT)

| KPI Name                            | Chart Type    | Notes                                |
|-------------------------------------|---------------|--------------------------------------|
| Avg Loading TAT per plant           | Bar Chart     | Do not duplicate bar chart again     |
| Yard Occupancy (Truck Count)        | Stat Tile     | Live count                           |
| Dock Utilisation                    | Stat Tile     | % usage                              |

---

## 🚛 In Transit

| KPI Name                         | Chart Type     | Notes                                  |
|----------------------------------|----------------|----------------------------------------|
| Delivered vs In-Transit Trips   | Donut Chart    | Do not exceed donut chart usage        |
| Trip Delay Flag (SLA breached)  | Stat Tile      | Alert card                             |
| Over Speed Alerts               | Stat Tile      | Count + %                              |
| Route Deviation                 | Stat Tile      | Flagged trips                          |
| Temperature Breach              | Stat Tile      | Reefer/Pharma special trips            |
| Night Driving Trips             | Stat Tile      | Safety flag                            |

---

## 📦 Post Delivery

### 1. ePOD KPIs

| KPI Name                         | Chart Type    | Notes                              |
|----------------------------------|---------------|------------------------------------|
| ePOD Submitted vs Pending        | Donut Chart   | Used once                          |
| Approval Status Split            | Donut Chart   | Last donut chart allowed           |
| Rejected Reason Split            | Bar Chart     | Damaged / Missing / Shortage       |
| Delivered: Journey Status        | Stat Tile     | 509 of 549 journeys                |

### 2. Freight Invoicing & Reconciliation

| KPI Name                                | Chart Type    | Notes                                      |
|-----------------------------------------|---------------|--------------------------------------------|
| Total Invoiced Amount                   | Stat Tile     | ₹ 509 Cr (180 invoices)                    |
| Approved Invoices                       | Stat Tile     | Amount + (count)                           |
| Pending Approval                        | Stat Tile     | Amount + (count)                           |
| Rejected Invoices                       | Stat Tile     | Amount + (count)                           |
| Disputed Invoices                       | Stat Tile     | Amount + (count)                           |
| Overcharged / Raised Cases              | Bar Chart     | Max 2 bar charts already used in post flow |
| Settled Invoices                        | Stat Tile     | Final stage                               |

---

## 🧭 Final KPI Layout Summary

- **Donut Chart** (Max: 6 uses): Order Assignment, Indent, Accepted Split, Trip Delivery, ePOD Submitted, ePOD Approval
- **Bar Chart** (Max: 6 uses): Assignment Pending, Reporting Pending, Loading TAT, Rejection Reasons, Raised/Overcharged
- **Stat Tile**: Used freely for count, amount, or percentage
- **Line Chart**: Only for Planning trends

---

## 💡 Dashboard UX Guidelines

- Use **section headers** as sticky tabs: Planning | Pre Dispatch | In Transit | Post Delivery
- Stat Tiles should show **amount + (count)** when relevant (e.g. ₹509 Cr (180))
- Use **alerts (red)** for SLA breach, pending approvals, over speeding
- Disable repeated donut/bar types across same section
---

## 🚛 FTL vs PTL Tabs

Add tabs within each section to toggle between FTL and PTL KPIs.

---

## 🚚 Pre Dispatch (Indent, Pre Transit, At Loading)

### FTL

| KPI Name                         | Chart Type     | Notes                                 |
|----------------------------------|----------------|---------------------------------------|
| Indent Status (Accepted/Pending) | Donut Chart    | Used once                             |
| Accepted Split (Reporting/Assign)| Donut Chart    | 2nd usage of donut                    |
| Vehicle Assignment Pending       | Bar Chart      | Time buckets: 6h, 4h, 2h              |
| Vehicle Reporting Pending        | Bar Chart      | Same bar format, different KPI        |
| Active Pre-Transits              | Stat Tile      | Count only                            |
| Delay for Fulfilment             | Stat Tile      | With alert color if breached          |

### PTL

| KPI Name                            | Chart Type     | Notes                                 |
|-------------------------------------|----------------|---------------------------------------|
| Indent Status (Accepted/Pending)    | Donut Chart    | Separate PTL indent status            |
| Pickup Allocation Delay             | Bar Chart      | Delay in pickup truck assignment      |
| Hub Reporting SLA Breach            | Stat Tile      | % or count                            |
| Bags Awaiting Pickup                | Stat Tile      | # of bags delayed for pickup          |
| Pickup SLA Breached                 | Stat Tile      | Based on order commitment             |

---

## 🚛 In Transit

### PTL

| KPI Name                            | Chart Type     | Notes                                  |
|-------------------------------------|----------------|----------------------------------------|
| Shipments in Transit                | Stat Tile      | Total live shipments                   |
| Delay Flags (Hub to Hub)            | Stat Tile      | SLA breach flags                       |
| Network Utilisation (Hub Trips)     | Bar Chart      | How many hubs used per route           |
| Bag Loss or Damage                  | Stat Tile      | Claims count or risk alerts            |
| Waybill not Scanned at Hub          | Stat Tile      | Possible visibility issue              |

---

## 📦 Post Delivery

### PTL - ePOD & Invoicing

| KPI Name                            | Chart Type    | Notes                                      |
|-------------------------------------|---------------|--------------------------------------------|
| ePOD Submission (Bags)              | Donut Chart   | Submitted vs Pending                       |
| ePOD Approval Split                 | Donut Chart   | Approved, Rejected, Pending                |
| Rejection Reasons (Bag level)       | Bar Chart     | Damaged / Shortage / Others                |
| Total Freight Invoiced (PTL)        | Stat Tile     | ₹ XX Cr (XX invoices)                      |
| PTL Reco - Raised vs Settled Cases  | Bar Chart     | Freight reconciliation stage               |
