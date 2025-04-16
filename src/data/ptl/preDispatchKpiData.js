/**
 * Mock data for Pre Dispatch KPIs (FTL and PTL)
 */

export const preDispatchKpiData = {
  title: "Pre Dispatch",
  ftl: {
    kpis: [
      {
        id: "indent-status",
        name: "Indent Status",
        type: "donut-chart",
        chartData: [
          { name: "Accepted", value: 68, color: "#4CAF50" },
          { name: "Pending", value: 32, color: "#FFC107" }
        ],
        metadata: {
          description: "Status of indents (accepted vs pending)",
          total: 100
        }
      },
      {
        id: "accepted-split",
        name: "Accepted Split",
        type: "donut-chart",
        chartData: [
          { name: "Reporting", value: 45, color: "#2196F3" },
          { name: "Assign", value: 55, color: "#9C27B0" }
        ],
        metadata: {
          description: "Split of accepted indents",
          total: 100
        }
      },
      {
        id: "vehicle-assignment-pending",
        name: "Vehicle Assignment Pending",
        type: "bar-chart",
        chartData: [
          { bucket: "6h+", value: 12, color: "#FF3533" },
          { bucket: "4-6h", value: 8, color: "#FFC107" },
          { bucket: "2-4h", value: 15, color: "#4CAF50" },
          { bucket: "0-2h", value: 22, color: "#2196F3" }
        ],
        metadata: {
          description: "Time buckets for pending vehicle assignments",
          unit: "vehicles"
        }
      },
      {
        id: "vehicle-reporting-pending",
        name: "Vehicle Reporting Pending",
        type: "bar-chart",
        chartData: [
          { bucket: "6h+", value: 8, color: "#FF3533" },
          { bucket: "4-6h", value: 12, color: "#FFC107" },
          { bucket: "2-4h", value: 18, color: "#4CAF50" },
          { bucket: "0-2h", value: 25, color: "#2196F3" }
        ],
        metadata: {
          description: "Time buckets for pending vehicle reporting",
          unit: "vehicles"
        }
      },
      {
        id: "active-pre-transits",
        name: "Active Pre-Transits",
        type: "stat-tile",
        value: 42,
        trend: "up",
        trendValue: 5,
        status: "normal",
        unit: "",
        metadata: {
          description: "Count of active pre-transits",
          thresholds: {
            warning: 50,
            critical: 60
          }
        }
      },
      {
        id: "delay-for-fulfilment",
        name: "Delay for Fulfilment",
        type: "stat-tile",
        value: 3.5,
        trend: "down",
        trendValue: 0.5,
        status: "warning",
        unit: "hrs",
        metadata: {
          description: "Average delay for fulfillment",
          thresholds: {
            warning: 3,
            critical: 5
          }
        }
      },
      {
        id: "avg-loading-tat",
        name: "Avg Loading TAT per plant",
        type: "bar-chart",
        chartData: [
          { plant: "Plant A", value: 2.5, color: "#4CAF50" },
          { plant: "Plant B", value: 3.2, color: "#FFC107" },
          { plant: "Plant C", value: 4.1, color: "#FF3533" },
          { plant: "Plant D", value: 2.8, color: "#4CAF50" }
        ],
        metadata: {
          description: "Average loading TAT per plant",
          unit: "hrs"
        }
      },
      {
        id: "yard-occupancy",
        name: "Yard Occupancy (Truck Count)",
        type: "stat-tile",
        value: 28,
        trend: "up",
        trendValue: 3,
        status: "normal",
        unit: "trucks",
        metadata: {
          description: "Live count of trucks in yard",
          thresholds: {
            warning: 35,
            critical: 45
          }
        }
      },
      {
        id: "dock-utilisation",
        name: "Dock Utilisation",
        type: "stat-tile",
        value: 78,
        trend: "up",
        trendValue: 5,
        status: "normal",
        unit: "%",
        metadata: {
          description: "Percentage of dock utilization",
          thresholds: {
            warning: 85,
            critical: 95
          }
        }
      }
    ]
  },
  ptl: {
    kpis: [
      {
        id: "ptl-indent-status",
        name: "Indent Status",
        type: "donut-chart",
        chartData: [
          { name: "Accepted", value: 72, color: "#4CAF50" },
          { name: "Pending", value: 28, color: "#FFC107" }
        ],
        metadata: {
          description: "Status of PTL indents (accepted vs pending)",
          total: 100
        }
      },
      {
        id: "pickup-allocation-delay",
        name: "Pickup Allocation Delay",
        type: "bar-chart",
        chartData: [
          { bucket: "6h+", value: 8, color: "#FF3533" },
          { bucket: "4-6h", value: 12, color: "#FFC107" },
          { bucket: "2-4h", value: 18, color: "#4CAF50" },
          { bucket: "0-2h", value: 25, color: "#2196F3" }
        ],
        metadata: {
          description: "Delay in pickup truck assignment",
          unit: "hours"
        }
      },
      {
        id: "hub-reporting-sla-breach",
        name: "Hub Reporting SLA Breach",
        type: "stat-tile",
        value: 15,
        trend: "down",
        trendValue: 3,
        status: "warning",
        unit: "%",
        metadata: {
          description: "Percentage of hub reporting SLA breaches",
          thresholds: {
            warning: 10,
            critical: 20
          }
        }
      },
      {
        id: "bags-awaiting-pickup",
        name: "Bags Awaiting Pickup",
        type: "stat-tile",
        value: 42,
        trend: "up",
        trendValue: 8,
        status: "normal",
        unit: "bags",
        metadata: {
          description: "Number of bags delayed for pickup",
          thresholds: {
            warning: 50,
            critical: 70
          }
        }
      },
      {
        id: "pickup-sla-breached",
        name: "Pickup SLA Breached",
        type: "stat-tile",
        value: 12,
        trend: "down",
        trendValue: 2,
        status: "warning",
        unit: "%",
        metadata: {
          description: "Percentage of pickup SLA breaches",
          thresholds: {
            warning: 10,
            critical: 15
          }
        }
      }
    ]
  }
};

export default preDispatchKpiData;
