import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { SearchProvider } from './context/SearchContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import EnhancedDashboard from './components/dashboard/EnhancedDashboard';
import OrdersPage from './components/orders/OrdersPage';
import OrderDetailPage from './components/orders/OrderDetailPage';
import AlertsWithLayout from './components/alerts/AlertsWithLayout';
import SearchDropdownDemo from './pages/SearchDropdownDemo';
import EnhancedSearchDemo from './pages/EnhancedSearchDemo';
import PlantYardOperations from './components/operations/PlantYardOperations';
import PTLKpiTestPage from './pages/PTLKpiTestPage';
import ControlTowerPage from './components/control-tower/ControlTowerPage';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SearchProvider>
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
            <Route
              path="/search-dropdown-demo"
              element={
                <DataProvider>
                  <SearchDropdownDemo />
                </DataProvider>
              }
            />
            <Route
              path="/enhanced-search-demo"
              element={
                <DataProvider>
                  <EnhancedSearchDemo />
                </DataProvider>
              }
            />
            <Route
              path="/operations/plant-yard"
              element={
                <ProtectedRoute>
                  <DataProvider>
                    <PlantYardOperations />
                  </DataProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/ptl-test"
              element={
                <ProtectedRoute>
                  <DataProvider>
                    <PTLKpiTestPage />
                  </DataProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/control-tower"
              element={
                <ProtectedRoute>
                  <DataProvider>
                    <ControlTowerPage />
                  </DataProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          </Router>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
