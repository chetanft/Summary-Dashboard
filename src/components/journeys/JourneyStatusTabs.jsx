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
    { value: 'planned', label: 'Planned', count: 56, icon: 'Clock' },
    { value: 'en-route-to-loading', label: 'En Route to Loading', count: 34, icon: 'ArrowTopRight' },
    { value: 'at-loading', label: 'At Loading', count: 56, icon: 'Plant' },
    { value: 'in-transit', label: 'In Transit', count: 78, icon: 'Road' },
    { value: 'at-unloading', label: 'At Unloading', count: 23, icon: 'Warehouse' },
    { value: 'in-return', label: 'In Return', count: 56, icon: 'RotateCcw' },
    { value: 'delivered', label: 'Delivered', count: 56, icon: 'Check' }
  ];

  // Define status badges
  const statusBadges = [
    { label: 'Long Stoppage', count: 19, color: '#E43634' },
    { label: 'Route Deviation', count: 19, color: '#E43634' },
    { label: 'Delayed', count: 51, color: '#E43634' },
    { label: '6 hrs', count: 28, color: '#434F64' },
    { label: '12-18 hrs', count: 18, color: '#434F64' },
    { label: '18+ hrs', count: 5, color: '#434F64' },
    { label: 'Way Bill', count: 'E', color: '#434F64' },
    { label: 'Expiring in 3 hrs', count: 28, color: '#434F64' },
    { label: 'Expired', count: 18, color: '#E43634' },
    { label: 'ETA', count: '28', color: '#434F64', suffix: '6 hrs' },
    { label: '12 hrs', count: 18, color: '#434F64' },
    { label: '24+ hrs', count: 5, color: '#434F64' }
  ];

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {/* Journey Status Tabs */}
      <Box sx={{ display: 'flex', borderBottom: '1px solid #E0E4E8', mb: 1 }}>
        {statusTabs.map((tab) => (
          <Box
            key={tab.value}
            onClick={() => onStatusChange(null, tab.value)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              borderBottom: activeStatus === tab.value ? '2px solid #434F64' : 'none',
              cursor: 'pointer',
              position: 'relative',
              '&:after': activeStatus === tab.value ? {
                content: '""',
                position: 'absolute',
                bottom: '-1px',
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: '#FFF',
              } : {}
            }}
          >
            <Icon
              name={tab.icon}
              size={16}
              color={activeStatus === tab.value ? '#434F64' : '#838C9D'}
              style={{ marginRight: '8px' }}
            />
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: activeStatus === tab.value ? 600 : 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: activeStatus === tab.value ? '#434F64' : '#838C9D',
                marginRight: '8px',
              }}
            >
              {tab.label}
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '20px',
                height: '20px',
                backgroundColor: activeStatus === tab.value ? '#434F64' : '#E0E4E8',
                color: activeStatus === tab.value ? '#FFFFFF' : '#838C9D',
                borderRadius: '10px',
                padding: '0 6px',
                fontSize: '12px',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {tab.count}
            </Box>
          </Box>
        ))}
        <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #E0E4E8',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
            }}>
              <Icon name="List" size={16} color="#434F64" />
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              backgroundColor: '#F5F7FA',
              cursor: 'pointer',
            }}>
              <Icon name="Map" size={16} color="#434F64" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Status Badges */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#FFEBEB',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            19
          </Typography>
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Long Stoppage
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#FFEBEB',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            19
          </Typography>
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Route Deviation
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#FFEBEB',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            51
          </Typography>
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Delayed
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            28
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            6 hrs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            18
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            12-18 hrs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            05
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            18+ hrs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            E
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            Way Bill
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            28
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            Expiring in 3 hrs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#FFEBEB',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            18
          </Typography>
          <Typography
            sx={{
              color: '#E43634',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Expired
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            ETA
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            28
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              marginLeft: '4px',
            }}
          >
            6 hrs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            18
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            12 hrs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px 8px',
            backgroundColor: '#F5F7FA',
            borderRadius: '4px',
            height: '24px',
          }}
        >
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              marginRight: '4px',
            }}
          >
            05
          </Typography>
          <Typography
            sx={{
              color: '#434F64',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
            }}
          >
            24+ hrs
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default JourneyStatusTabs;
