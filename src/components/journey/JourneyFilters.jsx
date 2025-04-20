import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import { useJourney } from '../../contexts/JourneyContext';
import Icon from '../common/Icon';
import { JourneyStatus, JourneyType } from '../../models/JourneyModel';

// Status options for dropdown
const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: JourneyStatus.PLANNED, label: 'Planned' },
  { value: JourneyStatus.EN_ROUTE_TO_LOADING, label: 'En Route to Loading' },
  { value: JourneyStatus.AT_LOADING, label: 'At Loading' },
  { value: JourneyStatus.IN_TRANSIT, label: 'In Transit' },
  { value: JourneyStatus.AT_UNLOADING, label: 'At Unloading' },
  { value: JourneyStatus.IN_RETURN, label: 'In Return' },
  { value: JourneyStatus.DELIVERED, label: 'Delivered' },
];

// Type options for dropdown
const typeOptions = [
  { value: '', label: 'All Types' },
  { value: JourneyType.FTL, label: 'Full Truck Load (FTL)' },
  { value: JourneyType.PTL, label: 'Part Truck Load (PTL)' },
];

// Branch options for dropdown (in a real app, these would come from an API)
const branchOptions = [
  { value: '', label: 'All Branches' },
  { value: 'BR001', label: 'Mumbai HQ' },
  { value: 'BR002', label: 'Delhi Branch' },
  { value: 'BR003', label: 'Bangalore Branch' },
  { value: 'BR004', label: 'Chennai Branch' },
  { value: 'BR005', label: 'Hyderabad Branch' },
  { value: 'BR006', label: 'Kolkata Branch' },
  { value: 'BR007', label: 'Ahmedabad Branch' },
  { value: 'BR008', label: 'Pune Branch' },
  { value: 'BR009', label: 'Jaipur Branch' },
  { value: 'BR010', label: 'Lucknow Branch' },
];

const JourneyFilters = () => {
  const { filters, setFilters, resetFilters } = useJourney();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(localFilters);
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({
      ...filters,
      type: '',
      status: '',
      sourceBranch: '',
      destinationBranch: '',
      fromDate: '',
      toDate: '',
      search: '',
    });
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              name="search"
              label="Search Journeys"
              variant="outlined"
              value={localFilters.search}
              onChange={handleChange}
              placeholder="Search by ID, Trip ID, Vehicle, Driver, Location..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="Search" size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              select
              name="status"
              label="Status"
              variant="outlined"
              value={localFilters.status}
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              select
              name="type"
              label="Journey Type"
              variant="outlined"
              value={localFilters.type}
              onChange={handleChange}
            >
              {typeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6} lg={2}>
            <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
              <Button
                variant="outlined"
                onClick={toggleAdvanced}
                startIcon={
                  <Icon name={showAdvanced ? 'ChevronUp' : 'ChevronDown'} size={18} />
                }
                sx={{ mr: 1, height: '56px' }}
              >
                {showAdvanced ? 'Less' : 'More'}
              </Button>
              <Button
                variant="contained"
                type="submit"
                startIcon={<Icon name="Filter" size={18} />}
                sx={{ height: '56px' }}
              >
                Filter
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Collapse in={showAdvanced}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Advanced Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  select
                  name="sourceBranch"
                  label="Source Branch"
                  variant="outlined"
                  value={localFilters.sourceBranch}
                  onChange={handleChange}
                >
                  {branchOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  select
                  name="destinationBranch"
                  label="Destination Branch"
                  variant="outlined"
                  value={localFilters.destinationBranch}
                  onChange={handleChange}
                >
                  {branchOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  type="date"
                  name="fromDate"
                  label="From Date"
                  variant="outlined"
                  value={localFilters.fromDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  type="date"
                  name="toDate"
                  label="To Date"
                  variant="outlined"
                  value={localFilters.toDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    startIcon={<Icon name="RefreshCw" size={18} />}
                  >
                    Reset Filters
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </form>
    </Paper>
  );
};

export default JourneyFilters;
