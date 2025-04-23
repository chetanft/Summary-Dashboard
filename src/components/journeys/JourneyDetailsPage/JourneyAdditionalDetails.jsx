import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Journey Additional Details component
 * Displays additional details about the journey
 *
 * @param {Object} props - Component props
 * @param {Object} props.journeyDetails - Journey details object
 * @returns {JSX.Element}
 */
const JourneyAdditionalDetails = ({ journeyDetails }) => {
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
        Journey details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              background: '#FFFFFF',
              borderRadius: '8px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}
            >
              <Icon name="NorthEast" size={16} color="#434F64" useMui={true} />
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
                Outbound
              </Typography>
              <Box sx={{ flex: 1 }} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Icon name="Refresh" size={16} color="#434F64" useMui={true} />
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
                  Round Trip
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Icon name="LocalShipping" size={16} color="#434F64" useMui={true} />
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
                  Trip ID: 4877383
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '16px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Route
                </Typography>
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
                  Amritsar - Mumbai
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Standard transit time (planned)
                </Typography>
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
                  3 days
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Invoice: DC4378
                </Typography>
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
                  Plan ID: C04378
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Standard time of arrival (ETA)
                </Typography>
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
                  06:14 AM, 11 Mar 23
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Typography
        sx={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '140%',
          color: '#5F697B',
          marginTop: '24px',
          marginBottom: '16px'
        }}
      >
        Additional details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              background: '#FFFFFF',
              borderRadius: '8px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '16px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Created on:
                </Typography>
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
                  8:40 AM, 11 Mar 24
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Started on:
                </Typography>
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
                  8:40 AM, 11 Mar 24
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '140%',
                    color: '#838C9D',
                    marginBottom: '4px'
                  }}
                >
                  Freight Value:
                </Typography>
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
                  ₹ 1,00,000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

JourneyAdditionalDetails.propTypes = {
  journeyDetails: PropTypes.object.isRequired
};

export default JourneyAdditionalDetails;
