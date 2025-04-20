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
  TablePagination,
  Button,
  Divider,
  Grid
} from '@mui/material';
import { Badge } from '../../components/core';
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
      {/* Toggle Container */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, height: '40px' }}>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#434F64' }}>
          {journeys.length} Journeys available
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '18px', height: '40px' }}>
          <IconButton sx={{ width: '40px', height: '40px', borderRadius: '8px' }}>
            <Icon name="Download" size={20} color="#434F64" />
          </IconButton>

          <IconButton sx={{ width: '40px', height: '40px', borderRadius: '8px' }}>
            <Icon name="ListFilter" size={20} color="#434F64" />
          </IconButton>

          <IconButton sx={{ width: '40px', height: '40px', borderRadius: '8px' }}>
            <Icon name="Settings" size={20} color="#434F64" />
          </IconButton>

          <IconButton sx={{ width: '40px', height: '40px', borderRadius: '8px' }}>
            <Icon name="Filter" size={20} color="#434F64" />
          </IconButton>

          <IconButton sx={{ width: '40px', height: '40px', borderRadius: '8px' }}>
            <Icon name="ArrowDownUp" size={20} color="#434F64" />
          </IconButton>

          <IconButton sx={{ width: '40px', height: '40px', borderRadius: '8px' }}>
            <Icon name="FileSpreadsheet" size={20} color="#434F64" />
          </IconButton>

          <Box sx={{ display: 'flex', gap: '8px' }}>
            <IconButton sx={{ width: '39px', height: '39px', backgroundColor: '#FFFFFF', borderRadius: '100px' }}>
              <Icon name="ChevronLeft" size={16} color="#434F64" />
            </IconButton>

            <Box sx={{
              width: '54px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #CED1D7',
              borderRadius: '8px'
            }}>
              <Typography variant="body1" sx={{ color: '#434F64' }}>1</Typography>
            </Box>

            <IconButton sx={{ width: '39px', height: '39px', backgroundColor: '#FFFFFF', borderRadius: '100px' }}>
              <Icon name="ChevronRight" size={16} color="#434F64" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #CED1D7', borderRadius: '8px', mb: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#838C9D' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '86px', height: '50px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', ml: 2 }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < journeys.length}
                    checked={journeys.length > 0 && selected.length === journeys.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all journeys' }}
                    sx={{
                      color: '#FFFFFF',
                      '&.Mui-checked': {
                        color: '#FFFFFF',
                      },
                      '&.MuiCheckbox-indeterminate': {
                        color: '#FFFFFF',
                      },
                    }}
                  />
                  <Icon name="ChevronDown" size={16} color="#FFFFFF" />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>From</Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>To</Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>Vehicle Info</Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>Trip Info</Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>Status</Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>ETA</Typography>
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF', height: '50px', width: '124px' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>Actions</Typography>
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
                      height: '116px',
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8F8F9',
                      borderBottom: '1px solid #CED1D7',
                      '&.Mui-selected, &.Mui-selected:hover': {
                        backgroundColor: index % 2 === 0 ? '#F0F7FF' : '#E6F0FF',
                      },
                      '&:hover': {
                        backgroundColor: index % 2 === 0 ? '#F5F9FF' : '#EFF5FF',
                      },
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ height: '116px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 2 }}>
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
                        <Icon name="Frame" size={20} color="#CED1D7" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '54px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Typography variant="body1" sx={{ fontWeight: 400, color: '#434F64' }}>
                            {journey.from.location}
                          </Typography>
                          <Box sx={{
                            padding: '2px 8px',
                            height: '24px',
                            background: '#F0F1F7',
                            border: '1px solid #CED1D7',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#434F64' }}>
                              FTL
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#5F697B' }}>
                          {journey.from.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '54px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Typography variant="body1" sx={{ fontWeight: 400, color: '#434F64' }}>
                            {journey.to.location}
                          </Typography>
                          <Box sx={{
                            padding: '2px 8px',
                            height: '24px',
                            background: '#F0F1F7',
                            border: '1px solid #CED1D7',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#434F64' }}>
                              PTL
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#5F697B' }}>
                          {journey.to.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '60px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Typography variant="body1" sx={{ color: '#434F64' }}>
                            {journey.vehicleInfo}
                          </Typography>
                          <Box sx={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: '#F0F1F7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon name="Truck" size={16} color="#5F697B" />
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#5F697B' }}>
                          {journey.currentLocation || 'Location not available'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '52px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon name={journey.isDelayed ? 'AlertCircle' : 'CheckCircle'} size={14} color={journey.isDelayed ? '#FF3533' : '#00C638'} />
                          <Typography variant="body1" sx={{ color: '#434F64' }}>
                            {journey.isDelayed ? 'Delayed' : 'On Time'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Icon name="Clock" size={16} color="#838C9D" />
                          <Typography variant="body1" sx={{ color: '#838C9D' }}>
                            {journey.departureTime}
                          </Typography>
                          <Box sx={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '16px',
                            backgroundColor: journey.isDelayed ? '#FFEAEA' : '#DFFFE8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon name={journey.isDelayed ? 'X' : 'Check'} size={14} color={journey.isDelayed ? '#FF3533' : '#00763D'} />
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '52px' }}>
                        <Box sx={{
                          padding: '2px 8px',
                          height: '24px',
                          background: journey.isDelayed ? '#FFEAEA' : '#DFFFE8',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '14px', color: journey.isDelayed ? '#FF3533' : '#00763D' }}>
                            {journey.isDelayed ? 'Delayed' : 'On Time'}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#838C9D' }}>
                          ETA: {journey.eta}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '54px' }}>
                        <Box sx={{
                          padding: '2px 8px',
                          height: '24px',
                          background: journey.isDelayed ? '#FFEAEA' : '#DFFFE8',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '14px', color: journey.isDelayed ? '#FF3533' : '#00763D' }}>
                            {journey.isDelayed ? `Delayed by ${journey.delayTime}` : 'On Schedule'}
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#838C9D' }}>
                          {journey.vehicleStatus}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: '12px', ml: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #CED1D7',
                            borderRadius: '100px'
                          }}
                        >
                          <Icon name="MoreHorizontal" size={16} color="#434F64" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid #CED1D7',
                            borderRadius: '100px'
                          }}
                        >
                          <Icon name="ChevronRight" size={16} color="#434F64" />
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
