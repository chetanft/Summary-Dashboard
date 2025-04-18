import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useControlTower } from '../../../context/ControlTowerContext';

// Alert types
const alertTypes = [
  'Delayed placement',
  'RC/PAN mismatch',
  'Unapproved 3rd-party vehicle',
  'Long stoppage',
  'Route deviation',
  'Diversion',
  'GPS tracking failure',
  'Detention at origin',
  'Detention at destination',
  'E-Waybill expiry',
  'SIM consent failure',
  'Driver unreachable',
  'Late POD upload',
  'Rejected POD',
  'Missing proof',
  'Disputes',
];

const tripTypes = ['FTL', 'PTL', 'Express'];
const lanes = ['Mumbai-Delhi', 'Chennai-Bangalore', 'Kolkata-Hyderabad', 'Pune-Ahmedabad', 'Delhi-Jaipur'];
const lspNames = ['Safexpress', 'TCI', 'Gati', 'DHL', 'Blue Dart', 'Delhivery'];
const vehicleTypes = ['LCV', 'Truck', 'Container', 'Trailer'];

const FilterPanel = () => {
  const { filters, updateFilters } = useControlTower();
  
  const handleDateChange = (index, date) => {
    const newDateRange = [...filters.dateRange];
    newDateRange[index] = date;
    updateFilters({ dateRange: newDateRange });
  };
  
  const handleAlertTypeChange = (event) => {
    updateFilters({ alertType: event.target.value });
  };
  
  const handleTripTypeChange = (event) => {
    updateFilters({ tripType: event.target.value });
  };
  
  const handleLaneChange = (event) => {
    updateFilters({ lane: event.target.value });
  };
  
  const handleVehicleChange = (event) => {
    updateFilters({ vehicle: event.target.value });
  };
  
  const handleLSPChange = (event) => {
    updateFilters({ lsp: event.target.value });
  };
  
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Date Range */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Date Range
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="From"
                value={filters.dateRange[0]}
                onChange={(date) => handleDateChange(0, date)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
              <DatePicker
                label="To"
                value={filters.dateRange[1]}
                onChange={(date) => handleDateChange(1, date)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        
        {/* Alert Type */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Alert Type</InputLabel>
            <Select
              multiple
              value={filters.alertType}
              onChange={handleAlertTypeChange}
              input={<OutlinedInput label="Alert Type" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {alertTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filters.alertType.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Trip Type */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Trip Type</InputLabel>
            <Select
              multiple
              value={filters.tripType}
              onChange={handleTripTypeChange}
              input={<OutlinedInput label="Trip Type" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {tripTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filters.tripType.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Lane */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Lane</InputLabel>
            <Select
              multiple
              value={filters.lane}
              onChange={handleLaneChange}
              input={<OutlinedInput label="Lane" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {lanes.map((lane) => (
                <MenuItem key={lane} value={lane}>
                  <Checkbox checked={filters.lane.indexOf(lane) > -1} />
                  <ListItemText primary={lane} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Vehicle */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              multiple
              value={filters.vehicle}
              onChange={handleVehicleChange}
              input={<OutlinedInput label="Vehicle Type" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  <Checkbox checked={filters.vehicle.indexOf(type) > -1} />
                  <ListItemText primary={type} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* LSP */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small">
            <InputLabel>LSP</InputLabel>
            <Select
              multiple
              value={filters.lsp}
              onChange={handleLSPChange}
              input={<OutlinedInput label="LSP" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {lspNames.map((lsp) => (
                <MenuItem key={lsp} value={lsp}>
                  <Checkbox checked={filters.lsp.indexOf(lsp) > -1} />
                  <ListItemText primary={lsp} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterPanel;
