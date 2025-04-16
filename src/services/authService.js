// Import users data
import { users } from '../data/users';

// Constants
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USE_MOCK_DATA = true; // Set to false when real API is available

// Simple hash function for passwords (not secure, just for demo)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16);
};

// Generate a mock JWT token
const generateMockToken = (user, expiresIn = 3600) => {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    iat: now,
    exp: now + expiresIn
  };
  
  // This is just for mock purposes - not a real JWT
  return btoa(JSON.stringify(payload));
};

// Token management
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Authentication service
const authService = {
  async login(username, password) {
    if (USE_MOCK_DATA) {
      console.log('Using mock authentication');
      // Find the user in the mock data
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Create a user object without the password
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;

      // Create mock tokens
      const accessToken = generateMockToken(user, 3600);
      const refreshToken = generateMockToken(user, 86400);

      // Store tokens
      setTokens(accessToken, refreshToken);

      return userWithoutPassword;
    }

    try {
      // In a real app, this would be an API call
      // For now, just throw an error
      throw new Error('API not implemented');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  async logout() {
    if (USE_MOCK_DATA) {
      removeTokens();
      return;
    }

    try {
      // In a real app, this would be an API call
      removeTokens();
    } catch (error) {
      console.error('Logout error:', error);
      removeTokens();
    }
  },

  async getCurrentUser() {
    if (USE_MOCK_DATA) {
      const token = getToken();
      if (!token) return null;

      try {
        // Decode the base64 encoded mock token
        const payload = JSON.parse(atob(token));
        
        // Check if token is expired
        if (payload.exp * 1000 < Date.now()) {
          removeTokens();
          return null;
        }

        // Find the user in the mock data
        const user = users.find(u => u.id === payload.sub);
        if (!user) return null;

        // Return user without password
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        
        return userWithoutPassword;
      } catch (error) {
        console.error('Error parsing mock token:', error);
        return null;
      }
    }

    try {
      // In a real app, this would be an API call
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  isAuthenticated() {
    const token = getToken();
    if (!token) return false;

    try {
      if (USE_MOCK_DATA) {
        const payload = JSON.parse(atob(token));
        return payload.exp * 1000 > Date.now();
      } else {
        // In a real app, this would validate the token
        return false;
      }
    } catch (error) {
      console.error('Authentication check error:', error);
      return false;
    }
  },
};

export default authService;
