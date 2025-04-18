import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, IconButton, TextField, InputAdornment } from '@mui/material';
import { Dashboard as DashboardIcon, Search as SearchIcon } from '@mui/icons-material';
import BranchSelector from '../common/BranchSelector';
import EnhancedSearchDropdown from '../common/EnhancedSearchDropdown';
import { useData } from '../../context/DataContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';

const DashboardHeader = ({ title, activeTab, onTabChange, searchBar = false, branchSelector = false, onSearch, searchData = [] }) => {
  const navigate = useNavigate();
  const { handleBranchChange, handleSearchTermChange } = useData();
  const { recentSearches, addRecentSearch } = useSearch();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Determine if branch selector should be shown based on user role
  const showBranchSelector = branchSelector && currentUser?.role !== ROLES.BRANCH_USER;

  const handleTabChange = (tab) => {
    onTabChange(tab);
    if (tab === 'performance') {
      navigate('/dashboard');
    } else if (tab === 'operations') {
      navigate('/alerts');
    } else if (tab === 'orderData') {
      navigate('/orders');
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);

    // Use the context's search function
    if (handleSearchTermChange) {
      handleSearchTermChange(value);
    }

    // Also call the component's onSearch prop if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSelect = (item) => {
    // Set the search term to the selected item's value
    const value = typeof item === 'string' ? item : item.value;
    setSearchTerm(value);

    // Use the context's search function
    if (handleSearchTermChange) {
      handleSearchTermChange(value);
    }

    // Also call the component's onSearch prop if provided
    if (onSearch) {
      onSearch(value);
    }

    // Add to recent searches if it's an object with type and value
    if (typeof item === 'object' && item.type && item.value) {
      addRecentSearch(item);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');

    // Use the context's search function
    if (handleSearchTermChange) {
      handleSearchTermChange('');
    }

    // Also call the component's onSearch prop if provided
    if (onSearch) {
      onSearch('');
    }
  };

  const handleBranchSelect = (branch) => {
    if (handleBranchChange) {
      handleBranchChange(branch);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 20px',
        width: '100%',
        height: '48px',
      }}
    >
      {/* Title with Icon */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
        <Box sx={{ width: '28px', height: '28px', position: 'relative' }}>
          <DashboardIcon sx={{ color: '#434F64', fontSize: '28px' }} />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '140%',
            color: '#434F64',
            width: '400px',
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Toggle Buttons and Search */}
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start', width: '100%', gap: 2 }}>
        {/* Only show toggle tabs if not on Control Tower page */}
        {activeTab !== 'controlTower' && (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* Toggle Button Group */}
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '8px 9px',
                gap: '4px',
                width: '450px',
                height: '48px',
                backgroundColor: '#F8F8F9',
                borderRadius: '8px',
              }}
            >
            <Box
              onClick={() => handleTabChange('performance')}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px 12px',
                gap: '4px',
                height: '32px',
                flex: 1,
                backgroundColor: activeTab === 'performance' ? '#FFFFFF' : '#F8F8F9',
                boxShadow: activeTab === 'performance' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: activeTab === 'performance' ? 600 : 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: activeTab === 'performance' ? '#434F64' : '#5F697B',
                }}
              >
                Performance
              </Typography>
            </Box>
            <Box
              onClick={() => handleTabChange('operations')}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px 12px',
                gap: '4px',
                height: '32px',
                flex: 1,
                backgroundColor: activeTab === 'operations' ? '#FFFFFF' : '#F8F8F9',
                boxShadow: activeTab === 'operations' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: activeTab === 'operations' ? 600 : 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: activeTab === 'operations' ? '#434F64' : '#5F697B',
                }}
              >
                Operations
              </Typography>
            </Box>
            <Box
              onClick={() => handleTabChange('orderData')}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px 12px',
                gap: '4px',
                height: '32px',
                flex: 1,
                backgroundColor: activeTab === 'orderData' ? '#FFFFFF' : '#F8F8F9',
                boxShadow: activeTab === 'orderData' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: activeTab === 'orderData' ? 600 : 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: activeTab === 'orderData' ? '#434F64' : '#5F697B',
                }}
              >
                Orders
              </Typography>
            </Box>
          </Paper>
          </Box>
        )}

        {/* Search and Branch Selector */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            ...(activeTab === 'controlTower' && { marginLeft: 'auto' }) // Push to right when toggle tabs are hidden
          }}
        >
          {searchBar && (
            <Box sx={{ position: 'relative', width: 400 }}>
              <EnhancedSearchDropdown
                data={searchData}
                placeholder="Search..."
                onSelect={handleSearchSelect}
                recentSearches={recentSearches}
                onClearSearch={handleClearSearch}
                onSearchChange={handleSearch}
                width="100%"
              />
            </Box>
          )}

          {showBranchSelector && (
            <BranchSelector onBranchChange={handleBranchSelect} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
