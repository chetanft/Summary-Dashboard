# TMS Summary Dashboard Implementation Plan

This document outlines the phased implementation plan for the TMS Summary Dashboard.

## Phase 1: Project Setup, Authentication, and Basic Structure

**Features:**
1. **Project Initialization**
   - Set up React project using Vite
   - Configure folder structure
   - Set up Git repository
   - Install essential dependencies (React Router, styling library)

2. **Authentication System**
   - Create login page with form
   - Implement dummy authentication system with the following personas:
     - CXO: username/password
     - Company User: username/password
     - Branch User: username/password
   - Set up user context/state management
   - Add protected routes

3. **Basic Layout Implementation**
   - Create responsive layout skeleton
   - Implement header with title, user info, and logout button
   - Add time period selector (MTD as default)
   - Create placeholder sections for KPI band, charts, and alerts

**Detailed Plan for Phase 1:**
- Initialize a new React project with Vite
- Set up ESLint and Prettier for code quality
- Create basic component structure (App, Layout, Login, Header, etc.)
- Implement React Router with protected routes
- Create login page with form validation
- Set up authentication context to store user role and login state
- Implement dummy authentication logic with predefined credentials
- Create session persistence using localStorage
- Build logout functionality
- Implement responsive grid layout for dashboard
- Add time period selector component
- Create placeholder components for all dashboard sections
- Test authentication flow and basic layout responsiveness
- Push completed Phase 1 to Git with appropriate commit messages

## Phase 2: Data Management and KPI Card Components

**Features:**
1. **Role-Based Data Management**
   - Implement data loading from JSON file based on user role
   - Create role-specific data transformations
   - Set up auto-refresh mechanism (5-minute interval)
   - Create manual refresh functionality
   - Implement basic state management

2. **KPI Card Components**
   - Create reusable KPI card component with support for:
     - Simple value display
     - Sparkline integration
     - Color-coding based on benchmark comparison
     - Tooltips with detailed descriptions
   - Implement role-specific KPI visibility based on metadata
   - Display last updated timestamp

**Detailed Plan for Phase 2:**
- Create data fetching utility to load JSON data
- Implement role-based data filtering using the persona mappings from metadata
- Build React context or state management for dashboard data
- Implement timer functionality for auto-refresh
- Create KPI card component with props for all required fields
- Implement color-coding logic based on benchmark comparison
- Add tooltip component with detailed KPI descriptions from metadata
- Build the top KPI band section with dynamic rendering based on user role
- Add timestamp display with formatting
- Test data loading and refresh functionality for each user role
- Push completed Phase 2 to Git

## Phase 3: Chart Components Based on KPI Metadata

**Features:**
1. **Chart Component Library**
   - Install and configure chart library (Recharts or Chart.js)
   - Create reusable chart components for each specified chart type:
     - Bar charts
     - Dual line charts
     - Area graphs
     - KPI cards with sparklines
     - Bar charts with tags

2. **Role-Specific Chart Implementation**
   - Implement each KPI with its specified chart type:
     - Budgeted vs Actual Freight: Bar chart
     - Freight Cost per KM/Tonnage: KPI card + Sparkline
     - Vehicle Utilization: Dual Line Chart
     - Placement Efficiency: Area graph + KPI Value
     - Order to Delivery Time: Bar chart
     - OTIF: Bar chart + Tags
     - Delayed Delivery %: Bar chart + Tags
   - Configure proper X-Y axis labels as specified in metadata
   - Add benchmark indicators to each chart

**Detailed Plan for Phase 3:**
- Install and set up selected chart library
- Create base chart components for each required chart type
- Implement data transformation utilities for chart data
- Build mid-section layout with appropriate chart components
- Configure each chart according to the metadata specifications
- Add proper axis labels and units
- Implement benchmark visualization for each KPI
- Add tooltips with detailed descriptions from metadata
- Ensure charts respond to window resizing
- Test all chart components with sample data for each user role
- Push completed Phase 3 to Git

## Phase 4: Order Timeline Component and Drilldown Functionality

**Features:**
1. **Order Timeline Component**
   - Create collapsible timeline component based on specifications
   - Implement expand/collapse functionality with chevron icons
   - Display timestamps and durations for each stage and sub-stage
   - Show dynamic content based on order processing progress
   - Integrate with the auto-refresh mechanism to update timeline data

2. **Drilldown Implementation**
   - Create drilldown panel component
   - Implement click handlers for KPI cards
   - Build multi-level drilldown based on metadata:
     - L1: Region level drilldown
     - L2: Branch, Vehicle Type, Transporter, Material Type, or Client based on KPI
   - Implement Top 5/Worst 5 sorting for applicable KPIs
   - Add "Invoice Details" view with Order Timeline Component integration

3. **Navigation Logic**
   - Implement breadcrumb navigation for drilldown levels
   - Add "back" functionality for drilldown views
   - Create smooth transitions between views

**Detailed Plan for Phase 4:**
- Build the Order Timeline Component with collapsible sections
- Implement expand/collapse functionality with animations
- Create sub-components for timeline stages and sub-stages
- Add timestamp and duration formatting
- Integrate timeline data with the auto-refresh mechanism
- Build right-side drilldown panel component
- Create click handlers for KPI interactions
- Implement drilldown logic based on the L1/L2 specifications in metadata
- Add sorting functionality for Top 5/Worst 5 views
- Create "Invoice Details" view with Order Timeline integration
- Build breadcrumb component for navigation tracking
- Create animation transitions for panel display
- Implement "back" navigation functionality
- Test all drilldown functionality and timeline component for each user role
- Push completed Phase 4 to Git

## Phase 5: Operational Alerts and Final Polishing

**Features:**
1. **Role-Based Operational Alerts Section**
   - Create alert card components
   - Implement lower section with operational alerts
   - Customize alerts based on user role
   - Add filter-based redirection for alert cards
   - Link relevant alerts to Order Timeline view

2. **Final Polishing**
   - Add loading states and error handling
   - Implement animations and transitions
   - Optimize performance
   - Add comprehensive testing
   - Final responsive design adjustments

**Detailed Plan for Phase 5:**
- Build alert card components with appropriate styling
- Implement the lower section layout for operational alerts
- Create role-specific alert configurations
- Add click handlers for filter-based redirection
- Link alerts to relevant Order Timeline views
- Create loading indicators and error states
- Add smooth animations for state transitions
- Perform performance optimization
- Conduct cross-browser testing
- Make final responsive design adjustments
- Push completed Phase 5 to Git

## Phase 6: Documentation and Deployment

**Features:**
1. **Documentation**
   - Create README with setup instructions
   - Document dummy login credentials
   - Add inline code documentation
   - Document component API and usage
   - Include KPI metadata and Order Timeline component reference

2. **Deployment**
   - Configure build process
   - Deploy to Vercel or Netlify
   - Set up CI/CD pipeline (optional)

**Detailed Plan for Phase 6:**
- Write comprehensive README.md with project overview
- Document all dummy user credentials for testing
- Include KPI metadata and Order Timeline component reference
- Add setup and usage instructions
- Document component props and API
- Configure production build settings
- Set up deployment to selected hosting platform
- Test deployed application with all user roles
- Push completed Phase 6 to Git

## Git Workflow Strategy

For each feature within a phase:
1. Create a feature branch from main (e.g., `feature/auth-system`, `feature/order-timeline`)
2. Implement the feature with regular commits
3. Test thoroughly
4. Create a pull request to merge into main
5. After review, merge the feature branch
6. Move to the next feature

Repository: https://github.com/chetanft/Summary-Dashboard.git
