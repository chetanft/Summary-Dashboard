/**
 * Mock data for Post Delivery KPIs (FTL and PTL)
 */

export const postDeliveryKpiData = {
  title: "Post Delivery",
  ftl: {
    epodSubmittedVsPending: {
      id: "epod-submitted-vs-pending",
      name: "ePOD Submitted vs Pending",
      value: 100,
      breakdown: {
        submitted: { value: 78, percentage: 78 },
        pending: { value: 22, percentage: 22 }
      },
      chartData: [
        { name: "Submitted", value: 78, color: "#4CAF50" },
        { name: "Pending", value: 22, color: "#FFC107" }
      ]
    },
    epodApprovalRate: {
      id: "epod-approval-rate",
      name: "ePOD Approval Rate",
      value: 92,
      unit: "%",
      trend: "up",
      trendValue: 2,
      status: "normal",
      approvalBreakdown: [
        { name: "Approved", value: 92, color: "#4CAF50" },
        { name: "Disputed", value: 5, color: "#FF9800" },
        { name: "Rejected", value: 3, color: "#F44336" }
      ]
    },
    invoiceStatus: {
      id: "invoice-status",
      name: "Invoice Status",
      value: 100,
      breakdown: {
        generated: { value: 85, percentage: 85 },
        pending: { value: 15, percentage: 15 }
      },
      chartData: [
        { name: "Generated", value: 85, color: "#4CAF50" },
        { name: "Pending", value: 15, color: "#FFC107" }
      ]
    }
  },
  ptl: {
    epodSubmission: {
      id: "epod-submission",
      name: "ePOD Submission",
      value: 100,
      breakdown: {
        submitted: { value: 82, percentage: 82 },
        pending: { value: 18, percentage: 18 }
      },
      chartData: [
        { name: "Submitted", value: 82, color: "#4CAF50" },
        { name: "Pending", value: 18, color: "#FFC107" }
      ]
    },
    epodStatus: {
      id: "epod-status",
      name: "ePOD Status",
      value: 82,
      breakdown: {
        approved: { value: 68, percentage: 83 },
        disputed: { value: 9, percentage: 11 },
        rejected: { value: 5, percentage: 6 }
      },
      chartData: [
        { name: "Approved", value: 83, color: "#4CAF50" },
        { name: "Disputed", value: 11, color: "#FF9800" },
        { name: "Rejected", value: 6, color: "#F44336" }
      ]
    },
    ptlRecoCases: {
      id: "ptl-reco-cases",
      name: "PTL Reconciliation Cases",
      chartData: [
        { type: "Pending", value: 32 },
        { type: "Approved", value: 45 },
        { type: "Disputed", value: 18 },
        { type: "Resolved", value: 12 }
      ]
    }
  }
};

export default postDeliveryKpiData;
