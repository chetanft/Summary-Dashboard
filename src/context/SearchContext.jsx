import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

/**
 * SearchProvider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} SearchProvider component
 */
export const SearchProvider = ({ children }) => {
  // State for recent searches
  const [recentSearches, setRecentSearches] = useState([]);
  
  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error('Error parsing recent searches from localStorage:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  /**
   * Add a search to recent searches
   * @param {Object} search - Search item to add
   */
  const addRecentSearch = (search) => {
    // Don't add if it's already in the list
    if (recentSearches.some(item => 
      item.type === search.type && item.value === search.value
    )) {
      // Move it to the top
      setRecentSearches(prev => [
        search,
        ...prev.filter(item => 
          !(item.type === search.type && item.value === search.value)
        )
      ]);
      return;
    }

    // Add to the beginning and limit to 10 items
    setRecentSearches(prev => [search, ...prev.slice(0, 9)]);
  };

  /**
   * Clear all recent searches
   */
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  /**
   * Remove a specific search from recent searches
   * @param {Object} search - Search item to remove
   */
  const removeRecentSearch = (search) => {
    setRecentSearches(prev => 
      prev.filter(item => 
        !(item.type === search.type && item.value === search.value)
      )
    );
  };

  // Context value
  const value = {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    removeRecentSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
