/**
 * Mock data for Pre Dispatch KPIs (FTL and PTL)
 */

export const preDispatchKpiData = {
  title: "Pre Dispatch",
  ftl: {
    indentStatus: {
      id: "indent-status",
      name: "Indent Status",
      value: 100,
      trend: "up",
      trendValue: 2,
      breakdown: {
        accepted: { value: 68, percentage: 68 },
        pending: { value: 32, percentage: 32 }
      },
      chartData: [
        { name: "Accepted", value: 68, color: "#4CAF50" },
        { name: "Pending", value: 32, color: "#FFC107" }
      ]
    },
    acceptedSplit: {
      id: "accepted-split",
      name: "Accepted Split",
      value: 68,
      breakdown: {
        reporting: { value: 31, percentage: 45 },
        assign: { value: 37, percentage: 55 }
      },
      chartData: [
        { name: "Reporting", value: 45, color: "#2196F3" },
        { name: "Assign", value: 55, color: "#9C27B0" }
      ]
    },
    pickupSlaBreached: {
      id: "pickup-sla-breached",
      name: "Pickup SLA Breached",
      value: 12,
      unit: "%",
      trend: "down",
      trendValue: 3,
      status: "warning",
      slaBreakdown: [
        { category: ">4 hours", value: 3 },
        { category: "2-4 hours", value: 5 },
        { category: "<2 hours", value: 4 }
      ]
    }
  },
  ptl: {
    orderBookingStatus: {
      id: "order-booking-status",
      name: "Order Booking Status",
      value: 100,
      breakdown: {
        booked: { value: 75, percentage: 75 },
        pending: { value: 25, percentage: 25 }
      },
      chartData: [
        { name: "Booked", value: 75, color: "#4CAF50" },
        { name: "Pending", value: 25, color: "#FFC107" }
      ]
    },
    bookedOrderStatus: {
      id: "booked-order-status",
      name: "Booked Order Status",
      value: 75,
      breakdown: {
        assigned: { value: 60, percentage: 80 },
        unassigned: { value: 15, percentage: 20 }
      },
      chartData: [
        { name: "Assigned", value: 80, color: "#2196F3" },
        { name: "Unassigned", value: 20, color: "#9C27B0" }
      ]
    },
    pickupDelayFlags: {
      id: "pickup-delay-flags",
      name: "Pickup Delay Flags",
      value: 15,
      unit: "%",
      trend: "down",
      trendValue: 2,
      status: "warning",
      delayBreakdown: [
        { category: ">4 hours", value: 4 },
        { category: "2-4 hours", value: 6 },
        { category: "<2 hours", value: 5 }
      ]
    }
  }
};

export default preDispatchKpiData;
