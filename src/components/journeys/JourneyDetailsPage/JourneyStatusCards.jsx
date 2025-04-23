import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Journey Status Cards component
 * Displays status information cards for the journey
 *
 * @param {Object} props - Component props
 * @param {Object} props.journeyDetails - Journey details object
 * @returns {JSX.Element}
 */
const JourneyStatusCards = ({ journeyDetails }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '20px',
        width: '100%',
        height: 'auto',
        marginTop: '20px',
        marginBottom: '20px'
      }}
    >
      {/* Status Card */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '20px',
          gap: '20px',
          background: '#FFFFFF',
          borderRadius: '8px',
          flex: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              gap: '80px',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2px 8px',
                gap: '8px',
                background: '#F0F1F7',
                borderRadius: '4px',
                height: '24px'
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
                {journeyDetails?.status?.label || 'In Transit'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2px 8px',
                gap: '8px',
                background: '#DFFFE8',
                borderRadius: '4px',
                height: '24px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#00763D'
                }}
              >
                On time
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: '0px',
              gap: '8px',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '140%',
                  color: '#5F697B'
                }}
              >
                ETA
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '140%',
                  color: '#434F64'
                }}
              >
                {journeyDetails?.eta || '09:34 AM, 12 Mar 23'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#838C9D'
                }}
              >
                STA
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '140%',
                  color: '#434F64'
                }}
              >
                {journeyDetails?.sta || '09:34 AM, 11 Mar 23'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px',
            gap: '20px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '140%',
                color: '#5F697B'
              }}
            >
              {journeyDetails?.completionPercentage || '24%'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '5px'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#5F697B'
                }}
              >
                {journeyDetails?.distanceCompleted || '226 km'} / {journeyDetails?.totalDistance || '1242 km'}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '10px',
                  width: '100%',
                  height: '6px',
                  background: '#F0F1F7',
                  borderRadius: '60px'
                }}
              >
                <Box
                  sx={{
                    width: `${journeyDetails?.completionPercentageValue || 24}%`,
                    height: '6px',
                    background: '#434F64',
                    borderRadius: '4px',
                    transform: 'matrix(-1, 0, 0, 1, 0, 0)'
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px'
            }}
          >
            <Box
              sx={{
                width: '46px',
                height: '26px',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '13px',
                  height: '18px',
                  left: '17px',
                  top: '4px',
                  background: '#00763D',
                  border: '3px solid #00763D'
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '140%',
                color: '#5F697B'
              }}
            >
              {journeyDetails?.averageSpeed || '52 km/day'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Last Known Location Card */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '20px',
          gap: '20px',
          background: '#FFFFFF',
          borderRadius: '8px',
          flex: 0.65
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2px 8px',
              gap: '8px',
              background: '#F0F1F7',
              borderRadius: '4px',
              height: '24px'
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
              Location
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '8px'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#838C9D'
              }}
            >
              Last Location
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64'
              }}
            >
              {journeyDetails?.lastLocation || 'Jaipur, Rajasthan (10:20 AM, 11 Mar 23)'}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              width: '100%'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#838C9D'
              }}
            >
              Next Stop:
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64'
              }}
            >
              {journeyDetails?.nextStop || 'Mumbai, Maharashtra'}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              width: '100%'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#838C9D'
              }}
            >
              ETA:
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64'
              }}
            >
              {journeyDetails?.nextStopEta || '01:20 AM, 11 Mar 23'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Vehicle Info Card */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '20px',
          gap: '20px',
          background: '#FFFFFF',
          borderRadius: '8px',
          flex: 0.9
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px',
            width: '100%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0px',
              gap: '80px',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2px 8px',
                gap: '8px',
                background: '#F0F1F7',
                borderRadius: '4px',
                height: '24px'
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
                {journeyDetails.vehicleType || 'Multi Axle Truck'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2px 8px',
                gap: '8px',
                background: '#F0F1F7',
                borderRadius: '4px',
                height: '24px'
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
                {journeyDetails.vehicleId || 'LCU/Details'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '18px',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '4px'
              }}
            >
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
                {journeyDetails.driverName || 'Raju Rastogi'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '2px 8px',
                gap: '8px',
                background: '#F0F1F7',
                borderRadius: '4px',
                height: '24px'
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
                {journeyDetails.driverStatus || 'Active source'}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '18px',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '4px'
              }}
            >
              <Icon name="Phone" size={16} color="#838C9D" useMui={true} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#838C9D'
                }}
              >
                {journeyDetails.driverPhone || '9873 47053'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '8px'
              }}
            >
              <Icon name="Person" size={16} color="#838C9D" useMui={true} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  color: '#838C9D'
                }}
              >
                Driver SIM
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px',
            width: '100%'
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '140%',
              color: '#838C9D'
            }}
          >
            Transporter
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '16px',
              width: '100%'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '140%',
                color: '#434F64'
              }}
            >
              {journeyDetails.transporter || 'Yomee Transporter'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px',
                gap: '8px'
              }}
            >
              <Icon name="Star" size={16} color="#FFCA35" useMui={true} />
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '140%',
                  color: '#838C9D'
                }}
              >
                {journeyDetails.transporterRating || '3.9'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

JourneyStatusCards.propTypes = {
  journeyDetails: PropTypes.object.isRequired
};

export default JourneyStatusCards;
