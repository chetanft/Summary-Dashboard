# TMS Dashboard

A comprehensive Transportation Management System (TMS) Dashboard for monitoring and managing logistics operations.

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

- **Authentication**: Secure login with role-based access control
- **Summary Dashboard**: Overview of key performance metrics with interactive charts
- **Order Management**: Track and manage orders with detailed information
- **Order Timeline**: Visualize the journey of orders through various milestones
- **Operational Alerts**: Real-time notifications for critical events
- **Responsive Design**: Works on desktop and mobile devices

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

1. **Summary**: Overview of key performance indicators
2. **Order Data**: Detailed view of orders and their status
3. **Alerts**: Operational alerts requiring attention

Use the navigation tabs at the top of the dashboard to switch between these sections.

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

- **Dashboard**: Main dashboard component
- **DashboardHeader**: Header with navigation tabs
- **HeroKPI**: Large KPI component with chart
- **SecondaryKPI**: Smaller KPI components
- **LineChartKPI**: KPI with line chart visualization
- **AlertIndicator**: Alert notification component

### Order Components

- **Orders**: Order listing and management
- **OrderDetailsPane**: Detailed view of an order
- **OrderDetailsTab**: Basic order information
- **OrderTimelineTab**: Order journey visualization
- **OrderCommentsTab**: Comments and communication

### Alert Components

- **Alerts**: Alert listing and management
- **AlertDetailsPane**: Detailed view of an alert

### Authentication Components

- **Login**: Login form
- **ProtectedRoute**: Route protection based on authentication

## Data Flow

The application uses React Context API for state management:

- **AuthContext**: Manages authentication state
- **DataContext**: Manages dashboard data and provides data refresh functionality

Data flows from the context providers to the components through props and context hooks.

## Authentication

Authentication is implemented using JWT (JSON Web Tokens). The token is stored in local storage and included in API requests as a bearer token.

## Deployment

### Build for Production

To build the application for production:

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

### Deployment Options

#### Option 1: Static Hosting

The built application can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

#### Option 2: Docker Deployment

A Dockerfile is provided for containerized deployment:

```bash
# Build the Docker image
docker build -t tms-dashboard .

# Run the container
docker run -p 8080:80 tms-dashboard
```

#### Option 3: CI/CD Pipeline

The repository includes GitHub Actions workflows for continuous integration and deployment:

- `.github/workflows/ci.yml`: Runs tests and linting on pull requests
- `.github/workflows/deploy.yml`: Deploys to production on merges to main branch

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
