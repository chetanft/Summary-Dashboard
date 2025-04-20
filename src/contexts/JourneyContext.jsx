import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getJourneys, getJourneyById, getJourneyStatistics, getJourneyKPIs } from '../services/journeyService';

// Create context
const JourneyContext = createContext();

// Initial state
const initialState = {
  journeys: [],
  filteredJourneys: [],
  selectedJourney: null,
  filters: {
    type: '',
    status: '',
    sourceBranch: '',
    destinationBranch: '',
    fromDate: '',
    toDate: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  },
  statistics: null,
  kpis: null,
  loading: false,
  error: null,
  totalPages: 1,
  totalItems: 0,
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_JOURNEYS: 'SET_JOURNEYS',
  SET_FILTERED_JOURNEYS: 'SET_FILTERED_JOURNEYS',
  SET_SELECTED_JOURNEY: 'SET_SELECTED_JOURNEY',
  SET_FILTERS: 'SET_FILTERS',
  SET_STATISTICS: 'SET_STATISTICS',
  SET_KPIS: 'SET_KPIS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION',
};

// Reducer function
const journeyReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.SET_JOURNEYS:
      return { ...state, journeys: action.payload, loading: false };
    case ActionTypes.SET_FILTERED_JOURNEYS:
      return { ...state, filteredJourneys: action.payload, loading: false };
    case ActionTypes.SET_SELECTED_JOURNEY:
      return { ...state, selectedJourney: action.payload, loading: false };
    case ActionTypes.SET_FILTERS:
      return { 
        ...state, 
        filters: { ...state.filters, ...action.payload },
        // Reset page to 1 when filters change
        ...(Object.keys(action.payload).some(key => key !== 'page' && key !== 'limit') ? { filters: { ...state.filters, ...action.payload, page: 1 } } : { filters: { ...state.filters, ...action.payload } })
      };
    case ActionTypes.SET_STATISTICS:
      return { ...state, statistics: action.payload, loading: false };
    case ActionTypes.SET_KPIS:
      return { ...state, kpis: action.payload, loading: false };
    case ActionTypes.RESET_FILTERS:
      return { 
        ...state, 
        filters: { 
          ...initialState.filters,
          // Keep pagination settings
          page: state.filters.page,
          limit: state.filters.limit,
        } 
      };
    case ActionTypes.SET_PAGINATION:
      return { 
        ...state, 
        totalPages: action.payload.totalPages,
        totalItems: action.payload.totalItems,
      };
    default:
      return state;
  }
};

// Provider component
export const JourneyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(journeyReducer, initialState);

  // Load journeys when filters change
  useEffect(() => {
    const loadJourneys = async () => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        
        // Get journeys with current filters
        const journeys = await getJourneys(state.filters);
        
        // Get total count for pagination
        const allJourneys = await getJourneys({
          ...state.filters,
          page: undefined,
          limit: undefined,
        });
        
        dispatch({ type: ActionTypes.SET_FILTERED_JOURNEYS, payload: journeys });
        dispatch({ 
          type: ActionTypes.SET_PAGINATION, 
          payload: {
            totalItems: allJourneys.length,
            totalPages: Math.ceil(allJourneys.length / state.filters.limit),
          }
        });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      }
    };

    loadJourneys();
  }, [state.filters]);

  // Actions
  const loadAllJourneys = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const journeys = await getJourneys({});
      dispatch({ type: ActionTypes.SET_JOURNEYS, payload: journeys });
      return journeys;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return [];
    }
  };

  const loadJourneyById = async (id) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const journey = await getJourneyById(id);
      dispatch({ type: ActionTypes.SET_SELECTED_JOURNEY, payload: journey });
      return journey;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return null;
    }
  };

  const loadStatistics = async (filters = {}) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const statistics = await getJourneyStatistics(filters);
      dispatch({ type: ActionTypes.SET_STATISTICS, payload: statistics });
      return statistics;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return null;
    }
  };

  const loadKPIs = async (filters = {}) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const kpis = await getJourneyKPIs(filters);
      dispatch({ type: ActionTypes.SET_KPIS, payload: kpis });
      return kpis;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      return null;
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: ActionTypes.RESET_FILTERS });
  };

  const clearSelectedJourney = () => {
    dispatch({ type: ActionTypes.SET_SELECTED_JOURNEY, payload: null });
  };

  const setPage = (page) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: { page } });
  };

  const setLimit = (limit) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: { limit, page: 1 } });
  };

  // Context value
  const value = {
    ...state,
    loadAllJourneys,
    loadJourneyById,
    loadStatistics,
    loadKPIs,
    setFilters,
    resetFilters,
    clearSelectedJourney,
    setPage,
    setLimit,
  };

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
};

// Custom hook to use the journey context
export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};

export default JourneyContext;
