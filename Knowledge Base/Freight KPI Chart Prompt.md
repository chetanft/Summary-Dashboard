# Prompt: Implement Correct KPI Chart for Freight (Budget vs Actual vs Projected)

## 📈 Component Name:
**Freight KPI Chart — Budget vs Actual vs Projected**

## 🧠 Purpose:
Visualize the freight spend for the month, comparing:
- **Budget**: The allocated spend (constant)
- **Actual**: The cumulative spend so far
- **Projected**: The trend-based forecast till end of month

---

## ✅ Functional Logic

### 1. Budget
- Render as a **straight horizontal line** across the month.
- Value is fixed, e.g., ₹20 Cr.
- Color: `#00C638` (Green dashed line).
- Purpose: Acts as the benchmark.

### 2. Projected
- Render as a **ramp (diagonal line)** starting from the current actual value to projected end value.
- Value: e.g., ₹22 Cr (above budget).
- Color: `#FF3533` (Red dotted line).
- Purpose: Estimate if freight will overshoot or stay within budget.

### 3. Actual
- Render as an **area chart** starting from ₹0 to current cumulative spend (e.g., ₹10 Cr mid-month).
- Color: Black line with grey gradient fill.
- Purpose: Shows actual consumption so far.

---

## 🧩 Chart Behavior

- X-Axis: Show full month dates (e.g., 1–30 March)
- Y-Axis: Use clean ₹ values (e.g., ₹0, ₹10 Cr, ₹20 Cr, ₹30 Cr)
- Tooltip: On hover, show all 3 values:
  - Actual till that day
  - Budget (constant)
  - Projected (linear interpolation)
- Legend:
  - Green dashed — Budget
  - Red dotted — Projected
  - Black filled — Actual

---

## 🎨 UI Styling

- Title: `Budgeted vs Actual vs Projected Freight`
- Top KPIs:
  - ₹10 Cr (Actual)
  - ₹22 Cr ↑ (Projected, with red arrow if over budget)
  - ₹20 Cr (Budget)
- Use whitespace, card container, and consistent padding
- Match visual tone of surrounding summary dashboard

---

## 🔄 Data Format (Example)

```json
{
  "actual": [
    { "date": "2025-03-01", "value": 1.2 },
    { "date": "2025-03-02", "value": 2.5 },
    ...
    { "date": "2025-03-15", "value": 10.0 }
  ],
  "projectedValue": 22,
  "budgetValue": 20
}
```

---

## 🛠 Chart Library Suggestion

Use **Recharts**, **Chart.js**, or **ApexCharts**. Support:
- Custom grid lines
- Multiple trend lines
- Area chart fill for Actual
- Dashed/dotted style for Budget and Projected

---

## 🔁 Update Strategy

- Refresh daily or in near real-time if needed
- Allow switching months via filter (optional)