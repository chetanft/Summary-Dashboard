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
  Tooltip
} from '@mui/material';
import Icon from '../common/Icon';

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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 1, gap: 1 }}>
        <Tooltip title="Favorite">
          <IconButton size="small">
            <Icon name="Star" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton size="small">
            <Icon name="Printer" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Filter">
          <IconButton size="small">
            <Icon name="Filter" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Equal Columns">
          <IconButton size="small">
            <Icon name="Columns" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Export">
          <IconButton size="small">
            <Icon name="FileText" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Previous">
          <IconButton size="small">
            <Icon name="ChevronLeft" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
        <Box sx={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #E0E4E8',
          borderRadius: '4px'
        }}>
          <Typography variant="body2" sx={{ color: '#434F64' }}>1</Typography>
        </Box>
        <Tooltip title="Next">
          <IconButton size="small">
            <Icon name="ChevronRight" size={16} color="#838C9D" />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer component={Paper} sx={{ border: '1px solid #E0E4E8', borderRadius: '4px', mb: 2, boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#F5F7FA' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '40px', height: '40px', borderBottom: '1px solid #E0E4E8' }}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < journeys.length}
                  checked={journeys.length > 0 && selected.length === journeys.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all journeys' }}
                  sx={{
                    color: '#838C9D',
                    '&.Mui-checked': {
                      color: '#434F64',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: '#434F64',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px' }}>
                From
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px' }}>
                To
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px' }}>
                Vehicle Info
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px' }}>
                Trip Info
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px' }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px' }}>
                SLA
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px', width: '80px' }}>
                Alerts
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#434F64', height: '40px', borderBottom: '1px solid #E0E4E8', padding: '8px', width: '80px' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((journey, index) => {
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
                      height: '48px',
                      backgroundColor: '#FFFFFF',
                      borderBottom: '1px solid #E0E4E8',
                      '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: '#F5F7FA',
                      },
                      '&:hover': {
                        backgroundColor: '#F5F7FA',
                      },
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ padding: '0 0 0 8px', height: '48px', borderBottom: '1px solid #E0E4E8' }}>
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, journey.id)}
                        inputProps={{ 'aria-labelledby': `journey-${journey.id}` }}
                        sx={{
                          color: '#838C9D',
                          '&.Mui-checked': {
                            color: '#434F64',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#434F64' }}>
                            {journey.from.location}
                          </Typography>
                          {index === 0 && (
                            <Box sx={{
                              padding: '0 4px',
                              height: '16px',
                              background: '#F5F7FA',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                              <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#434F64' }}>
                                +1 P
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#838C9D' }}>
                          {journey.from.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#434F64' }}>
                            {journey.to.location}
                          </Typography>
                          {index === 0 && (
                            <Box sx={{
                              padding: '0 4px',
                              height: '16px',
                              background: '#F5F7FA',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                            }}>
                              <Typography sx={{ fontWeight: 600, fontSize: '12px', color: '#434F64' }}>
                                +3 D
                              </Typography>
                            </Box>
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#838C9D' }}>
                          {journey.to.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Typography variant="body2" sx={{ color: '#434F64' }}>
                          {journey.vehicleInfo}
                        </Typography>
                        {journey.communicationType && (
                          <Chip
                            label={journey.communicationType}
                            size="small"
                            sx={{
                              height: '16px',
                              fontSize: '10px',
                              backgroundColor: journey.communicationType === 'SIM' ? '#E6FFFA' : '#F0FFF4',
                              color: journey.communicationType === 'SIM' ? '#319795' : '#38A169',
                              fontWeight: 500,
                              '& .MuiChip-label': { padding: '0 4px' }
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" sx={{ color: '#434F64' }}>
                          {journey.tripInfo}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Icon name="Phone" size={12} color="#838C9D" />
                          <Typography variant="caption" sx={{ color: '#838C9D' }}>
                            {journey.contactNumber}
                          </Typography>
                          {index % 2 === 0 && (
                            <Icon name="Check" size={12} color="#00C638" />
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Box sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: journey.isDelayed ? '#E43634' : '#00C638',
                        }} />
                        <Typography variant="body2" sx={{ color: '#434F64' }}>
                          {journey.status === 'in-transit' ? 'In Transit' :
                           journey.status === 'at-loading' ? 'At Loading' :
                           journey.status === 'at-unloading' ? 'At Unloading' :
                           journey.status === 'at-drop' ? 'At Drop' :
                           journey.status === 'at-pickup' ? 'At Pickup' : 'In Transit'}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#838C9D', display: 'block', marginLeft: '12px' }}>
                        Ambala, Haryana
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{
                          padding: '0 4px',
                          height: '16px',
                          background: journey.isDelayed ? '#FFEBEB' : '#EBFFF0',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          width: 'fit-content',
                        }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '10px', color: journey.isDelayed ? '#E43634' : '#00C638' }}>
                            {journey.isDelayed ? 'Delayed by 13 hr' : 'On time'}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#838C9D' }}>
                          ETA: {journey.eta}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      {index % 3 === 0 && (
                        <Box sx={{
                          padding: '0 4px',
                          height: '16px',
                          background: '#FFEBEB',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          width: 'fit-content',
                        }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '10px', color: '#E43634' }}>
                            Long Stoppage
                          </Typography>
                        </Box>
                      )}
                      {index % 3 === 1 && (
                        <Box sx={{
                          padding: '0 4px',
                          height: '16px',
                          background: '#FFEBEB',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          width: 'fit-content',
                        }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '10px', color: '#E43634' }}>
                            Route Deviation
                          </Typography>
                        </Box>
                      )}
                      {index % 3 === 2 && (
                        <Box sx={{
                          padding: '0 4px',
                          height: '16px',
                          background: '#FFEBEB',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          width: 'fit-content',
                        }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '10px', color: '#E43634' }}>
                            Transit Delay
                          </Typography>
                        </Box>
                      )}
                      <Typography variant="caption" sx={{ color: '#838C9D' }}>
                        1 hour ago
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ padding: '8px', borderBottom: '1px solid #E0E4E8' }}>
                      <Box sx={{ display: 'flex', gap: '4px' }}>
                        <IconButton
                          size="small"
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            width: '24px',
                            height: '24px',
                            padding: 0
                          }}
                        >
                          <Icon name="MoreHorizontal" size={16} color="#838C9D" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            width: '24px',
                            height: '24px',
                            padding: 0
                          }}
                        >
                          <Icon name="ChevronRight" size={16} color="#838C9D" />
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

      {/* We're not using the standard TablePagination as it's already implemented in the action buttons above */}
    </Box>
  );
};

export default JourneysTable;
