import { useState, useCallback } from 'react';

/**
 * Custom hook for screen reader announcements
 * 
 * @returns {Object} - Object with announcement state and announce function
 */
const useScreenReaderAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');
  const [politeness, setPoliteness] = useState('polite');
  
  /**
   * Announce a message to screen readers
   * 
   * @param {string} message - Message to announce
   * @param {string} level - Politeness level ('polite' or 'assertive')
   */
  const announce = useCallback((message, level = 'polite') => {
    setAnnouncement(message);
    setPoliteness(level);
  }, []);
  
  return {
    announcement,
    politeness,
    announce
  };
};

export default useScreenReaderAnnouncement;
