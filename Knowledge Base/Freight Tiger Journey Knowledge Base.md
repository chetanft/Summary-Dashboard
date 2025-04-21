# Freight Tiger – Journey Module Knowledge Base (For Augmented Code)

This document summarizes the UI/UX and functional breakdown of the Journey module as designed for the Freight Tiger platform. It includes insights based on user workflows, screen designs, API data, and milestone-based journey visualization.

---

## 🔧 System Overview

Freight Tiger manages Full Truck Load (FTL) and Part Truck Load (PTL) journeys. A journey can be created by:
1. Add Journey Page (UI)
2. Excel Bulk Upload
3. SAP Integration
4. Indent Module Automation

The core lifecycle of a journey includes:
- Journey creation (via POST /v1/journey/add)
- Stop-wise route planning
- Load and invoice attachment
- Tracking, Alerts, Yard operations
- ePOD submission and Freight Invoicing

---

## 🚚 Journey Lifecycle and Status Milestones

Each journey transitions through these key milestones:

1. **Pre-Transit** – Driver/vehicle assignment, consent tracking
2. **At Origin** – Gate In, Dock In/Out, Yard Checklists
3. **In Transit** – Real-time tracking, route adherence, alerts
4. **At Destination** – Final unloading and outscan
5. **Return** – Round trip support (pickup/drop on return)
6. **Delivered** – Final delivery confirmation
7. **POD Workflow** – Submission, approval, or dispute
8. **Invoicing** – Invoice metadata and reconciliation
9. **Alerts & Exceptions** – Real-time escalation and ticketing

---

## 🧱 Component Structure for UI

### Atoms
- Status tags (e.g., On Time, Delayed, Approved, Detained)
- Buttons (Primary, Icon-only, Ellipsis)
- Typography (Headings, Meta labels, Timestamp)
- Color tokens (green, red, yellow, gray)

### Molecules
- JourneyListRow (From → To, SLA, Driver, Status)
- InvoiceItemRow (Material, SKU, Quantity, Weight, Price)
- AlertCard (Alert ID, Type, Duration, Ticket ID)
- StopCard (Gate In/Out, Checklist, Seal #, Timestamps)

### Organisms
- Tracking View with vehicle info, map, trip summary
- Loads Tab with sender, consignee, invoice metadata
- Alerts Tab grouped by parent-child structure
- In Yard Management with checklists and dock actions
- Journey Summary with timeline and milestone data

---

## 📐 Layout & UX Design

- 12-column responsive layout
- Cards used for stops, alerts, invoices, and events
- Filter tabs for journey views (Planned, In Transit, Delivered)
- Visual timeline and milestone progress indicator
- Sticky headers and right panels for summary or activity logs
- Alert color coding and ticket integration for exceptions

---

## 📦 Journey Details at Each Milestone

A complete breakdown of fields and UI sections per milestone is provided in `Journey_Details_Milestones.md`.

Each milestone includes:
- Timestamps
- Status indicators
- Quantity details
- Documents/photos
- Exception alerts
- Operational SLAs

---

## 📊 Filters Logic for Branch-Based Views

| Filter Name | Created By | Action | Branch Role |
|-------------|------------|--------|--------------|
| Outbound - Source | Logged-in Branch | Dispatch | Source Branch |
| Inbound - Source | Logged-in Branch | Receiving | Destination Branch |
| Outbound - Pickup | Another Branch | Pickup | Intermediate |
| Inbound - Drop | Another Branch | Drop | Intermediate |

---

## 🛠️ Supporting Features

- **SIM/GPS Tracking**: Dynamic tracking source display
- **Consent Management**: Pending/Rejected tracking visibility
- **POD Workflow**: Submission + Approval + Rejection handling
- **Alert System**: Long Stoppage, Diversion, Delay, etc.
- **Invoice Reconciliation**: GST/tax metadata, matched invoice numbers
- **Driver Checklists**: License, sobriety, toolkit, vehicle hygiene

---

## 📁 Uploads and Visual Proof

- Driver documents
- POD images
- Crate/item photos
- Bolt seal & temperature capture

---

## 🔧 For Augmented Code

Use this document to:
- Create component-level scaffolds (atoms → molecules → organisms)
- Update design tokens (status colors, border styles)
- Build page templates with 12-column grid and sticky headers
- Define API bindings for tracking, invoice, and alert data
- Ensure accessibility (WCAG AA) and logistics-optimized layouts

This knowledge base supports scalable, AI-driven UI generation for the Freight Tiger Journey module.
