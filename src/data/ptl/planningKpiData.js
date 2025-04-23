/**
 * Mock data for Planning KPIs
 */

export const planningKpiData = {
  title: "Planning",
  totalOrders: {
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
  },
  plannedLogisticCost: {
    id: "planned-logistic-cost",
    name: "Planned Logistic Cost",
    value: 21.71,
    unit: "Cr",
    trend: "up",
    trendValue: 4,
    transporters: [
      { name: "Laxmi Transporters", value: 4.2, percentage: 19.3, color: "#FF5252" },
      { name: "Singh Transporters", value: 3.2, percentage: 14.7, color: "#26A69A" },
      { name: "Yones Transporters", value: 2.7, percentage: 12.4, color: "#42A5F5" },
      { name: "Others", value: 10.1, percentage: 46.5, color: "#3949AB" }
    ]
  },
  ordersPlanned: {
    id: "orders-planned",
    name: "Orders Planned",
    value: 104,
    percentage: 10.4,
    trend: "up",
    trendValue: 4,
    fulfillment: {
      fulfilled: { value: 35, percentage: 76 },
      unfulfilled: { value: 11, percentage: 24 }
    },
    slaBreached: [
      { category: ">4 days", value: 4 },
      { category: "1-4 days", value: 5 },
      { category: "1 day", value: 2 }
    ]
  }
};

export default planningKpiData;
