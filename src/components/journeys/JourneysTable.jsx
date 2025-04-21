import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
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
  // Define columns for the table
  const columns = [
    {
      id: 'from',
      label: 'From',
      render: (value, journey, index) => (
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
      )
    },
    {
      id: 'to',
      label: 'To',
      render: (value, journey, index) => (
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
      )
    },
    {
      id: 'vehicleInfo',
      label: 'Vehicle Info',
      render: (value, journey) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="body2" sx={{ color: '#434F64', fontWeight: 500 }}>
              {journey.vehicleInfo || 'KA12 AS 3421'}
            </Typography>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0px 4px',
              height: '16px',
              backgroundColor: journey.communicationType === 'SIM' ? '#E6FFFA' : '#F0FFF4',
              borderRadius: '4px',
            }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 600, color: journey.communicationType === 'SIM' ? '#319795' : '#38A169' }}>
                {journey.communicationType || 'SIM'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="caption" sx={{ color: '#838C9D' }}>
              Laal Kamal Transport Co.
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'tripInfo',
      label: 'Trip Info',
      render: (value, journey, index) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name={journey.communicationType === 'SIM' ? 'Smartphone' : 'Navigation'} size={12} color="#838C9D" />
            <Typography variant="body2" sx={{ color: '#434F64' }}>
              84973-47593
            </Typography>
            {index % 2 === 0 ? (
              <Icon name="Check" size={12} color="#00C638" />
            ) : (
              <Icon name="Close" size={12} color="#E43634" />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '16px' }}>
            <Typography variant="caption" sx={{ color: '#838C9D' }}>
              Laal Kamal Transport Co.
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'status',
      label: 'Status',
      render: (value, journey) => (
        <Box>
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
        </Box>
      )
    },
    {
      id: 'sla',
      label: 'SLA',
      render: (value, journey) => (
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
      )
    },
    {
      id: 'alerts',
      label: 'Alerts',
      width: '80px',
      render: (value, journey, index) => {
        let alertText = '';
        if (index % 3 === 0) alertText = 'Long Stoppage';
        else if (index % 3 === 1) alertText = 'Route Deviation';
        else if (index % 3 === 2) alertText = 'Transit Delay';

        return (
          <Box>
            {alertText && (
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
                  {alertText}
                </Typography>
              </Box>
            )}
            <Typography variant="caption" sx={{ color: '#838C9D' }}>
              1 hour ago
            </Typography>
          </Box>
        );
      }
    },
    {
      id: 'actions',
      label: 'Actions',
      width: '80px',
      align: 'center',
      render: () => (
        <Box sx={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <IconButton
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: '24px',
              height: '24px',
              padding: 0,
              backgroundColor: '#F8F8F9',
              '&:hover': {
                backgroundColor: '#EBEDF0',
              }
            }}
          >
            <Icon name="MoreHorizontal" size={16} color="#838C9D" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              width: '24px',
              height: '24px',
              padding: 0,
              backgroundColor: '#F8F8F9',
              '&:hover': {
                backgroundColor: '#EBEDF0',
              }
            }}
          >
            <Icon name="ChevronRight" size={16} color="#838C9D" />
          </IconButton>
        </Box>
      )
    }
  ];

  // Get status color
  const getStatusColor = (journey) => {
    return journey.isDelayed ? 'error' : 'success';
  };

  // State for selection
  const [selected, setSelected] = useState([]);

  // Handle select all click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = journeys.map((journey) => journey.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Handle checkbox click
  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter(item => item !== id);
    }

    setSelected(newSelected);
  };

  // Check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ color: '#434F64', fontWeight: 500 }}>
          78 Journeys available
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
      </Box>

      <TableContainer component={Paper} sx={{ border: '1px solid #E0E4E8', borderRadius: '4px', mb: 2, boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#F5F7FA' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: '40px', height: '32px', borderBottom: '1px solid #E0E4E8' }}>
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
                    padding: '0px',
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    color: '#434F64',
                    fontWeight: 600,
                    padding: '8px',
                    fontSize: '14px',
                    borderBottom: '1px solid #E0E4E8',
                    ...(column.width && { width: column.width }),
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {journeys.length > 0 ? (
              journeys.map((journey, index) => {
                const isItemSelected = isSelected(journey.id);
                const rowId = journey.id || `row-${index}`;

                return (
                  <TableRow
                    key={rowId}
                    hover
                    onClick={() => onJourneyClick(journey)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      '&:nth-of-type(odd)': {
                        bgcolor: '#F8F8F9',
                      },
                      '&:hover': {
                        bgcolor: '#f0f7ff',
                      },
                      '&.Mui-selected, &.Mui-selected:hover': {
                        bgcolor: '#f0f7ff',
                      },
                    }}
                  >
                    <TableCell padding="checkbox" sx={{ padding: '0 0 0 8px' }}>
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, rowId)}
                        inputProps={{ 'aria-labelledby': `row-${rowId}` }}
                        sx={{
                          color: '#838C9D',
                          '&.Mui-checked': {
                            color: '#434F64',
                          },
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                          sx={{
                            padding: '8px',
                            color: '#434F64',
                          }}
                        >
                          {column.render ? column.render(null, journey, index) : journey[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  align="center"
                  sx={{ py: 3 }}
                >
                  <Typography variant="body1" sx={{ color: '#718096' }}>
                    No journeys found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JourneysTable;
