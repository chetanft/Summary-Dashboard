import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Popover
} from '@mui/material';
import {
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const TransactionsTable = ({ trips, onTripSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');
  const [alertPopoverAnchor, setAlertPopoverAnchor] = useState(null);
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleAlertClick = (event, alerts) => {
    setAlertPopoverAnchor(event.currentTarget);
    setSelectedAlerts(alerts);
  };

  const handleAlertPopoverClose = () => {
    setAlertPopoverAnchor(null);
    setSelectedAlerts([]);
  };

  // Sort function
  const sortedTrips = [...trips].sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];
    
    // Special handling for nested properties or calculated values
    if (orderBy === 'indentIssue') {
      aValue = a.indentIssues.length > 0;
      bValue = b.indentIssues.length > 0;
    } else if (orderBy === 'inTransitAlerts') {
      aValue = a.inTransitAlerts.length;
      bValue = b.inTransitAlerts.length;
    } else if (orderBy === 'epodIssue') {
      aValue = a.epodIssues.length > 0;
      bValue = b.epodIssues.length > 0;
    }
    
    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const paginatedTrips = sortedTrips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#52C41A';
      case 'Delayed':
        return '#FF4D4F';
      case 'In Transit':
        return '#1890FF';
      default:
        return '#5F697B';
    }
  };

  // Get escalation color
  const getEscalationColor = (status) => {
    switch (status) {
      case 'None':
        return '#52C41A';
      case 'Level 1':
        return '#FAAD14';
      case 'Level 2':
        return '#FF7A45';
      case 'Level 3':
        return '#FF4D4F';
      case 'Resolved':
        return '#52C41A';
      default:
        return '#5F697B';
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: '8px', border: '1px solid #E0E0E0', boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#F8F9FA' }}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'tripId'}
                  direction={orderBy === 'tripId' ? order : 'asc'}
                  onClick={() => handleRequestSort('tripId')}
                >
                  Trip ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'indentIssue'}
                  direction={orderBy === 'indentIssue' ? order : 'asc'}
                  onClick={() => handleRequestSort('indentIssue')}
                >
                  Indent Issue
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'inTransitAlerts'}
                  direction={orderBy === 'inTransitAlerts' ? order : 'asc'}
                  onClick={() => handleRequestSort('inTransitAlerts')}
                >
                  In-Transit Alerts
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'epodIssue'}
                  direction={orderBy === 'epodIssue' ? order : 'asc'}
                  onClick={() => handleRequestSort('epodIssue')}
                >
                  ePOD Issue
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'escalationStatus'}
                  direction={orderBy === 'escalationStatus' ? order : 'asc'}
                  onClick={() => handleRequestSort('escalationStatus')}
                >
                  Escalation Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'delayDuration'}
                  direction={orderBy === 'delayDuration' ? order : 'asc'}
                  onClick={() => handleRequestSort('delayDuration')}
                >
                  Delay Duration
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'currentStatus'}
                  direction={orderBy === 'currentStatus' ? order : 'asc'}
                  onClick={() => handleRequestSort('currentStatus')}
                >
                  Current Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'actionTaken'}
                  direction={orderBy === 'actionTaken' ? order : 'asc'}
                  onClick={() => handleRequestSort('actionTaken')}
                >
                  Action Taken
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrips.map((trip) => (
              <TableRow
                key={trip.tripId}
                hover
                onClick={() => onTripSelect(trip)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#F5F5F5',
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {trip.tripId}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#5F697B' }}>
                    {trip.vehicleNumber}
                  </Typography>
                </TableCell>
                <TableCell>
                  {trip.indentIssues.length > 0 ? (
                    <Chip 
                      label="Yes" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#FFF2F0', 
                        color: '#FF4D4F',
                        fontWeight: 500,
                      }} 
                    />
                  ) : (
                    <Chip 
                      label="No" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#F6FFED', 
                        color: '#52C41A',
                        fontWeight: 500,
                      }} 
                    />
                  )}
                </TableCell>
                <TableCell>
                  {trip.inTransitAlerts.length > 0 ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip 
                        label={trip.inTransitAlerts.length} 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#FFF2F0', 
                          color: '#FF4D4F',
                          fontWeight: 500,
                          mr: 0.5,
                        }} 
                      />
                      <Tooltip title="View alerts">
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAlertClick(e, trip.inTransitAlerts);
                          }}
                        >
                          <InfoIcon fontSize="small" sx={{ color: '#5F697B' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <Chip 
                      label="0" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#F6FFED', 
                        color: '#52C41A',
                        fontWeight: 500,
                      }} 
                    />
                  )}
                </TableCell>
                <TableCell>
                  {trip.epodIssues.length > 0 ? (
                    <Chip 
                      label="Yes" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#FFF2F0', 
                        color: '#FF4D4F',
                        fontWeight: 500,
                      }} 
                    />
                  ) : (
                    <Chip 
                      label="No" 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#F6FFED', 
                        color: '#52C41A',
                        fontWeight: 500,
                      }} 
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={trip.escalationStatus} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                      color: getEscalationColor(trip.escalationStatus),
                      fontWeight: 500,
                    }} 
                  />
                </TableCell>
                <TableCell>
                  {trip.delayDuration > 0 ? (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: trip.delayDuration > 12 ? '#FF4D4F' : '#FAAD14',
                        fontWeight: 500,
                      }}
                    >
                      {trip.delayDuration} hrs
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ color: '#52C41A', fontWeight: 500 }}>
                      On Time
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={trip.currentStatus} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.04)', 
                      color: getStatusColor(trip.currentStatus),
                      fontWeight: 500,
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {trip.actionTaken}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('More actions for', trip.tripId);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={trips.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {/* Alert Popover */}
      <Popover
        open={Boolean(alertPopoverAnchor)}
        anchorEl={alertPopoverAnchor}
        onClose={handleAlertPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: 320,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          In-Transit Alerts
        </Typography>
        {selectedAlerts.map((alert, index) => (
          <Box key={index} sx={{ mb: index < selectedAlerts.length - 1 ? 1.5 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              {alert.status === 'Active' ? (
                <ErrorIcon fontSize="small" sx={{ color: '#FF4D4F', mr: 1 }} />
              ) : (
                <CheckCircleIcon fontSize="small" sx={{ color: '#52C41A', mr: 1 }} />
              )}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {alert.type}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#5F697B', display: 'block', ml: 4 }}>
              {new Date(alert.timestamp).toLocaleString()}
            </Typography>
            <Typography variant="caption" sx={{ color: '#5F697B', display: 'block', ml: 4 }}>
              {alert.description}
            </Typography>
            {alert.action && (
              <Typography variant="caption" sx={{ color: '#5F697B', display: 'block', ml: 4 }}>
                <strong>Action:</strong> {alert.action}
              </Typography>
            )}
          </Box>
        ))}
      </Popover>
    </>
  );
};

export default TransactionsTable;
