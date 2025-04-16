import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alerts, alertTypes, alertSeverities, alertStatuses } from '../../data/alertData';
import AlertDetailsPane from './AlertDetailsPane';

const Alerts = () => {
  const { searchTerm, handleSearchTermChange } = useData();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAlertId, setSelectedAlertId] = useState(null);

  // Initialize local search term with global search term
  useEffect(() => {
    setLocalSearchTerm(searchTerm || '');
  }, [searchTerm]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setLocalSearchTerm(value);

    // Update global search term
    if (handleSearchTermChange) {
      handleSearchTermChange(value);
    }
  };

  const handleSeverityChange = (event) => {
    setSelectedSeverity(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleAlertClick = (alertId) => {
    setSelectedAlertId(alertId);
  };

  const handleClosePane = () => {
    setSelectedAlertId(null);
  };

  const handlePreviousAlert = () => {
    const currentIndex = alerts.findIndex(alert => alert.id === selectedAlertId);
    if (currentIndex > 0) {
      setSelectedAlertId(alerts[currentIndex - 1].id);
    }
  };

  const handleNextAlert = () => {
    const currentIndex = alerts.findIndex(alert => alert.id === selectedAlertId);
    if (currentIndex < alerts.length - 1) {
      setSelectedAlertId(alerts[currentIndex + 1].id);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch =
      alert.title.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(localSearchTerm.toLowerCase());

    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesType = selectedType === 'all' || alert.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || alert.status === selectedStatus;

    return matchesSearch && matchesSeverity && matchesType && matchesStatus;
  });

  const getSeverityChipColor = (severity) => {
    const severityObj = alertSeverities.find(s => s.id === severity);
    return severityObj ? severityObj.color : '#757575';
  };

  const getTypeChipColor = (type) => {
    const typeObj = alertTypes.find(t => t.id === type);
    return typeObj ? typeObj.color : '#757575';
  };

  const getStatusChipColor = (status) => {
    const statusObj = alertStatuses.find(s => s.id === status);
    return statusObj ? statusObj.color : '#757575';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const selectedAlert = alerts.find(alert => alert.id === selectedAlertId);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
        Operational Alerts
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search alerts..."
          variant="outlined"
          size="small"
          value={localSearchTerm}
          onChange={handleSearch}
          sx={{ minWidth: 250, flex: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="severity-select-label">Severity</InputLabel>
          <Select
            labelId="severity-select-label"
            id="severity-select"
            value={selectedSeverity}
            label="Severity"
            onChange={handleSeverityChange}
          >
            <MenuItem value="all">All Severities</MenuItem>
            {alertSeverities.map(severity => (
              <MenuItem key={severity.id} value={severity.id}>
                {severity.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={selectedType}
            label="Type"
            onChange={handleTypeChange}
          >
            <MenuItem value="all">All Types</MenuItem>
            {alertTypes.map(type => (
              <MenuItem key={type.id} value={type.id}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus}
            label="Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            {alertStatuses.map(status => (
              <MenuItem key={status.id} value={status.id}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title="Refresh alerts">
          <IconButton color="primary" size="small" sx={{ alignSelf: 'center' }}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Alerts Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAlerts.map((alert) => (
              <TableRow
                key={alert.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                hover
              >
                <TableCell>{alert.id}</TableCell>
                <TableCell>{alert.title}</TableCell>
                <TableCell>
                  <Chip
                    label={alertSeverities.find(s => s.id === alert.severity)?.label || alert.severity}
                    size="small"
                    sx={{
                      bgcolor: getSeverityChipColor(alert.severity),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={alertTypes.find(t => t.id === alert.type)?.label || alert.type}
                    size="small"
                    sx={{
                      bgcolor: getTypeChipColor(alert.type),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={alertStatuses.find(s => s.id === alert.status)?.label || alert.status}
                    size="small"
                    sx={{
                      bgcolor: getStatusChipColor(alert.status),
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                </TableCell>
                <TableCell>{formatDate(alert.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleAlertClick(alert.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredAlerts.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No alerts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedAlertId && (
        <AlertDetailsPane
          alert={selectedAlert}
          onClose={handleClosePane}
          onPrevious={handlePreviousAlert}
          onNext={handleNextAlert}
        />
      )}
    </Box>
  );
};

export default Alerts;
