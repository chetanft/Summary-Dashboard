import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Planned Route component
 * Displays the planned route with stops
 *
 * @param {Object} props - Component props
 * @param {Array} props.stops - Array of stops
 * @returns {JSX.Element}
 */
const PlannedRoute = ({ stops }) => {
  // Default stops if none provided
  const routeStops = stops || [
    {
      id: 'origin',
      name: 'MCG Labs Ltd',
      location: 'Amritsar, Punjab',
      rating: 3.9,
      type: 'origin'
    },
    {
      id: 'stop-1',
      name: 'Sai Traders',
      location: 'Delhi',
      rating: 3.9,
      type: 'pickup'
    },
    {
      id: 'stop-2',
      name: 'Pro Actives',
      location: 'Jaipur, Rajasthan',
      rating: 3.9,
      type: 'pickup'
    },
    {
      id: 'stop-3',
      name: 'Jai Sri Ram',
      location: 'Ahmedabad, Gujarat',
      rating: 3.9,
      type: 'delivery'
    },
    {
      id: 'stop-4',
      name: 'Jai Sri Ram',
      location: 'Nasik, Maharashtra',
      rating: 3.9,
      type: 'delivery'
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '20px',
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
          color: '#5F697B',
          marginBottom: '16px'
        }}
      >
        Planned route
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          overflowX: 'auto',
          gap: '20px',
          padding: '10px 0'
        }}
      >
        {routeStops.map((stop, index) => (
          <React.Fragment key={stop.id}>
            {/* Stop */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minWidth: '200px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}
              >
                <Box
                  sx={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#434F64',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '12px'
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#434F64'
                  }}
                >
                  {stop.type === 'origin' ? 'Origin' :
                   stop.type === 'pickup' ? 'Pickup ' + index :
                   'Stop ' + index}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginLeft: '30px'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#434F64'
                  }}
                >
                  {stop.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
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
                    {stop.location}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <Icon name="Star" size={12} color="#FFCA35" useMui={true} />
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
                      {stop.rating}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '140%',
                    color: '#838C9D'
                  }}
                >
                  {stop.contactInfo || 'LR: 5848567367'}
                </Typography>
              </Box>
            </Box>

            {/* Connector */}
            {index < routeStops.length - 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '100px',
                    height: '1px',
                    background: '#CED1D7'
                  }}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

PlannedRoute.propTypes = {
  stops: PropTypes.array
};

export default PlannedRoute;
