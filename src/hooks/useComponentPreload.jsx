import { useEffect } from 'react';

/**
 * List of components to preload
 * These should be the most commonly used components that might be loaded dynamically
 */
const COMPONENTS_TO_PRELOAD = [
  () => import('../components/dashboard/AlertIndicator'),
  () => import('../components/dashboard/EnhancedDashboard'),
  () => import('../components/common/IconBundle'),
  () => import('../components/auth/Login')
];

/**
 * Hook to preload common components
 * This helps prevent waterfall loading of components when they're first used
 */
const useComponentPreload = () => {
  useEffect(() => {
    // Only preload in production to avoid slowing down development
    if (process.env.NODE_ENV !== 'development') {
      // Use requestIdleCallback to preload components during browser idle time
      const preloadComponents = () => {
        COMPONENTS_TO_PRELOAD.forEach(importFn => {
          // Use a small delay between imports to avoid overwhelming the browser
          setTimeout(() => {
            importFn().catch(err => {
              console.warn('Failed to preload component:', err);
            });
          }, 100);
        });
      };

      // Use requestIdleCallback if available, otherwise use setTimeout
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(preloadComponents, { timeout: 2000 });
      } else {
        setTimeout(preloadComponents, 1000);
      }
    }
  }, []);
};

export default useComponentPreload;
