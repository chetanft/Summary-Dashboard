import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { useControlTower } from '../../../context/ControlTowerContext';
import TransactionsTable from './TransactionsTable';
import FilterPanel from './FilterPanel';
import TripDetailDrawer from './TripDetailDrawer';

const TransactionsTab = () => {
  const { 
    filteredTrips, 
    loading, 
    error, 
    filters,
    updateFilters,
    clearFilters,
    refreshData
  } = useControlTower();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleFilterToggle = () => {
    setFilterPanelOpen(!filterPanelOpen);
  };
  
  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };
  
  const handleTripClose = () => {
    setSelectedTrip(null);
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleExport = () => {
    console.log('Exporting data...');
    handleMenuClose();
  };
  
  const handleShare = () => {
    console.log('Sharing data...');
    handleMenuClose();
  };
  
  const handleRefresh = () => {
    refreshData();
  };
  
  // Filter trips based on search term
  const searchedTrips = filteredTrips.filter(trip => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      trip.tripId.toLowerCase().includes(searchLower) ||
      trip.vehicleNumber.toLowerCase().includes(searchLower) ||
      trip.lspName.toLowerCase().includes(searchLower) ||
      trip.currentStatus.toLowerCase().includes(searchLower)
    );
  });
  
  // Count active filters
  const activeFilterCount = Object.values(filters).reduce((count, filter) => {
    if (Array.isArray(filter) && filter.length > 0) return count + 1;
    if (filter && filter[0] && filter[1]) return count + 1;
    return count;
  }, 0);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Toolbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search trips..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#5F697B' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '8px' }
            }}
          />
          
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterToggle}
            sx={{ 
              textTransform: 'none',
              borderColor: filterPanelOpen ? '#0066FF' : '#E0E0E0',
              color: filterPanelOpen ? '#0066FF' : '#434F64',
              '&:hover': {
                borderColor: '#0066FF',
                backgroundColor: 'transparent',
              }
            }}
          >
            Filters
            {activeFilterCount > 0 && (
              <Chip 
                label={activeFilterCount} 
                size="small" 
                sx={{ 
                  ml: 1, 
                  height: 20, 
                  minWidth: 20,
                  backgroundColor: '#0066FF',
                  color: '#FFF',
                  fontSize: '12px',
                }} 
              />
            )}
          </Button>
          
          {activeFilterCount > 0 && (
            <Button
              variant="text"
              onClick={clearFilters}
              sx={{ 
                textTransform: 'none',
                color: '#5F697B',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#0066FF',
                }
              }}
            >
              Clear All
            </Button>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<GetAppIcon />}
            onClick={handleExport}
            sx={{ 
              textTransform: 'none',
              borderColor: '#E0E0E0',
              color: '#434F64',
              '&:hover': {
                borderColor: '#0066FF',
                backgroundColor: 'transparent',
              }
            }}
          >
            Export
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ShareIcon />}
            onClick={handleShare}
            sx={{ 
              textTransform: 'none',
              borderColor: '#E0E0E0',
              color: '#434F64',
              '&:hover': {
                borderColor: '#0066FF',
                backgroundColor: 'transparent',
              }
            }}
          >
            Share
          </Button>
          
          <IconButton
            onClick={handleRefresh}
            sx={{ color: '#434F64' }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Filter Panel */}
      {filterPanelOpen && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: '8px',
            border: '1px solid #E0E0E0',
          }}
        >
          <FilterPanel />
        </Paper>
      )}
      
      {/* Transactions Table */}
      <TransactionsTable 
        trips={searchedTrips} 
        onTripSelect={handleTripSelect}
      />
      
      {/* Trip Detail Drawer */}
      {selectedTrip && (
        <TripDetailDrawer
          trip={selectedTrip}
          open={Boolean(selectedTrip)}
          onClose={handleTripClose}
        />
      )}
    </Box>
  );
};

export default TransactionsTab;
