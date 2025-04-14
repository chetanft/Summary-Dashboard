import { useEffect } from 'react';

// Note: We don't need to import MUI icons here anymore since we're using
// direct imports in the IconBundle component

/**
 * Common icons used throughout the application
 * These are already pre-imported in the IconBundle component
 */
const COMMON_ICONS = [
  'Notifications',
  'Visibility',
  'VisibilityOff',
  'Search',
  'FilterList',
  'ChevronRight',
  'ChevronLeft',
  'WarningAmber',
  'AccessTime',
  'Person',
  'LocalShipping',
  'CheckCircle',
  'Error',
  'Info',
  'Close',
  'ArrowBack',
  'TrendingUp',
  'TrendingDown',
  'MoreVert',
  'Refresh',
];

/**
 * Hook to preload commonly used icons
 * This helps prevent waterfall loading of icons
 *
 * Note: This hook is now mostly a placeholder since we're using direct imports
 * in the IconBundle component. However, we keep it for future extensibility.
 */
const useIconPreload = () => {
  useEffect(() => {
    // Log that preloading is active
    if (process.env.NODE_ENV === 'development') {
      console.log('Icon preloading active for:', COMMON_ICONS.join(', '));
    }

    // No need to do anything else since we're using direct imports in IconBundle
  }, []);
};

export default useIconPreload;
