import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const API_URL = import.meta.env.VITE_API_URL;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 30000;

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup caching
const api = setupCache(axiosInstance, {
  ttl: 5 * 60 * 1000, // Cache for 5 minutes by default
  methods: ['get'], // Only cache GET requests
  debug: import.meta.env.DEV, // Enable debug logs in development
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can modify the request config here
    // For example, add authorization headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        isNetworkError: true,
      });
    }

    // Handle rate limiting
    if (error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 5;
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return api(originalRequest);
    }

    // Handle server errors
    if (error.response.status >= 500) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        return new Promise(resolve => setTimeout(resolve, 1000)).then(() =>
          api(originalRequest)
        );
      }
    }

    return Promise.reject({
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
      data: error.response.data,
    });
  }
);

// API methods
const apiService = {
  async get(endpoint, config = {}) {
    try {
      const response = await api.get(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async post(endpoint, data = {}, config = {}) {
    try {
      const response = await api.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await api.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async delete(endpoint, config = {}) {
    try {
      const response = await api.delete(endpoint, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Error handling
  handleError(error) {
    // Log error if error reporting is enabled
    if (import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true') {
      console.error('API Error:', error);
      // Here you would typically log to your error reporting service
    }

    // Return a standardized error object
    return {
      message: error.message || 'An unexpected error occurred',
      status: error.status || 500,
      data: error.data || null,
      isNetworkError: error.isNetworkError || false,
    };
  },

  // Cache management
  clearCache() {
    api.clearCache();
  },

  // Utility methods
  setAuthToken(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthToken() {
    delete api.defaults.headers.common['Authorization'];
  },
};

export default apiService; 