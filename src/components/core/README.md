# TMS Dashboard Component Library

This component library provides a set of reusable UI components for the TMS Dashboard application. The components are organized according to the Atomic Design methodology, which breaks down interfaces into five distinct levels: atoms, molecules, organisms, templates, and pages.

## Getting Started

### Installation

The component library is part of the TMS Dashboard project and doesn't require separate installation.

### Usage

Import components from the core library:

```jsx
import { StatusBadge, ValueDisplay, MetricCard } from '../components/core';

// Use components in your JSX
<MetricCard
  title="Revenue"
  value={1234567}
  format="currency"
  trend={5.2}
  icon={AttachMoneyIcon}
/>
```

## Component Categories

### Atoms

Atoms are the basic building blocks of the interface. They include:

- **StatusBadge**: Displays a status indicator with customizable appearance
- **ValueDisplay**: Shows a value with optional formatting, label, and icon

### Molecules

Molecules are groups of atoms bonded together:

- **TrendIndicator**: Shows a trend value with directional indicator
- **MetricCard**: Displays a metric with title, value, trend, and optional icon

### Organisms

Organisms are groups of molecules that form a relatively complex section:

- **MetricCardGroup**: Groups related metric cards with an optional title and header actions

### Templates

Templates are page-level objects that place components into a layout:

- (Coming soon)

### Pages

Pages are specific instances of templates:

- (Coming soon)

## Theme System

The component library uses a centralized theme configuration for consistent styling:

- **Colors**: Predefined color palette with primary, secondary, and semantic colors
- **Typography**: Font family, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation levels
- **Component Overrides**: Default styling for MUI components

## Style Utilities

Utility functions for common styling patterns:

- **cardStyle**: Consistent card styling
- **flexContainer**: Flexbox container with alignment options
- **gridContainer**: Grid container with responsive spacing
- **statusIndicator**: Status indicator styling
- **truncateText**: Text truncation with ellipsis
- **responsive**: Responsive display utilities
- **animations**: Animation keyframes and transitions
- **formField**: Form field styling
- **shadows**: Shadow variations

## Migration Guide

When migrating from existing components to the new component library:

1. **KPI Cards**: Replace existing KPI card implementations with `MetricCard`
2. **Status Indicators**: Replace custom status indicators with `StatusBadge`
3. **Value Displays**: Replace custom value displays with `ValueDisplay`
4. **Trend Indicators**: Replace custom trend indicators with `TrendIndicator`

## Best Practices

- Use the theme system for consistent styling
- Prefer the component library over custom implementations
- Follow the component documentation for proper usage
- Use the demo page as a reference for component usage

## Demo

A demo page is available at `/component-library` to showcase the components and their variants.
