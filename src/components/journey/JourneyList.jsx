import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Pagination,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import { useJourney } from '../../contexts/JourneyContext';
import Icon from '../common/Icon';
import { formatDate } from '../../utils/dateUtils';

// Status color mapping
const statusColors = {
  'planned': 'info',
  'en-route-to-loading': 'info',
  'at-loading': 'warning',
  'in-transit': 'primary',
  'at-unloading': 'warning',
  'in-return': 'warning',
  'delivered': 'success',
};

// Status label mapping
const statusLabels = {
  'planned': 'Planned',
  'en-route-to-loading': 'En Route to Loading',
  'at-loading': 'At Loading',
  'in-transit': 'In Transit',
  'at-unloading': 'At Unloading',
  'in-return': 'In Return',
  'delivered': 'Delivered',
};

// Journey type label mapping
const typeLabels = {
  'ftl': 'FTL',
  'ptl': 'PTL',
};

const JourneyList = ({ journeys, onJourneyClick }) => {
  const { 
    filters, 
    setFilters, 
    totalPages, 
    totalItems, 
    setPage, 
    loading 
  } = useJourney();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (field) => {
    const isAsc = filters.sortBy === field && filters.sortOrder === 'asc';
    setFilters({
      sortBy: field,
      sortOrder: isAsc ? 'desc' : 'asc',
    });
  };

  const createSortHandler = (field) => () => {
    handleSort(field);
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="journeys table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'id'}
                  direction={filters.sortBy === 'id' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('id')}
                >
                  Journey ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'tripId'}
                  direction={filters.sortBy === 'tripId' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('tripId')}
                >
                  Trip ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'type'}
                  direction={filters.sortBy === 'type' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'from.location'}
                  direction={filters.sortBy === 'from.location' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('from.location')}
                >
                  From
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'to.location'}
                  direction={filters.sortBy === 'to.location' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('to.location')}
                >
                  To
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'status'}
                  direction={filters.sortBy === 'status' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'expectedDeparture'}
                  direction={filters.sortBy === 'expectedDeparture' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('expectedDeparture')}
                >
                  Expected Departure
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={filters.sortBy === 'expectedArrival'}
                  direction={filters.sortBy === 'expectedArrival' ? filters.sortOrder : 'asc'}
                  onClick={createSortHandler('expectedArrival')}
                >
                  Expected Arrival
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Box sx={{ py: 3 }}>
                    <Icon name="Search" size={48} sx={{ color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No journeys found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your filters or search criteria
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              journeys.map((journey) => (
                <TableRow
                  key={journey.id}
                  sx={{
                    '&:hover': { backgroundColor: 'action.hover' },
                    cursor: 'pointer',
                  }}
                  onClick={() => onJourneyClick(journey.id)}
                >
                  <TableCell component="th" scope="row">
                    {journey.id}
                  </TableCell>
                  <TableCell>{journey.tripId}</TableCell>
                  <TableCell>
                    <Chip
                      label={typeLabels[journey.type] || journey.type}
                      size="small"
                      color={journey.type === 'ftl' ? 'primary' : 'secondary'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{journey.from.location}</TableCell>
                  <TableCell>{journey.to.location}</TableCell>
                  <TableCell>
                    <Chip
                      label={statusLabels[journey.status] || journey.status}
                      size="small"
                      color={statusColors[journey.status] || 'default'}
                    />
                    {journey.isDelayed && (
                      <Tooltip title={`Delayed by ${journey.delayTime}`}>
                        <Chip
                          icon={<Icon name="Clock" size={14} />}
                          label="Delayed"
                          size="small"
                          color="error"
                          sx={{ ml: 1 }}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(journey.expectedDeparture)}</TableCell>
                  <TableCell>{formatDate(journey.expectedArrival)}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onJourneyClick(journey.id);
                      }}
                    >
                      <Icon name="Eye" size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {totalItems > 0
            ? `Showing ${(filters.page - 1) * filters.limit + 1} to ${
                Math.min(filters.page * filters.limit, totalItems)
              } of ${totalItems} journeys`
            : 'No journeys found'}
        </Typography>
        <Pagination
          count={totalPages}
          page={filters.page}
          onChange={handleChangePage}
          disabled={loading}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

JourneyList.propTypes = {
  journeys: PropTypes.array.isRequired,
  onJourneyClick: PropTypes.func.isRequired,
};

export default JourneyList;
