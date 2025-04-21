// Add any global setup for Jest tests here
import '@testing-library/jest-dom';

// Mock the matchMedia function for responsive tests
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};
