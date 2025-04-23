/**
 * Mock data for In Transit KPIs (FTL and PTL)
 */

export const inTransitKpiData = {
  title: "In Transit",
  ftl: {
    deliveredVsInTransit: {
      id: "delivered-vs-in-transit",
      name: "Delivered vs In-Transit Trips",
      value: 100,
      breakdown: {
        delivered: { value: 65, percentage: 65 },
        inTransit: { value: 35, percentage: 35 }
      },
      chartData: [
        { name: "Delivered", value: 65, color: "#4CAF50" },
        { name: "In-Transit", value: 35, color: "#2196F3" }
      ]
    },
    tripDelayFlag: {
      id: "trip-delay-flag",
      name: "Trip Delay Flag (SLA breached)",
      value: 18,
      unit: "%",
      trend: "down",
      trendValue: 3,
      status: "warning",
      delayBreakdown: [
        { category: ">8 hours", value: 5 },
        { category: "4-8 hours", value: 7 },
        { category: "<4 hours", value: 6 }
      ]
    },
    etaAccuracy: {
      id: "eta-accuracy",
      name: "ETA Accuracy",
      value: 82,
      unit: "%",
      trend: "up",
      trendValue: 2,
      status: "normal",
      accuracyTrend: [
        { date: "2023-06-01", value: 78 },
        { date: "2023-06-08", value: 80 },
        { date: "2023-06-15", value: 81 },
        { date: "2023-06-22", value: 82 }
      ]
    }
  },
  ptl: {
    shipmentsInTransit: {
      id: "shipments-in-transit",
      name: "Shipments In-Transit",
      value: 128,
      trend: "up",
      trendValue: 5,
      status: "normal"
    },
    delayFlagsHubToHub: {
      id: "delay-flags-hub-to-hub",
      name: "Delay Flags (Hub to Hub)",
      value: 22,
      unit: "%",
      trend: "down",
      trendValue: 3,
      status: "warning",
      delayBreakdown: [
        { category: ">8 hours", value: 6 },
        { category: "4-8 hours", value: 9 },
        { category: "<4 hours", value: 7 }
      ]
    },
    hubDwellTime: {
      id: "hub-dwell-time",
      name: "Hub Dwell Time",
      value: 5.2,
      unit: "hours",
      trend: "down",
      trendValue: 0.3,
      status: "normal",
      dwellTimeTrend: [
        { date: "2023-06-01", value: 5.8 },
        { date: "2023-06-08", value: 5.5 },
        { date: "2023-06-15", value: 5.3 },
        { date: "2023-06-22", value: 5.2 }
      ]
    }
  }
};

export default inTransitKpiData;
