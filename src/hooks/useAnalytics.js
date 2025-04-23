import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEvent } from '../services/analyticsService';

/**
 * Custom hook for tracking analytics
 * @returns {Object} - Analytics tracking functions
 */
const useAnalytics = () => {
  const location = useLocation();
  
  // Track page view on location change
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  // Track event
  const track = useCallback((category, action, label = null, properties = {}) => {
    trackEvent(category, action, label, properties);
  }, []);
  
  // Track journey view
  const trackJourneyView = useCallback((journeyId) => {
    trackEvent('Journey', 'View', journeyId, { page: location.pathname });
  }, [location.pathname]);
  
  // Track journey action
  const trackJourneyAction = useCallback((action, journeyId, details = {}) => {
    trackEvent('Journey', action, journeyId, { 
      page: location.pathname,
      ...details
    });
  }, [location.pathname]);
  
  // Track document action
  const trackDocumentAction = useCallback((action, documentId, documentType, details = {}) => {
    trackEvent('Document', action, documentId, { 
      page: location.pathname,
      documentType,
      ...details
    });
  }, [location.pathname]);
  
  // Track status update
  const trackStatusUpdate = useCallback((journeyId, status, details = {}) => {
    trackEvent('Status', 'Update', journeyId, { 
      page: location.pathname,
      status,
      ...details
    });
  }, [location.pathname]);
  
  // Track map interaction
  const trackMapInteraction = useCallback((action, details = {}) => {
    trackEvent('Map', action, null, { 
      page: location.pathname,
      ...details
    });
  }, [location.pathname]);
  
  return {
    track,
    trackJourneyView,
    trackJourneyAction,
    trackDocumentAction,
    trackStatusUpdate,
    trackMapInteraction
  };
};

export default useAnalytics;
