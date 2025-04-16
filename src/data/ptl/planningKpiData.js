/**
 * Mock data for Planning KPIs
 */

export const planningKpiData = {
  title: "Planning",
  kpis: [
    {
      id: "orders-created",
      name: "Orders Created",
      type: "stat-tile",
      value: 245,
      trend: "up",
      trendValue: 12,
      status: "normal",
      unit: "",
      metadata: {
        description: "Day-wise view of orders created",
        thresholds: {
          warning: 200,
          critical: 300
        }
      }
    },
    {
      id: "orders-assigned",
      name: "Orders Assigned to Trip",
      type: "donut-chart",
      chartData: [
        { name: "Assigned", value: 75, color: "#4CAF50" },
        { name: "Pending", value: 25, color: "#FFC107" }
      ],
      metadata: {
        description: "Percentage of orders assigned to trips",
        total: 100
      }
    },
    {
      id: "order-trip-match-rate",
      name: "Order vs Trip Match Rate",
      type: "stat-tile",
      value: 92,
      trend: "up",
      trendValue: 3,
      status: "normal",
      unit: "%",
      metadata: {
        description: "Percentage of orders matched with trips",
        thresholds: {
          warning: 85,
          critical: 75
        }
      }
    },
    {
      id: "trip-creation-trend",
      name: "Trip Creation Trend",
      type: "line-chart",
      chartData: [
        { date: "Apr 1", value: 32 },
        { date: "Apr 5", value: 28 },
        { date: "Apr 10", value: 35 },
        { date: "Apr 15", value: 42 },
        { date: "Apr 20", value: 38 },
        { date: "Apr 25", value: 45 },
        { date: "Apr 30", value: 48 }
      ],
      metadata: {
        description: "Volume trend last 30 days",
        unit: "trips"
      }
    }
  ]
};

export default planningKpiData;
