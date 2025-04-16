import { lazy } from 'react';
import { lazyLoad } from './lazyLoad';

// Lazy load operations components
export const LazyOperationsDashboard = lazyLoad(
  () => import('../components/operations/OperationsDashboard'),
  { type: 'page' }
);

export const LazyPlanningSection = lazyLoad(
  () => import('../components/operations/PlanningSection'),
  { type: 'component' }
);

export const LazyPreDispatchSection = lazyLoad(
  () => import('../components/operations/PreDispatchSection'),
  { type: 'component' }
);

export const LazyInTransitSection = lazyLoad(
  () => import('../components/operations/InTransitSection'),
  { type: 'component' }
);

export const LazyPostDeliverySection = lazyLoad(
  () => import('../components/operations/PostDeliverySection'),
  { type: 'component' }
);

export const LazyDockOccupancyHeatmap = lazyLoad(
  () => import('../components/operations/DockOccupancyHeatmap'),
  { type: 'component' }
);
