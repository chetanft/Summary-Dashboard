/**
 * Mock data for Post Delivery KPIs (FTL and PTL)
 */

export const postDeliveryKpiData = {
  title: "Post Delivery",
  ftl: {
    epod: {
      kpis: [
        {
          id: "epod-submitted-vs-pending",
          name: "ePOD Submitted vs Pending",
          type: "donut-chart",
          chartData: [
            { name: "Submitted", value: 78, color: "#4CAF50" },
            { name: "Pending", value: 22, color: "#FFC107" }
          ],
          metadata: {
            description: "Split of ePOD submission status",
            total: 100
          }
        },
        {
          id: "approval-status-split",
          name: "Approval Status Split",
          type: "donut-chart",
          chartData: [
            { name: "Approved", value: 65, color: "#4CAF50" },
            { name: "Pending", value: 25, color: "#FFC107" },
            { name: "Rejected", value: 10, color: "#FF3533" }
          ],
          metadata: {
            description: "Split of ePOD approval status",
            total: 100
          }
        },
        {
          id: "rejected-reason-split",
          name: "Rejected Reason Split",
          type: "bar-chart",
          chartData: [
            { reason: "Damaged", value: 45, color: "#FF3533" },
            { reason: "Missing", value: 30, color: "#FFC107" },
            { reason: "Shortage", value: 25, color: "#2196F3" }
          ],
          metadata: {
            description: "Reasons for ePOD rejection",
            unit: "%"
          }
        },
        {
          id: "delivered-journey-status",
          name: "Delivered: Journey Status",
          type: "stat-tile",
          value: "509 of 549",
          trend: "up",
          trendValue: 12,
          status: "normal",
          unit: "journeys",
          metadata: {
            description: "Status of delivered journeys",
            thresholds: {
              warning: 90,
              critical: 80
            }
          }
        }
      ]
    },
    invoicing: {
      kpis: [
        {
          id: "total-invoiced-amount",
          name: "Total Invoiced Amount",
          type: "stat-tile",
          value: "₹ 509 Cr",
          subtitle: "180 invoices",
          trend: "up",
          trendValue: 15,
          status: "normal",
          unit: "",
          metadata: {
            description: "Total amount invoiced",
            thresholds: {
              warning: 400,
              critical: 300
            }
          }
        },
        {
          id: "approved-invoices",
          name: "Approved Invoices",
          type: "stat-tile",
          value: "₹ 325 Cr",
          subtitle: "112 invoices",
          trend: "up",
          trendValue: 8,
          status: "normal",
          unit: "",
          metadata: {
            description: "Amount and count of approved invoices",
            thresholds: {
              warning: 200,
              critical: 150
            }
          }
        },
        {
          id: "pending-approval",
          name: "Pending Approval",
          type: "stat-tile",
          value: "₹ 98 Cr",
          subtitle: "42 invoices",
          trend: "down",
          trendValue: 5,
          status: "normal",
          unit: "",
          metadata: {
            description: "Amount and count of pending invoices",
            thresholds: {
              warning: 120,
              critical: 150
            }
          }
        },
        {
          id: "rejected-invoices",
          name: "Rejected Invoices",
          type: "stat-tile",
          value: "₹ 45 Cr",
          subtitle: "15 invoices",
          trend: "down",
          trendValue: 3,
          status: "warning",
          unit: "",
          metadata: {
            description: "Amount and count of rejected invoices",
            thresholds: {
              warning: 40,
              critical: 60
            }
          }
        },
        {
          id: "disputed-invoices",
          name: "Disputed Invoices",
          type: "stat-tile",
          value: "₹ 41 Cr",
          subtitle: "11 invoices",
          trend: "down",
          trendValue: 2,
          status: "warning",
          unit: "",
          metadata: {
            description: "Amount and count of disputed invoices",
            thresholds: {
              warning: 30,
              critical: 50
            }
          }
        },
        {
          id: "overcharged-raised-cases",
          name: "Overcharged / Raised Cases",
          type: "bar-chart",
          chartData: [
            { type: "Overcharged", value: 18, color: "#FF3533" },
            { type: "Raised", value: 12, color: "#FFC107" }
          ],
          metadata: {
            description: "Count of overcharged and raised cases",
            unit: "cases"
          }
        },
        {
          id: "settled-invoices",
          name: "Settled Invoices",
          type: "stat-tile",
          value: "₹ 285 Cr",
          subtitle: "98 invoices",
          trend: "up",
          trendValue: 10,
          status: "normal",
          unit: "",
          metadata: {
            description: "Amount and count of settled invoices",
            thresholds: {
              warning: 200,
              critical: 150
            }
          }
        }
      ]
    }
  },
  ptl: {
    epod: {
      kpis: [
        {
          id: "ptl-epod-submission",
          name: "ePOD Submission (Bags)",
          type: "donut-chart",
          chartData: [
            { name: "Submitted", value: 82, color: "#4CAF50" },
            { name: "Pending", value: 18, color: "#FFC107" }
          ],
          metadata: {
            description: "Split of PTL ePOD submission status",
            total: 100
          }
        },
        {
          id: "ptl-epod-approval-split",
          name: "ePOD Approval Split",
          type: "donut-chart",
          chartData: [
            { name: "Approved", value: 70, color: "#4CAF50" },
            { name: "Pending", value: 20, color: "#FFC107" },
            { name: "Rejected", value: 10, color: "#FF3533" }
          ],
          metadata: {
            description: "Split of PTL ePOD approval status",
            total: 100
          }
        },
        {
          id: "ptl-rejection-reasons",
          name: "Rejection Reasons (Bag level)",
          type: "bar-chart",
          chartData: [
            { reason: "Damaged", value: 42, color: "#FF3533" },
            { reason: "Shortage", value: 35, color: "#FFC107" },
            { reason: "Others", value: 23, color: "#2196F3" }
          ],
          metadata: {
            description: "Reasons for PTL ePOD rejection",
            unit: "%"
          }
        },
        {
          id: "ptl-total-freight-invoiced",
          name: "Total Freight Invoiced (PTL)",
          type: "stat-tile",
          value: "₹ 125 Cr",
          subtitle: "85 invoices",
          trend: "up",
          trendValue: 8,
          status: "normal",
          unit: "",
          metadata: {
            description: "Total PTL freight invoiced",
            thresholds: {
              warning: 100,
              critical: 80
            }
          }
        },
        {
          id: "ptl-reco-cases",
          name: "PTL Reco - Raised vs Settled Cases",
          type: "bar-chart",
          chartData: [
            { type: "Raised", value: 28, color: "#FFC107" },
            { type: "Settled", value: 22, color: "#4CAF50" }
          ],
          metadata: {
            description: "PTL freight reconciliation cases",
            unit: "cases"
          }
        }
      ]
    }
  }
};

export default postDeliveryKpiData;
