# TMS Dashboard API Documentation

This document provides information about the API endpoints used in the TMS Dashboard application.

## Base URL

```
https://api.example.com/v1
```

## Authentication

All API requests require authentication using JWT (JSON Web Token).

Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

### Authentication Endpoints

#### Login

```
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "company_user"
  }
}
```

#### Logout

```
POST /auth/logout
```

Response:
```json
{
  "message": "Logged out successfully"
}
```

## Dashboard Data

### Get Dashboard Data

```
GET /dashboard
```

Query parameters:
- `timeframe`: The timeframe for the data (daily, weekly, monthly, yearly)
- `startDate`: The start date for the data (YYYY-MM-DD)
- `endDate`: The end date for the data (YYYY-MM-DD)

Response:
```json
{
  "heroKPI": {
    "title": "Freight Budget vs Actual",
    "actual": "₹ 4,50,000",
    "projected": "₹ 5,00,000",
    "budget": "₹ 4,75,000",
    "chartData": [
      { "month": "Jan", "value": 275, "color": "#FF3533" },
      { "month": "Feb", "value": 348, "color": "#838C9D" },
      { "month": "Mar", "value": 317, "color": "#838C9D" },
      { "month": "Apr", "value": 410, "color": "#838C9D" },
      { "month": "May", "value": 380, "color": "#838C9D" }
    ]
  },
  "secondaryKPIs": [
    {
      "id": "2A",
      "title": "On-Time Delivery",
      "value": "85",
      "target": "90",
      "color": "yellow",
      "unit": "%"
    },
    {
      "id": "3A",
      "title": "Avg. Cost per KM",
      "value": "₹ 45",
      "target": "₹ 42",
      "color": "red",
      "unit": "INR"
    },
    {
      "id": "3B",
      "title": "Vehicle Utilization",
      "value": "78",
      "target": "85",
      "color": "red",
      "unit": "%"
    },
    {
      "id": "3C",
      "title": "Fuel Efficiency",
      "value": "4.5",
      "target": "4.2",
      "color": "green",
      "unit": "km/l"
    }
  ],
  "lineChartKPIs": [
    {
      "id": "4A",
      "title": "Daily Orders",
      "value": "42",
      "target": "50",
      "data": [
        { "date": "2024-04-01", "value": 38 },
        { "date": "2024-04-02", "value": 42 },
        { "date": "2024-04-03", "value": 45 },
        { "date": "2024-04-04", "value": 40 },
        { "date": "2024-04-05", "value": 48 }
      ]
    },
    {
      "id": "4B",
      "title": "Delivery Exceptions",
      "value": "12",
      "target": "5",
      "data": [
        { "date": "2024-04-01", "value": 8 },
        { "date": "2024-04-02", "value": 10 },
        { "date": "2024-04-03", "value": 12 },
        { "date": "2024-04-04", "value": 7 },
        { "date": "2024-04-05", "value": 9 }
      ]
    },
    {
      "id": "4C",
      "title": "Avg. Transit Time",
      "value": "3.2",
      "target": "3.0",
      "data": [
        { "date": "2024-04-01", "value": 3.1 },
        { "date": "2024-04-02", "value": 3.3 },
        { "date": "2024-04-03", "value": 3.2 },
        { "date": "2024-04-04", "value": 3.0 },
        { "date": "2024-04-05", "value": 3.4 }
      ]
    },
    {
      "id": "4D",
      "title": "Customer Satisfaction",
      "value": "4.2",
      "target": "4.5",
      "data": [
        { "date": "2024-04-01", "value": 4.1 },
        { "date": "2024-04-02", "value": 4.3 },
        { "date": "2024-04-03", "value": 4.2 },
        { "date": "2024-04-04", "value": 4.0 },
        { "date": "2024-04-05", "value": 4.4 }
      ]
    }
  ]
}
```

## Orders

### Get Orders

```
GET /orders
```

Query parameters:
- `page`: The page number (default: 1)
- `limit`: The number of items per page (default: 10)
- `search`: Search term for filtering orders
- `status`: Filter by order status
- `startDate`: Filter by start date (YYYY-MM-DD)
- `endDate`: Filter by end date (YYYY-MM-DD)

Response:
```json
{
  "orders": [
    {
      "id": "21424",
      "soNumber": "21424",
      "totalWeight": "70 Ton",
      "numberOfDOs": 1,
      "numberOfSKUs": 20,
      "totalCost": "₹ 5,00,000",
      "createdAt": "2024-02-10T15:00:00Z",
      "status": "In Transit",
      "isOnTime": true,
      "eta": "2023-03-12T09:34:00Z",
      "sta": "2023-03-11T06:14:00Z",
      "nextMilestone": "At Destination",
      "nextMilestoneEta": "2023-03-11T07:20:00Z",
      "sender": {
        "name": "MDC Labs Ltd",
        "address": "Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, Amritsar, Punjab",
        "gstin": "123456789",
        "email": "someemailaddress@somemail.com",
        "phone": "84973-47593"
      },
      "shipTo": {
        "name": "Sai Traders",
        "address": "Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001",
        "gstin": "123456789",
        "email": "someemailaddress@somemail.com",
        "phone": "84973-47593"
      },
      "billTo": {
        "name": "Sai Traders",
        "address": "Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001",
        "gstin": "123456789",
        "email": "someemailaddress@somemail.com",
        "phone": "84973-47593"
      },
      "planningId": "84975345",
      "indentId": "84975345",
      "journeyId": "84975345",
      "epodId": null,
      "invoiceNumber": null
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Get Order by ID

```
GET /orders/:id
```

Response:
```json
{
  "order": {
    "id": "21424",
    "soNumber": "21424",
    "totalWeight": "70 Ton",
    "numberOfDOs": 1,
    "numberOfSKUs": 20,
    "totalCost": "₹ 5,00,000",
    "createdAt": "2024-02-10T15:00:00Z",
    "status": "In Transit",
    "isOnTime": true,
    "eta": "2023-03-12T09:34:00Z",
    "sta": "2023-03-11T06:14:00Z",
    "nextMilestone": "At Destination",
    "nextMilestoneEta": "2023-03-11T07:20:00Z",
    "sender": {
      "name": "MDC Labs Ltd",
      "address": "Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, Amritsar, Punjab",
      "gstin": "123456789",
      "email": "someemailaddress@somemail.com",
      "phone": "84973-47593"
    },
    "shipTo": {
      "name": "Sai Traders",
      "address": "Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001",
      "gstin": "123456789",
      "email": "someemailaddress@somemail.com",
      "phone": "84973-47593"
    },
    "billTo": {
      "name": "Sai Traders",
      "address": "Consignor Address, 11th & 12th Floor, Hansalaya Building, 15 Barakhamba Road, New Delhi 110001",
      "gstin": "123456789",
      "email": "someemailaddress@somemail.com",
      "phone": "84973-47593"
    },
    "planningId": "84975345",
    "indentId": "84975345",
    "journeyId": "84975345",
    "epodId": null,
    "invoiceNumber": null
  }
}
```

### Get Order Timeline

```
GET /orders/:id/timeline
```

Response:
```json
{
  "timeline": [
    {
      "id": 1,
      "date": "2023-03-12",
      "events": [
        {
          "id": "so-generated",
          "type": "SO Generated",
          "time": "09:34 AM",
          "details": "SO: 7134895",
          "icon": "document"
        },
        {
          "id": "planning",
          "type": "Planning",
          "time": "Time taken: 2 hrs",
          "details": "SO: 7134895",
          "icon": "planning",
          "subEvents": [
            {
              "id": "in-process",
              "type": "In Process",
              "details": "Weight: 21 Ton",
              "time": "Runtime: 2 hr"
            },
            {
              "id": "plan-generated",
              "type": "Plan generated",
              "details": "Plan ID: 32151235",
              "time": "At 09:34 AM"
            }
          ]
        },
        {
          "id": "indent",
          "type": "Indent",
          "time": "Time taken: 12 hrs",
          "details": "Indent ID: 7283465",
          "icon": "indent",
          "subEvents": [
            {
              "id": "published",
              "type": "Published",
              "details": "Acceptance deadline: 09:45 AM, 26 April 2025",
              "time": "On: 09:34 AM",
              "additionalInfo": "Published to: Safe and Express Transporters"
            },
            {
              "id": "pending-acceptance",
              "type": "Pending Acceptance",
              "time": "Time taken: 2 hrs",
              "timeRange": {
                "start": "09:34 AM",
                "end": "11:34 AM"
              }
            },
            {
              "id": "in-assignment",
              "type": "In Assignment",
              "time": "Time taken: 4 hrs",
              "timeRange": {
                "start": "09:34 AM",
                "end": "11:34 AM"
              }
            },
            {
              "id": "reporting",
              "type": "Reporting",
              "details": "Vehicle No: AP 12K 1234",
              "time": "Reported On: 09:34 AM"
            }
          ]
        },
        {
          "id": "transit",
          "type": "Transit",
          "time": "Time taken: 3 days",
          "details": "Trip ID: 7283465",
          "icon": "transit"
        }
      ]
    }
  ]
}
```

### Get Order Comments

```
GET /orders/:id/comments
```

Response:
```json
{
  "comments": [
    {
      "id": 1,
      "user": "Shastri",
      "time": "2024-03-12T11:20:00Z",
      "comment": "Some comments done by some user on some time"
    },
    {
      "id": 2,
      "user": "Shastri",
      "time": "2024-03-12T11:20:00Z",
      "comment": "Some comments done by some user on some time"
    }
  ]
}
```

### Add Order Comment

```
POST /orders/:id/comments
```

Request body:
```json
{
  "comment": "New comment text"
}
```

Response:
```json
{
  "id": 3,
  "user": "John Doe",
  "time": "2024-04-12T15:30:00Z",
  "comment": "New comment text"
}
```

## Alerts

### Get Alerts

```
GET /alerts
```

Query parameters:
- `page`: The page number (default: 1)
- `limit`: The number of items per page (default: 10)
- `search`: Search term for filtering alerts
- `severity`: Filter by alert severity (low, medium, high, critical)
- `type`: Filter by alert type (delay, breakdown, weather, documentation, delivery)
- `status`: Filter by alert status (open, acknowledged, resolved)

Response:
```json
{
  "alerts": [
    {
      "id": "ALT-001",
      "title": "Delayed Shipment",
      "description": "Shipment #21424 is delayed by 2 hours",
      "severity": "high",
      "type": "delay",
      "status": "open",
      "createdAt": "2024-04-12T09:30:00Z",
      "updatedAt": "2024-04-12T09:30:00Z",
      "assignedTo": null,
      "relatedOrderId": "21424",
      "actions": [
        {
          "id": "ACT-001",
          "type": "acknowledge",
          "label": "Acknowledge",
          "status": "available"
        },
        {
          "id": "ACT-002",
          "type": "resolve",
          "label": "Resolve",
          "status": "available"
        }
      ]
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

### Get Alert by ID

```
GET /alerts/:id
```

Response:
```json
{
  "alert": {
    "id": "ALT-001",
    "title": "Delayed Shipment",
    "description": "Shipment #21424 is delayed by 2 hours",
    "severity": "high",
    "type": "delay",
    "status": "open",
    "createdAt": "2024-04-12T09:30:00Z",
    "updatedAt": "2024-04-12T09:30:00Z",
    "assignedTo": null,
    "relatedOrderId": "21424",
    "actions": [
      {
        "id": "ACT-001",
        "type": "acknowledge",
        "label": "Acknowledge",
        "status": "available"
      },
      {
        "id": "ACT-002",
        "type": "resolve",
        "label": "Resolve",
        "status": "available"
      }
    ]
  }
}
```

### Acknowledge Alert

```
POST /alerts/:id/acknowledge
```

Response:
```json
{
  "id": "ALT-001",
  "status": "acknowledged",
  "updatedAt": "2024-04-12T10:15:00Z",
  "assignedTo": "John Doe"
}
```

### Resolve Alert

```
POST /alerts/:id/resolve
```

Request body:
```json
{
  "resolution": "Issue has been resolved by contacting the driver"
}
```

Response:
```json
{
  "id": "ALT-001",
  "status": "resolved",
  "updatedAt": "2024-04-12T11:30:00Z",
  "resolution": "Issue has been resolved by contacting the driver"
}
```

## Error Responses

All API endpoints return standard error responses:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

Common error codes:
- `BAD_REQUEST`: The request was invalid
- `UNAUTHORIZED`: Authentication is required
- `FORBIDDEN`: The user does not have permission
- `NOT_FOUND`: The requested resource was not found
- `INTERNAL_SERVER_ERROR`: An unexpected error occurred
