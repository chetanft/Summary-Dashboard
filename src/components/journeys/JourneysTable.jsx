import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import Icon from '../common/Icon';
import { StandardTable } from '../core';

/**
 * Journeys Table component
 * Using the standardized StandardTable component
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
      sortable: true,
      renderCell: (row) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {row.from.location}
            </Typography>
            {row.from.pickups > 0 && (
              <Box sx={{
                padding: '0 4px',
                height: '16px',
                background: 'background.light',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>
                  +{row.from.pickups} P
                </Typography>
              </Box>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.from.company}
          </Typography>
        </Box>
      )
    },
    {
      id: 'to',
      label: 'To',
      sortable: true,
      renderCell: (row) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {row.to.location}
            </Typography>
            {row.to.drops > 0 && (
              <Box sx={{
                padding: '0 4px',
                height: '16px',
                background: 'background.light',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <Typography sx={{ fontWeight: 600, fontSize: '12px' }}>
                  +{row.to.drops} D
                </Typography>
              </Box>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {row.to.company}
          </Typography>
        </Box>
      )
    },
    {
      id: 'vehicleInfo',
      label: 'Vehicle Info',
      sortable: true,
      renderCell: (row) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {row.vehicleInfo || 'KA12 AS 3421'}
            </Typography>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0px 4px',
              height: '16px',
              backgroundColor: row.communicationType === 'SIM' ? '#E6FFFA' : '#F0FFF4',
              borderRadius: '4px',
            }}>
              <Typography sx={{ fontSize: '10px', fontWeight: 600, color: row.communicationType === 'SIM' ? '#319795' : '#38A169' }}>
                {row.communicationType || 'SIM'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Laal Kamal Transport Co.
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'tripInfo',
      label: 'Trip Info',
      sortable: true,
      renderCell: (row) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Icon name={row.communicationType === 'SIM' ? 'Smartphone' : 'Navigation'} size={12} color="text.secondary" />
            <Typography variant="body2">
              84973-47593
            </Typography>
            {row.isConnected ? (
              <Icon name="Check" size={12} color="success.main" />
            ) : (
              <Icon name="Close" size={12} color="error.main" />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '16px' }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Laal Kamal Transport Co.
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      renderCell: (row) => (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Box sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: row.isDelayed ? 'error.main' : 'success.main',
            }} />
            <Typography variant="body2">
              {row.status === 'in-transit' ? 'In Transit' :
               row.status === 'at-loading' ? 'At Loading' :
               row.status === 'at-unloading' ? 'At Unloading' :
               row.status === 'at-drop' ? 'At Drop' :
               row.status === 'at-pickup' ? 'At Pickup' : 'In Transit'}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginLeft: '12px' }}>
            {row.currentLocation || 'Ambala, Haryana'}
          </Typography>
        </Box>
      )
    },
    {
      id: 'sla',
      label: 'SLA',
      sortable: true,
      renderCell: (row) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            padding: '0 4px',
            height: '16px',
            background: row.isDelayed ? 'error.light' : 'success.light',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            width: 'fit-content',
          }}>
            <Typography sx={{ fontWeight: 600, fontSize: '10px', color: row.isDelayed ? 'error.main' : 'success.main' }}>
              {row.isDelayed ? `Delayed by ${row.delayedBy || '13 hr'}` : 'On time'}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ETA: {row.eta}
          </Typography>
        </Box>
      )
    },
    {
      id: 'alerts',
      label: 'Alerts',
      sortable: true,
      renderCell: (row) => {
        const alertText = row.alertText || '';

        return (
          <Box>
            {alertText && (
              <Box sx={{
                padding: '0 4px',
                height: '16px',
                background: 'error.light',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                width: 'fit-content',
              }}>
                <Typography sx={{ fontWeight: 600, fontSize: '10px', color: 'error.main' }}>
                  {alertText}
                </Typography>
              </Box>
            )}
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {row.alertTime || '1 hour ago'}
            </Typography>
          </Box>
        );
      }
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
      sortable: false,
      renderCell: (row) => (
        <Box sx={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          <IconButton
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: '24px',
              height: '24px',
              padding: 0,
              backgroundColor: 'background.light',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Icon name="MoreHorizontal" size={16} color="text.secondary" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              width: '24px',
              height: '24px',
              padding: 0,
              backgroundColor: 'background.light',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Icon name="ChevronRight" size={16} color="text.secondary" />
          </IconButton>
        </Box>
      )
    }
  ];

  // State for selection
  const [selected, setSelected] = useState([]);

  // Handle selection change
  const handleSelectionChange = (newSelected) => {
    setSelected(newSelected);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {journeys.length} Journeys available
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Favorite">
            <IconButton size="small">
              <Icon name="Star" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small">
              <Icon name="Printer" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filter">
            <IconButton size="small">
              <Icon name="Filter" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Equal Columns">
            <IconButton size="small">
              <Icon name="Columns" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton size="small">
              <Icon name="FileText" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous">
            <IconButton size="small">
              <Icon name="ChevronLeft" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
          <Box sx={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px'
          }}>
            <Typography variant="body2">1</Typography>
          </Box>
          <Tooltip title="Next">
            <IconButton size="small">
              <Icon name="ChevronRight" size={16} color="text.secondary" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <StandardTable
        columns={columns}
        data={journeys}
        onRowClick={onJourneyClick}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        zebra={true}
        // Using default header background color #434F64
        variant="outlined"
        size="small"
        initialSortBy="from"
        initialSortDirection="asc"
        emptyStateMessage="No journeys found"
        rowsPerPageOptions={[10, 25, 50]}
        defaultRowsPerPage={10}
      />
    </Box>
  );
};

export default JourneysTable;
