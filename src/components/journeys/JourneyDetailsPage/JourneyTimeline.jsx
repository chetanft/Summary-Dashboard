import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Journey Timeline component
 * Displays the journey timeline with stops and status
 *
 * @param {Object} props - Component props
 * @param {Array} props.timelineEvents - Array of timeline events
 * @returns {JSX.Element}
 */
const JourneyTimeline = ({ timelineEvents }) => {
  // Default timeline events if none provided
  const events = timelineEvents || [
    {
      id: 1,
      type: 'pre-transit',
      label: 'Pre - transit trip',
      status: 'completed',
      distance: '1242 km',
      time: '2 hrs'
    },
    {
      id: 2,
      type: 'vehicle-assigned',
      label: 'Vehicle assigned',
      location: 'Maan Nagar, Amritsar, Punjab',
      time: '06:14 AM, 11 Mar 23',
      status: 'completed'
    },
    {
      id: 3,
      type: 'in-transit-by-road',
      label: 'In Transit by road',
      distance: '122 km',
      time: '2 hrs',
      status: 'active'
    },
    {
      id: 4,
      type: 'forward-trip',
      label: 'Forward trip',
      distance: '1242 km',
      time: '4 hrs',
      status: 'upcoming'
    },
    {
      id: 5,
      type: 'origin',
      label: 'Origin',
      location: 'MCG Labs Ltd, Amritsar, Punjab',
      time: '2 hrs',
      status: 'upcoming'
    },
    {
      id: 6,
      type: 'in-transit-by-road',
      label: 'In Transit by road',
      distance: '122 km',
      time: '2 hrs',
      status: 'upcoming'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#FFFFFF',
        borderRadius: '8px',
        padding: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '20px'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#5F697B'
          }}
        >
          Trip Summary
        </Typography>
        <Button
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '140%',
            color: '#434F64',
            textTransform: 'none'
          }}
        >
          Trail
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '16px'
        }}
      >
        {events.map((event, index) => (
          <Box
            key={event.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              width: '100%',
              position: 'relative'
            }}
          >
            {/* Timeline connector */}
            {index < events.length - 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '12px',
                  top: '24px',
                  bottom: '-16px',
                  width: '2px',
                  background: event.status === 'completed' ? '#434F64' : '#F0F1F7',
                  zIndex: 0
                }}
              />
            )}

            {/* Timeline dot */}
            <Box
              sx={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: event.status === 'active' ? '#434F64' :
                           event.status === 'completed' ? '#434F64' : '#F0F1F7',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '12px',
                zIndex: 1
              }}
            >
              {event.status === 'completed' && (
                <Icon name="Check" size={14} color="#FFFFFF" useMui={true} />
              )}
            </Box>

            {/* Event content */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: event.status === 'active' ? 600 : 400,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: event.status === 'active' ? '#434F64' : '#434F64'
                  }}
                >
                  {event.label}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D'
                  }}
                >
                  {event.time}
                </Typography>
              </Box>

              {event.location && (
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginTop: '4px'
                  }}
                >
                  {event.location}
                </Typography>
              )}

              {event.distance && (
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginTop: '4px'
                  }}
                >
                  Distance traveled: {event.distance}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

JourneyTimeline.propTypes = {
  timelineEvents: PropTypes.array
};

export default JourneyTimeline;
