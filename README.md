# TMS Dashboard

A comprehensive Transportation Management System (TMS) Dashboard for monitoring and managing logistics operations. This application provides real-time insights into transportation metrics, order tracking, and operational alerts to help logistics managers make informed decisions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Data Flow](#data-flow)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The TMS Dashboard is a web application designed to provide real-time insights into transportation and logistics operations. It offers a comprehensive view of key performance indicators (KPIs), order tracking, and operational alerts to help logistics managers make informed decisions.

## Features

- **Authentication**: Secure login with role-based access control (CXO, Company User, Branch User)
- **Performance Dashboard**: Overview of key performance metrics with interactive charts and drill-down capabilities
- **Operations Dashboard**: Real-time KPIs for planning, pre-dispatch, in-transit, and post-delivery operations
- **Order Management**: Track and manage orders with detailed information and search functionality
- **Order Timeline**: Visualize the journey of orders through various milestones with stage tracking
- **Operational Alerts**: Real-time notifications for critical events and exceptions
- **Advanced Visualizations**:
  - Dock Occupancy Heatmap: Visual representation of dock utilization
  - Truck Timeline Chart: Gantt-style visualization of truck movements
  - Interactive KPI Cards: Click-through for detailed analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tms-dashboard.git
   cd tms-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Authentication

The application supports multiple user roles:

- **CXO**: Access to all features with a focus on high-level KPIs
- **Company User**: Access to company-specific data and operations
- **Branch User**: Access to branch-specific data and operations

Use the following credentials for testing:

- CXO: `cxo@example.com` / `password`
- Company User: `company@example.com` / `password`
- Branch User: `branch@example.com` / `password`

### Dashboard Navigation

The dashboard is organized into three main sections:

1. **Performance**: Overview of key performance indicators with drill-down capabilities
2. **Operations**: Real-time operational KPIs for different stages of the logistics process
3. **Orders**: Detailed view of orders and their status with search and filtering

Use the navigation tabs at the top of the dashboard to switch between these sections. Each section provides specific insights and tools for different aspects of transportation management.

## Project Structure

```
tms-dashboard/
├── docs/                  # Documentation files
├── public/                # Static assets
├── src/                   # Source code
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # React components
│   │   ├── alerts/        # Alert-related components
│   │   ├── auth/          # Authentication components
│   │   ├── charts/        # Chart components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── layout/        # Layout components
│   │   └── orders/        # Order-related components
│   ├── context/           # React context providers
│   ├── data/              # Sample data and data utilities
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── vite.config.js         # Vite configuration
```

## Components

### Dashboard Components

- **EnhancedDashboard**: Main performance dashboard component with KPI cards and charts
- **DashboardHeader**: Header with navigation tabs and user profile
- **KpiCard**: Reusable KPI card component with drill-down capability
- **StatTile**: Compact KPI display with trend indicators
- **LineChartComponent**: Reusable line chart for time-series data
- **BarChartComponent**: Reusable bar chart for comparative data
- **DonutChartComponent**: Reusable donut chart for distribution data

### Operations Components

- **OperationsDashboard**: Main operations dashboard with sectioned KPIs
- **PlanningSection**: KPIs related to planning operations
- **PreDispatchSection**: KPIs related to pre-dispatch operations
- **InTransitSection**: KPIs related to in-transit operations
- **PostDeliverySection**: KPIs related to post-delivery operations
- **DockOccupancyHeatmap**: Visual representation of dock utilization
- **TruckTimelineChart**: Gantt-style visualization of truck movements

### Order Components

- **OrdersPage**: Order listing with search and filtering
- **OrderDetailsPane**: Slide-in pane with detailed order information
- **OrderDetailsTab**: Basic order information and current status
- **OrderTimelineTab**: Visual journey of an order through various stages
- **OrderCommentsTab**: Communication history related to the order
- **SearchDropdown**: Advanced search functionality for orders

### Authentication Components

- **Login**: Login form with role selection
- **ProtectedRoute**: Route protection based on authentication and role
- **UserProfileMenu**: User profile and logout functionality

## Data Flow

The application uses React Context API for state management:

- **AuthContext**: Manages authentication state and user roles
- **DataContext**: Manages dashboard data and provides data refresh functionality
- **SearchContext**: Manages search state and functionality across the application

Data flows from the context providers to the components through props and context hooks. The application uses a combination of static data (for demonstration) and simulated API calls to mimic real-world data flow.

## Authentication

Authentication is implemented using JWT (JSON Web Tokens). The token is stored in local storage and included in API requests as a bearer token.

The application supports three user roles:

1. **CXO**: Access to all features with a focus on high-level KPIs and company-wide data
2. **Company User**: Access to company-specific data and operations
3. **Branch User**: Access to branch-specific data and operations with limited scope

Each role has a customized dashboard view that highlights the most relevant information for that user type.

## Deployment

### Build for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

### Deployment Options

#### Recommended: Netlify Deployment

The application is optimized for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy the site

Netlify automatically handles continuous deployment from your GitHub repository.

#### Alternative Options

- **Vercel**: Similar setup to Netlify with automatic deployments
- **GitHub Pages**: Deploy the static files to GitHub Pages
- **AWS S3 + CloudFront**: For enterprise-level hosting with CDN capabilities

### Development Workflow

The project follows a feature branch workflow:

1. Create a feature branch for each new feature or fix
2. Develop and test the feature locally
3. Push the feature branch to GitHub
4. Create a pull request for review
5. Merge to main after approval
6. Automatic deployment via Netlify

## Key Technologies

- **React**: Frontend library for building the user interface
- **Vite**: Build tool and development server
- **Material-UI**: Component library for consistent design
- **Recharts**: Charting library for data visualization
- **React Router**: For application routing
- **Context API**: For state management
- **date-fns**: For date manipulation and formatting

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
