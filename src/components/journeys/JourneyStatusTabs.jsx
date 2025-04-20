import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { getJourneyCountByStatus } from '../../data/journeyData';
import Icon from '../common/Icon';

/**
 * Journey Status Tabs component
 *
 * @param {Object} props - Component props
 * @param {string} props.activeStatus - Active status tab
 * @param {Function} props.onStatusChange - Function to handle status change
 * @returns {JSX.Element}
 */
const JourneyStatusTabs = ({ activeStatus, onStatusChange }) => {
  // Define the status tabs with icons
  const statusTabs = [
    { value: 'planned', label: 'Planned', count: getJourneyCountByStatus('planned'), icon: 'Clock' },
    { value: 'en-route-to-loading', label: 'En Route to Loading', count: getJourneyCountByStatus('en-route-to-loading'), icon: 'ArrowTopRight' },
    { value: 'at-loading', label: 'At Loading', count: getJourneyCountByStatus('at-loading'), icon: 'Plant' },
    { value: 'in-transit', label: 'In Transit', count: getJourneyCountByStatus('in-transit'), icon: 'Road' },
    { value: 'at-unloading', label: 'At Unloading', count: getJourneyCountByStatus('at-unloading'), icon: 'Warehouse' },
    { value: 'in-return', label: 'In Return', count: getJourneyCountByStatus('in-return'), icon: 'RotateCcw' },
    { value: 'delivered', label: 'Delivered', count: getJourneyCountByStatus('delivered'), icon: 'Check' }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', mb: 2 }}>
      {statusTabs.map((tab) => (
        <Box
          key={tab.value}
          onClick={() => onStatusChange(null, tab.value)}
          sx={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '12px 32px',
            gap: '10px',
            height: '48px',
            borderBottom: activeStatus === tab.value ? '4px solid #434F64' : '1px solid #CED1D7',
            cursor: 'pointer',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',
            height: '24px',
          }}>
            <Icon
              name={tab.icon}
              size={16}
              color={activeStatus === tab.value ? '#434F64' : '#434F64'}
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: activeStatus === tab.value ? 600 : 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64',
              }}
            >
              {tab.label}
            </Typography>
            <Box
              sx={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '3px 4px',
                gap: '10px',
                height: '24px',
                background: '#FFFFFF',
                border: '1px solid #CED1D7',
                borderRadius: '4px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#5F697B',
                }}
              >
                {tab.count}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '10px',
          gap: '10px',
          height: '48px',
          borderBottom: '1px solid #CED1D7',
          flex: 1,
        }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '8px 9px',
          gap: '4px',
          width: '86px',
          height: '48px',
          background: '#F8F8F9',
          borderRadius: '8px',
          marginLeft: 'auto',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 12px',
            gap: '4px',
            width: '32px',
            height: '32px',
            background: activeStatus === 'in-transit' ? '#FFFFFF' : '#F8F8F9',
            boxShadow: activeStatus === 'in-transit' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
            borderRadius: '5px',
          }}>
            <Icon name="Menu" size={16} color="#434F64" />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 12px',
            gap: '4px',
            width: '32px',
            height: '32px',
            background: activeStatus !== 'in-transit' ? '#FFFFFF' : '#F8F8F9',
            boxShadow: activeStatus !== 'in-transit' ? '0px 4px 4px rgba(0, 0, 0, 0.08)' : 'none',
            borderRadius: '5px',
          }}>
            <Icon name="Map" size={16} color="#434F64" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JourneyStatusTabs;
