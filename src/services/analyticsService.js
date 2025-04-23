/**
 * Analytics Service
 * Provides functions for tracking user interactions
 */

// Flag to enable/disable analytics
const ANALYTICS_ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

// Mock analytics implementation
// In a real application, this would be replaced with a real analytics service like Google Analytics, Mixpanel, etc.
class AnalyticsService {
  constructor() {
    this.enabled = ANALYTICS_ENABLED;
    this.sessionId = this.generateSessionId();
    this.events = [];
    
    console.log(`Analytics ${this.enabled ? 'enabled' : 'disabled'}`);
    
    if (this.enabled) {
      // Initialize analytics service
      this.initialize();
    }
  }
  
  /**
   * Initialize analytics service
   */
  initialize() {
    console.log('Initializing analytics service');
    
    // Track page view on initialization
    this.trackPageView(window.location.pathname);
    
    // Listen for route changes
    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });
  }
  
  /**
   * Generate a unique session ID
   * @returns {string} - Session ID
   */
  generateSessionId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  /**
   * Track page view
   * @param {string} path - Page path
   */
  trackPageView(path) {
    if (!this.enabled) return;
    
    const event = {
      type: 'pageview',
      path,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    console.log('Analytics: Page View', event);
    
    // In a real application, this would send the event to the analytics service
    this.sendEvent(event);
  }
  
  /**
   * Track event
   * @param {string} category - Event category
   * @param {string} action - Event action
   * @param {string} label - Event label
   * @param {Object} properties - Additional properties
   */
  trackEvent(category, action, label = null, properties = {}) {
    if (!this.enabled) return;
    
    const event = {
      type: 'event',
      category,
      action,
      label,
      properties,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    console.log('Analytics: Event', event);
    
    // In a real application, this would send the event to the analytics service
    this.sendEvent(event);
  }
  
  /**
   * Track user
   * @param {string} userId - User ID
   * @param {Object} traits - User traits
   */
  identifyUser(userId, traits = {}) {
    if (!this.enabled) return;
    
    const event = {
      type: 'identify',
      userId,
      traits,
      timestamp: new Date().toISOString()
    };
    
    this.events.push(event);
    console.log('Analytics: Identify User', event);
    
    // In a real application, this would send the event to the analytics service
    this.sendEvent(event);
  }
  
  /**
   * Send event to analytics service
   * @param {Object} event - Event object
   */
  sendEvent(event) {
    if (!this.enabled) return;
    
    // In a real application, this would send the event to the analytics service
    // For now, we'll just log it to the console
    
    // Example implementation for Google Analytics
    if (typeof window.gtag === 'function') {
      if (event.type === 'pageview') {
        window.gtag('config', 'UA-XXXXXXXX-X', {
          page_path: event.path
        });
      } else if (event.type === 'event') {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          ...event.properties
        });
      }
    }
    
    // Example implementation for Mixpanel
    if (typeof window.mixpanel === 'object' && typeof window.mixpanel.track === 'function') {
      if (event.type === 'pageview') {
        window.mixpanel.track('Page View', {
          path: event.path
        });
      } else if (event.type === 'event') {
        window.mixpanel.track(event.action, {
          category: event.category,
          label: event.label,
          ...event.properties
        });
      } else if (event.type === 'identify') {
        window.mixpanel.identify(event.userId);
        window.mixpanel.people.set(event.traits);
      }
    }
  }
  
  /**
   * Get all tracked events
   * @returns {Array} - Array of events
   */
  getEvents() {
    return this.events;
  }
}

// Create a singleton instance
const analyticsService = new AnalyticsService();

// Export analytics functions
export const trackPageView = (path) => analyticsService.trackPageView(path);
export const trackEvent = (category, action, label, properties) => analyticsService.trackEvent(category, action, label, properties);
export const identifyUser = (userId, traits) => analyticsService.identifyUser(userId, traits);
export const getEvents = () => analyticsService.getEvents();

// Export the service
export default analyticsService;
