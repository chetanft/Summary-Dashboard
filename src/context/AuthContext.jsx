import { createContext, useState, useContext, useEffect } from 'react';
import { users } from '../data/users';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('tmsUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    
    if (user) {
      // Create a user object without the password
      const authenticatedUser = { ...user };
      delete authenticatedUser.password;
      
      // Store user in state and localStorage
      setCurrentUser(authenticatedUser);
      localStorage.setItem('tmsUser', JSON.stringify(authenticatedUser));
      return authenticatedUser;
    }
    return null;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('tmsUser');
  };

  // Context value
  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
