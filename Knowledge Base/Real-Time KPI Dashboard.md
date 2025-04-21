
# Real-Time Operational KPIs Dashboard (TMS) – Updated Grouping

This is an update to the previously generated operational KPIs layout. KPIs are now **grouped together** in combined KPI cards to reduce visual clutter and improve comprehension.

---

## ✅ Objective

Design KPI groups that **combine multiple live metrics** into fewer tiles, while retaining clarity and fast comprehension for operations teams. These are **real-time KPIs** meant for snapshot views.

---

## 👤 User Types

| User        | Scope                        | Use Case                                         |
|-------------|------------------------------|--------------------------------------------------|
| CXO         | Nationwide ops               | Macro view, issues, bottlenecks, live exceptions |
| Company (L1)| Across branches               | Operational health across network                |
| Branch (L2) | Specific branch               | Execution status & issue resolution              |

---

## 📊 Updated KPI Groups (Combined)

### 1. 🚧 Planning & Indent Bottlenecks

**Title:** *Planning & Indent Health*  
**KPIs:**  
- Planned Orders  
- Pending Planning (Unplanned, Partial, In Progress)  
- Active Indents (Acceptance Pending, Assignment Pending, Expired/Cancelled/Changed)

**Chart Type:** Stacked Bar  
**KPI Values:** Count by sub-type  
**Views:**  
- CXO: Region breakdown  
- L1: Branch-level  
- L2: Own planning queue  

---

### 2. 🏭 Plant & Yard Snapshot

**Title:** *Plant & Yard Operations*  
**KPIs:**  
- En Route to Loading  
- Fulfillment Delayed  
- At Plant, At Dock, Detained  
- TATs (In Plant TAT, Dock TAT)

**Chart Type:** Horizontal Bar + Micro badge tiles  
**KPI Values:** Count per stage + average duration  
**Views:**  
- CXO: Top delays  
- L1: Yard-wise split  
- L2: Own vehicles in yard  

---

### 3. 🚛 Live Trip Monitoring

**Title:** *Trips in Transit*  
**KPIs:**  
- Active Trips  
- Delayed Trips  
- Delivering Today  
- Untracked Trips  

**Chart Type:** Donut / Pie Chart  
**KPI Values:** % share of each trip state  
**Views:**  
- CXO: Macro-level split  
- L1: Trip alert summary  
- L2: Ongoing trips for the branch  

---

### 4. 📦 ePOD Lifecycle

**Title:** *ePOD Document Status*  
**KPIs:**  
- Pending, Approved, Disputed, Rejected  

**Chart Type:** Stacked Column  
**KPI Values:** Count by ePOD status  
**Views:**  
- CXO: Compliance tracking  
- L1: By region  
- L2: Delivery team follow-up  

---

### 5. 💸 Freight & Reconciliation

**Title:** *Billing & Closure Status*  
**KPIs:**  
- Invoices: Generated, Approved, Rejected, Debit Revised  
- Reconciliation: Pending, Approved, Disputed  

**Chart Type:** Grouped Bar  
**KPI Values:** Count per financial stage  
**Views:**  
- CXO: Approval cycle health  
- L1: Region-wise status  
- L2: Billing queue  

---

## 🎨 Design Guidance

- All cards fit in a 12-column grid
- Each group covers **2–4 KPIs**
- Refresh every 2–5 mins using websockets or polling
- Use chips, icon tiles, and TAT indicators for clarity
- Color Codes:
  - 🟢 Normal
  - 🟠 Pending
  - 🔴 Delayed/Exception

---

## 📌 Note

This version **replaces** the earlier grouping layout with **fewer but smarter KPI groups** for faster scanning and better space efficiency.
