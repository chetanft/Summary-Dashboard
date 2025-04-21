
# Order Timeline Component Prompt for Cursor AI

## Component Overview

This is a timeline component that visually represents the lifecycle of an order in a Transportation Management System (TMS). The timeline is displayed in the "Invoice Details" view of the Summary Dashboard. Each major stage of the order (e.g., SO Generated, Planning, Indent, Tracking, ePOD, etc.) is represented chronologically.

### Key Features:
- Each stage is collapsible via a chevron icon.
- Timestamps and durations are shown for each sub-stage.
- Sub-stages include specific actions and metadata (e.g., Weight, Vehicle Number, Status Updates).
- Each stage includes dynamic content based on order processing progress.

## Interaction Details

- **Expand/Collapse**: Clicking the chevron toggles visibility of the sub-steps within a stage.
- **Time Display**: Shows start time, end time, and duration per step (if available).
- **Statuses**: Represented with icons or tags (e.g., "In Process", "Pending Acceptance").

## Example JSON Structure

Below is a sample JSON that this timeline component could consume:

```json
{
  "order_id": "7134895",
  "date": "2023-03-12",
  "timeline": [
    {
      "stage": "SO Generated",
      "timestamp": "2023-03-12T09:34:00",
      "details": {
        "SO Number": "7134895"
      }
    },
    {
      "stage": "Planning",
      "timestamp": "2023-03-12T09:34:00",
      "time_taken_hrs": 2,
      "sub_stages": [
        {
          "status": "In Process",
          "details": {
            "Weight": "21 Ton"
          },
          "duration_hrs": 2
        },
        {
          "status": "Plan Generated",
          "details": {
            "Plan ID": "32151235"
          }
        }
      ]
    },
    {
      "stage": "Indent",
      "timestamp": "2023-03-12T09:34:00",
      "time_taken_hrs": 12,
      "sub_stages": [
        {
          "status": "Published",
          "details": {
            "Acceptance Deadline": "2025-04-26T09:45:00",
            "Published To": "Safe and Express Transporters"
          }
        },
        {
          "status": "Pending Acceptance",
          "duration_hrs": 2
        },
        {
          "status": "In Assignment",
          "duration_hrs": 4
        },
        {
          "status": "Reporting",
          "timestamp": "2023-03-12T09:34:00",
          "details": {
            "Vehicle No": "AP 12K 1234"
          }
        }
      ]
    }
  ]
}
```

## Usage Context

This component is essential in summarizing an order’s progression and helping users track actions and dependencies. It's helpful for CXOs, regional supervisors, or logistics managers who want quick insights into where delays or changes happen in the logistics chain.

---

Let me know if you want to integrate it with a real-time status API or want the Figma specs exported for Cursor AI integration.
