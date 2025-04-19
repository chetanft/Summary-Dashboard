import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  Chip,
  IconButton,
  TablePagination
} from '@mui/material';
import { Badge } from '../../components/core';
import {
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

/**
 * Journeys Table component
 *
 * @param {Object} props - Component props
 * @param {Array} props.journeys - Journeys data
 * @param {Function} props.onJourneyClick - Function to handle journey click
 * @returns {JSX.Element}
 */
const JourneysTable = ({ journeys, onJourneyClick }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle select all click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = journeys.map((journey) => journey.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Handle row click
  const handleRowClick = (event, id, journey) => {
    // If the click is on a checkbox, don't open the journey details
    if (event.target.type === 'checkbox') return;

    // If the click is on an action button, don't open the journey details
    if (event.target.closest('button')) return;

    onJourneyClick(journey);
  };

  // Handle checkbox click
  const handleCheckboxClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Calculate empty rows
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - journeys.length) : 0;

  // Get status color
  const getStatusColor = (journey) => {
    return journey.isDelayed ? 'error' : 'success';
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F5F7FA' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ borderBottom: '1px solid #E0E4E8' }}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < journeys.length}
                  checked={journeys.length > 0 && selected.length === journeys.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all journeys' }}
                  sx={{
                    color: '#A0AEC0',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: 'primary.main',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>From</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>To</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>Vehicle Info</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>Trip Info</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>Fulfillment SLA</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#4A5568', borderBottom: '1px solid #E0E4E8' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((journey) => {
                const isItemSelected = isSelected(journey.id);

                return (
                  <TableRow
                    key={journey.id}
                    hover
                    onClick={(event) => handleRowClick(event, journey.id, journey)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: 'rgba(66, 153, 225, 0.08)',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(66, 153, 225, 0.04)',
                      },
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, journey.id)}
                        inputProps={{ 'aria-labelledby': `journey-${journey.id}` }}
                        sx={{
                          color: '#A0AEC0',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#2D3748' }}>
                          {journey.from.location}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#718096' }}>
                          {journey.from.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#2D3748' }}>
                          {journey.to.location}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#718096' }}>
                          {journey.to.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#2D3748' }}>
                          {journey.vehicleInfo}
                        </Typography>
                        {journey.communicationType && (
                          <Chip
                            label={journey.communicationType}
                            size="small"
                            sx={{
                              ml: 1,
                              height: 20,
                              fontSize: '0.625rem',
                              backgroundColor: journey.communicationType === 'SIM' ? '#E6FFFA' : '#F0FFF4',
                              color: journey.communicationType === 'SIM' ? '#319795' : '#38A169',
                              fontWeight: 500,
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Typography variant="body2" sx={{ color: '#2D3748' }}>
                        {journey.tripInfo}
                      </Typography>
                      {journey.contactNumber && (
                        <Typography variant="caption" sx={{ color: '#718096', display: 'block' }}>
                          {journey.contactNumber}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Badge
                        label={journey.statusText}
                        status={journey.isDelayed ? 'error' : 'success'}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: journey.isDelayed ? '#E53E3E' : '#38A169',
                          }}
                        >
                          {journey.isDelayed ? `Delayed by ${journey.delayTime}` : 'On time'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#718096', display: 'block' }}>
                          ETA: {journey.eta}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex' }}>
                        <IconButton size="small" onClick={(e) => e.stopPropagation()} sx={{ color: '#718096' }}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#4299E1' }}>
                          <ChevronRightIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} sx={{ borderBottom: '1px solid #E0E4E8' }} />
              </TableRow>
            )}
            {journeys.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 3, borderBottom: '1px solid #E0E4E8' }}>
                  <Typography variant="body1" sx={{ color: '#718096' }}>
                    No journeys found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={journeys.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            color: '#718096',
          },
          '.MuiTablePagination-actions': {
            color: '#4299E1',
          }
        }}
      />
    </Box>
  );
};

export default JourneysTable;
