import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

// Create the authentication context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing user session on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      setError(null);
      const user = await authService.login(username, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout');
    }
  };

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    isAuthenticated: () => authService.isAuthenticated(),
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
