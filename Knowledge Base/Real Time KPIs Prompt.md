# Real-Time Operational KPIs Dashboard (TMS)

## ✅ Goal
Design a dashboard module that shows **live operational KPIs** across all shipment and trip activities. This view is meant for real-time decision-making, not historical performance. Include **CXO**, **Company (L1)**, and **Branch (L2)** login levels.

---

## 👥 User Types

| User        | Access Scope                        | Primary Need                                       |
|-------------|-------------------------------------|----------------------------------------------------|
| CXO         | Pan-India view (macro ops status)   | Snapshot of current load, exceptions, active ops   |
| Company (L1)| All branches under the company      | Monitoring operational throughput across network   |
| Branch (L2) | Only their assigned branch ops      | Tracking own workload and immediate exceptions     |

---

## 📊 KPI Groups & Definitions (Live Data Only)

### 1. 🚚 Trips & Orders In Progress

| KPI Name             | Description                            | Chart Type  | CXO View              | L1 View             | L2 View            |
|----------------------|-----------------------------------------|-------------|------------------------|----------------------|---------------------|
| Active Trips         | Trips currently in progress             | Stat Tile   | Total network count    | All branches         | Branch-specific     |
| Orders in Transit    | Orders currently on the move            | Stat Tile   | Org-wide view          | All branches         | Branch-specific     |
| Orders to Deliver    | At delivery hub, not delivered yet      | Stat Tile   | Network-level summary  | Region-level         | Branch-specific     |
| Active Vehicles      | Vehicles that are running now           | Stat Tile   | Total count            | All branches         | Own vehicles        |

---

### 2. ⏳ Pending Actions

| KPI Name             | Description                              | Chart Type  | CXO View       | L1 View             | L2 View         |
|----------------------|-------------------------------------------|-------------|----------------|----------------------|------------------|
| Unassigned Orders    | Not yet allocated to trips                | Stat Tile   | High-level flag | Total pending orders | Branch-level     |
| Not Picked Up Orders | Assigned but not picked up               | Stat Tile   | Exception alert | All branches         | Own branch       |
| Delayed Orders       | Over 1 hr late vs ETA                     | Stat Tile   | Critical alert  | Aggregated           | Branch-level     |
| Delay Alerts         | Alerts triggered for delays               | Alert Count | Global count    | All alerting orders  | Branch-specific  |

---

### 3. 📍 Vehicle Status Locations

| KPI Name               | Description                              | Chart Type  | CXO View        | L1 View             | L2 View         |
|------------------------|-------------------------------------------|-------------|-----------------|----------------------|------------------|
| At Loading Point       | Trucks waiting to load                    | Stat Tile   | Network load     | All hubs             | Own branch only  |
| At Unloading Point     | Trucks reached but not yet delivered      | Stat Tile   | Bottlenecks      | All destinations     | Own consignee hubs |
| At Transfer Stops      | Midway vehicle transfers                  | Stat Tile   | Transfer ops     | All regions          | Branch-specific  |

---

### 4. ⚠️ Exceptions & Process Flags

| KPI Name              | Description                                 | Chart Type   | CXO View           | L1 View             | L2 View         |
|-----------------------|----------------------------------------------|--------------|---------------------|----------------------|------------------|
| Exception Flags       | Total exception events (by type)            | Icon Stat    | High attention area | Segmented view       | Branch-specific  |
| Gate-In Pending       | Vehicle near location but not gated in       | Stat Tile    | Risk alerts         | All vehicles         | Local count      |
| ePOD Not Uploaded     | Delivered, but proof not uploaded            | Stat Tile    | Compliance metric   | All completed orders | Branch-level     |

---

## 🧠 Visual & UX Guidelines

- Use **stat tiles**, **colored chip indicators**, or **icon-value badges**
- Recommended color coding:
  - 🟢 Green → All good
  - 🟠 Orange → Pending action
  - 🔴 Red → Needs urgent attention
- Icons: 🛻 for trips, 📦 for orders, ⚠️ for delays/exceptions

---

## 🔄 Update Strategy

- Refresh via **websocket or polling every 2–5 min**
- Use real-time sync for GPS, tracking updates, and alert statuses
