import { lazy, Suspense } from 'react';
import { Box, CircularProgress, Skeleton } from '@mui/material';

// Different loading fallbacks for different component types
const PageLoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const ComponentLoadingFallback = ({ height = '200px', width = '100%' }) => (
  <Skeleton variant="rectangular" height={height} width={width} animation="wave" />
);

const TableLoadingFallback = () => (
  <Box sx={{ width: '100%' }}>
    <Skeleton variant="rectangular" height="50px" width="100%" animation="wave" />
    {[...Array(5)].map((_, index) => (
      <Skeleton key={index} variant="rectangular" height="40px" width="100%" animation="wave" sx={{ mt: 1 }} />
    ))}
  </Box>
);

const ChartLoadingFallback = () => (
  <Skeleton variant="rectangular" height="300px" width="100%" animation="wave" />
);

/**
 * Enhanced lazy loading utility with different fallback options
 * @param {Function} importFunc - The import function
 * @param {Object} options - Configuration options
 * @param {string} options.type - Type of component ('page', 'component', 'table', 'chart')
 * @param {Object} options.fallbackProps - Props to pass to the fallback component
 * @returns {React.LazyExoticComponent} - The lazy loaded component
 */
export const lazyLoad = (importFunc, options = {}) => {
  const { type = 'page', fallbackProps = {} } = options;
  const LazyComponent = lazy(importFunc);

  // Select the appropriate fallback based on component type
  let FallbackComponent;
  switch (type) {
    case 'component':
      FallbackComponent = () => <ComponentLoadingFallback {...fallbackProps} />;
      break;
    case 'table':
      FallbackComponent = () => <TableLoadingFallback {...fallbackProps} />;
      break;
    case 'chart':
      FallbackComponent = () => <ChartLoadingFallback {...fallbackProps} />;
      break;
    case 'page':
    default:
      FallbackComponent = PageLoadingFallback;
  }

  return (props) => (
    <Suspense fallback={<FallbackComponent />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Preload a component without rendering it
 * This is useful for preloading components that will be used soon
 * @param {Function} importFunc - The import function
 */
export const preloadComponent = (importFunc) => {
  // Start the import but don't do anything with the result yet
  importFunc();
};
