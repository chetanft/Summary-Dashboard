import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import EnhancedDashboard from './components/dashboard/EnhancedDashboard';
import OrdersWithLayout from './components/orders/OrdersWithLayout';
import PlantYardOperations from './components/operations/PlantYardOperations';
import TestComponent from './components/operations/TestComponent';

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
                    <OrdersWithLayout />
                  </DataProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/plant-yard"
              element={
                <ProtectedRoute>
                  <DataProvider>
                    <PlantYardOperations />
                  </DataProvider>
                </ProtectedRoute>
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
            <Route path="/test" element={<TestComponent />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
