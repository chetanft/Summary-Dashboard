import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { lazyLoad } from './utils/lazyLoad.jsx';
import useComponentPreload from './hooks/useComponentPreload';
import { IconRegistryProvider } from './components/common/IconRegistry';
import React, { Suspense } from 'react';

// Lazy load components with appropriate fallbacks
const Login = lazyLoad(() => import('./components/auth/Login'), { type: 'page' });
const EnhancedDashboard = lazyLoad(() => import('./components/dashboard/EnhancedDashboard'), { type: 'page' });
const OrdersPage = lazyLoad(() => import('./components/orders/OrdersPage'), { type: 'page' });
const OrderDetailPage = lazyLoad(() => import('./components/orders/OrderDetailPage'), { type: 'page' });
const AlertsWithLayout = lazyLoad(() => import('./components/alerts/AlertsWithLayout'), { type: 'page' });

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column'
  }}>
    <h2>Loading...</h2>
    <p>Please wait while the application loads.</p>
  </div>
);

function App() {
  console.log('App rendering');

  // Preload components
  useComponentPreload();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconRegistryProvider>
        <Suspense fallback={<LoadingFallback />}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DataProvider>
                        <EnhancedDashboard />
                      </DataProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <DataProvider>
                        <OrdersPage />
                      </DataProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:orderId"
                  element={
                    <ProtectedRoute>
                      <DataProvider>
                        <OrderDetailPage />
                      </DataProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/alerts"
                  element={
                    <ProtectedRoute>
                      <DataProvider>
                        <AlertsWithLayout />
                      </DataProvider>
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Router>
          </AuthProvider>
        </Suspense>
      </IconRegistryProvider>
    </ThemeProvider>
  );
}

export default App;
