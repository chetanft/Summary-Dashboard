import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Log application startup for debugging
console.log('Application starting...');

// Create root and render app
const root = ReactDOM.createRoot(document.getElementById('root'));
if (root) {
  console.log('Root element found, rendering application');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found! Check if the DOM is properly loaded.');
}

// Service worker registration
serviceWorkerRegistration.register();

// Add error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});
