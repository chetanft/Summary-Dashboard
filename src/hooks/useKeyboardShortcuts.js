import { useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for handling keyboard shortcuts
 * 
 * @param {Object} shortcuts - Object mapping key combinations to handler functions
 * @param {boolean} enabled - Whether shortcuts are enabled
 * @returns {Object} - Object with methods to enable/disable shortcuts
 */
const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  const enabledRef = useRef(enabled);
  const shortcutsRef = useRef(shortcuts);
  
  // Update refs when props change
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  }, [shortcuts]);
  
  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);
  
  // Enable shortcuts
  const enable = useCallback(() => {
    enabledRef.current = true;
  }, []);
  
  // Disable shortcuts
  const disable = useCallback(() => {
    enabledRef.current = false;
  }, []);
  
  // Handle keydown event
  const handleKeyDown = useCallback((event) => {
    if (!enabledRef.current) return;
    
    // Skip if user is typing in an input field
    if (
      event.target.tagName === 'INPUT' || 
      event.target.tagName === 'TEXTAREA' || 
      event.target.isContentEditable
    ) {
      return;
    }
    
    // Build key combination string
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey; // metaKey for Mac
    const alt = event.altKey;
    const shift = event.shiftKey;
    
    let combo = '';
    if (ctrl) combo += 'ctrl+';
    if (alt) combo += 'alt+';
    if (shift) combo += 'shift+';
    combo += key;
    
    // Check if the key combination has a handler
    const handler = shortcutsRef.current[combo];
    if (handler) {
      event.preventDefault();
      handler(event);
    }
  }, []);
  
  // Add and remove event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return {
    enable,
    disable,
    enabled: enabledRef.current
  };
};

export default useKeyboardShortcuts;
