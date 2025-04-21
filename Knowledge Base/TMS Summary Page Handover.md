
# TMS Summary Page – Prototype Handover Document

## ✅ Overview

This document outlines the prototype requirements for the **Summary Page** of our TMS (Transportation Management System), intended as the **post-login landing screen**. The prototype will simulate a real working dashboard using **auto-refreshing dummy data**, supporting drilldown and color-coded KPI insights.

---

## 🎯 Objective

- Display key **Performance & Operational KPIs**
- Support **role-based visibility** (CXO, Company User, Branch User)
- Enable **guided navigation** through smart click interactions
- Present **real-time-like dummy data** refreshing every 5 minutes
- Provide a **“Refresh Now”** button for demo purposes

---

## 👥 User Personas

| Role         | Scope of Visibility |
|--------------|---------------------|
| CXO          | National (Regions + Branches) |
| Company User | Regional (Branches within Region) |
| Branch User  | Transporter/Client Level |

---

## 🖼️ UI Layout (from shared design)

The layout includes:
- A **top KPI band** with 4–6 major KPIs
- A **mid-section graph area** for visual KPIs (dual line, area, bar charts)
- A **lower section** with escalations or operational alerts in KPI card format

Visuals to include:
- **Bar charts**, **dual line graphs**, **donuts**, and **colored KPI chips**
- Tooltips and legends where comparisons are present
- Drilldown panel on right pane when a KPI is clicked (for CXO, Company)
- **Filter-based redirection** for operational KPI cards (Branch user)

---

## 📊 KPI Structure

Each KPI includes:
- **ID** (for frontend mapping)
- **Label** (display name)
- **Value** (actual number)
- **Unit** (e.g., %, INR/km)
- **Color** (red/yellow/green based on benchmark logic)
- **Trend** (optional sparkline data)
- **Click Behavior** (drilldown or redirection)

Refer to the included `tms_summary_page_dummy_data.json` for full structure.

---

## 🧪 Data Simulation

- A full dummy data file is provided
- Auto-refresh using `setInterval()` every 5 minutes
- Manual “Refresh Now” button should trigger the same data reload logic

[Dummy JSON file](sandbox:/mnt/data/tms_summary_page_dummy_data.json)

---

## ⚙️ Drilldown Logic

| KPI Type | Interaction |
|----------|-------------|
| Performance KPI (CXO/Company) | Region → Branch drilldown with top/bottom 5 sorted by KPI |
| Performance KPI (Branch) | Opens transporter/material/client view |
| Operational KPI (All) | Redirects to respective module list with filters applied (e.g., delayed=true) |

---

## ✅ Tech Stack Suggestion

| Component | Recommendation |
|----------|----------------|
| Frontend | React or plain HTML/JS |
| Charts | Recharts or Chart.js |
| State | useState / useEffect or Zustand |
| Hosting | Vercel / Netlify |

---

## 🧩 Notes for Cursor AI / Bolt AI

- Use the provided structure to **build dummy APIs or local state simulation**
- Treat each KPI as a component (configurable via JSON)
- Ensure responsiveness for large screen layouts
- Include a toggle for user roles (CXO, Company, Branch) to preview visibility

---

**Attachments:**
- ✅ `tms_summary_page_dummy_data.json` – Dummy KPI payload (refresh every 5 min)
