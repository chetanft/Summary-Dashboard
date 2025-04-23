import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { SearchProvider } from './context/SearchContext';
import { IconRegistryProvider } from './components/common/IconRegistry';
import { JourneyProvider } from './contexts/JourneyContext';
import { ControlTowerProvider } from './context/ControlTowerContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import EnhancedDashboard from './components/dashboard/EnhancedDashboard';
import OrdersPage from './components/orders/OrdersPage';
import OrderDetailPage from './components/orders/OrderDetailPage';
import AlertsWithLayout from './components/alerts/AlertsWithLayout';
import MyJourneysPage from './components/journeys/MyJourneysPage';
import JourneyDetailsPage from './components/journeys/JourneyDetailsPage';
import JourneyPage from './pages/JourneyPage';
import ControlTowerPage from './components/control-tower/ControlTowerPage';
import CoreComponentLibraryDemo from './pages/CoreComponentLibraryDemo';
import IconsDemo from './pages/IconsDemo';
import PlaceholderPage from './pages/PlaceholderPage';

// Import the unified theme
import theme from './theme/unifiedThemeConfig';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconRegistryProvider>
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
                path="/my-journeys"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <MyJourneysPage />
                    </DataProvider>
                  </ProtectedRoute>
              }
            />
              <Route
                path="/journey/:journeyId"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <JourneyDetailsPage />
                    </DataProvider>
                  </ProtectedRoute>
              }
            />
              <Route
                path="/journeys"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <JourneyProvider>
                        <JourneyPage />
                      </JourneyProvider>
                    </DataProvider>
                  </ProtectedRoute>
              }
            />
              <Route
                path="/control-tower"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <ControlTowerProvider>
                        <ControlTowerPage />
                      </ControlTowerProvider>
                    </DataProvider>
                  </ProtectedRoute>
              }
            />
              <Route
                path="/core-components"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <CoreComponentLibraryDemo />
                    </DataProvider>
                  </ProtectedRoute>
              }
            />
              <Route
                path="/icons"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <IconsDemo />
                    </DataProvider>
                  </ProtectedRoute>
              }
            />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* Catch-all route for pages that don't have dedicated components yet */}
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <DataProvider>
                      <PlaceholderPage />
                    </DataProvider>
                  </ProtectedRoute>
                }
              />
            </Routes>
            </Router>
          </SearchProvider>
        </AuthProvider>
      </IconRegistryProvider>
    </ThemeProvider>
  );
}

export default App;
