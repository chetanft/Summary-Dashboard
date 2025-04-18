#!/bin/bash
export PAGER=cat
cd tms-dashboard
git checkout -b kpi-decimal-formatting
git add src/services/dataService.js src/context/DataContext.jsx src/components/dashboard/EnhancedDashboard.jsx
git commit -m "Format KPI values with one decimal point"
echo "Changes committed to branch kpi-decimal-formatting"
