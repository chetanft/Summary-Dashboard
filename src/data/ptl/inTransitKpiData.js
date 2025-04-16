/**
 * Mock data for In Transit KPIs (FTL and PTL)
 */

export const inTransitKpiData = {
  title: "In Transit",
  ftl: {
    kpis: [
      {
        id: "delivered-vs-in-transit",
        name: "Delivered vs In-Transit Trips",
        type: "donut-chart",
        chartData: [
          { name: "Delivered", value: 65, color: "#4CAF50" },
          { name: "In-Transit", value: 35, color: "#2196F3" }
        ],
        metadata: {
          description: "Split of delivered vs in-transit trips",
          total: 100
        }
      },
      {
        id: "trip-delay-flag",
        name: "Trip Delay Flag (SLA breached)",
        type: "stat-tile",
        value: 18,
        trend: "down",
        trendValue: 3,
        status: "warning",
        unit: "%",
        metadata: {
          description: "Percentage of trips with SLA breach",
          thresholds: {
            warning: 15,
            critical: 25
          }
        }
      },
      {
        id: "over-speed-alerts",
        name: "Over Speed Alerts",
        type: "stat-tile",
        value: 12,
        trend: "down",
        trendValue: 2,
        status: "warning",
        unit: "%",
        metadata: {
          description: "Percentage of trips with over-speed alerts",
          thresholds: {
            warning: 10,
            critical: 15
          }
        }
      },
      {
        id: "route-deviation",
        name: "Route Deviation",
        type: "stat-tile",
        value: 8,
        trend: "down",
        trendValue: 1,
        status: "normal",
        unit: "%",
        metadata: {
          description: "Percentage of trips with route deviation",
          thresholds: {
            warning: 10,
            critical: 15
          }
        }
      },
      {
        id: "temperature-breach",
        name: "Temperature Breach",
        type: "stat-tile",
        value: 5,
        trend: "down",
        trendValue: 1,
        status: "normal",
        unit: "%",
        metadata: {
          description: "Percentage of reefer/pharma trips with temperature breach",
          thresholds: {
            warning: 5,
            critical: 10
          }
        }
      },
      {
        id: "night-driving-trips",
        name: "Night Driving Trips",
        type: "stat-tile",
        value: 32,
        trend: "up",
        trendValue: 4,
        status: "normal",
        unit: "%",
        metadata: {
          description: "Percentage of trips with night driving",
          thresholds: {
            warning: 40,
            critical: 50
          }
        }
      }
    ]
  },
  ptl: {
    kpis: [
      {
        id: "shipments-in-transit",
        name: "Shipments in Transit",
        type: "stat-tile",
        value: 128,
        trend: "up",
        trendValue: 12,
        status: "normal",
        unit: "",
        metadata: {
          description: "Total live shipments",
          thresholds: {
            warning: 150,
            critical: 200
          }
        }
      },
      {
        id: "delay-flags-hub-to-hub",
        name: "Delay Flags (Hub to Hub)",
        type: "stat-tile",
        value: 15,
        trend: "down",
        trendValue: 2,
        status: "warning",
        unit: "%",
        metadata: {
          description: "Percentage of hub-to-hub delays",
          thresholds: {
            warning: 10,
            critical: 20
          }
        }
      },
      {
        id: "network-utilisation",
        name: "Network Utilisation (Hub Trips)",
        type: "bar-chart",
        chartData: [
          { hubs: "1 Hub", value: 25, color: "#4CAF50" },
          { hubs: "2 Hubs", value: 42, color: "#2196F3" },
          { hubs: "3 Hubs", value: 28, color: "#FFC107" },
          { hubs: "4+ Hubs", value: 5, color: "#FF3533" }
        ],
        metadata: {
          description: "Distribution of routes by number of hubs used",
          unit: "%"
        }
      },
      {
        id: "bag-loss-or-damage",
        name: "Bag Loss or Damage",
        type: "stat-tile",
        value: 3,
        trend: "down",
        trendValue: 1,
        status: "normal",
        unit: "%",
        metadata: {
          description: "Percentage of bags lost or damaged",
          thresholds: {
            warning: 5,
            critical: 8
          }
        }
      },
      {
        id: "waybill-not-scanned",
        name: "Waybill not Scanned at Hub",
        type: "stat-tile",
        value: 8,
        trend: "down",
        trendValue: 2,
        status: "normal",
        unit: "%",
        metadata: {
          description: "Percentage of waybills not scanned at hub",
          thresholds: {
            warning: 10,
            critical: 15
          }
        }
      }
    ]
  }
};

export default inTransitKpiData;
