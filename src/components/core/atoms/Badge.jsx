import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

/**
 * Badge component for displaying status indicators with a consistent design
 * 
 * @component
 * @example
 * <Badge label="Critical" status="error" />
 * <Badge label="Warning" status="warning" />
 * <Badge label="Success" status="success" />
 */
const Badge = ({
  label,
  status = 'default',
  width = 'auto',
  ...props
}) => {
  // Define status color mapping
  const statusColors = {
    error: {
      background: '#FFEAEA',
      color: '#FF3533',
    },
    warning: {
      background: '#FFEBDC',
      color: '#FF6C19',
    },
    success: {
      background: '#DFFFEA',
      color: '#00C638',
    },
    info: {
      background: '#E6F7FF',
      color: '#1890FF',
    },
    default: {
      background: '#F1F3F5',
      color: '#434F64',
    },
  };

  // Get color based on status
  const colorSet = statusColors[status] || statusColors.default;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px 8px',
        gap: '8px',
        width: width,
        height: '24px',
        backgroundColor: colorSet.background,
        borderRadius: '4px',
        ...props.sx,
      }}
      {...props}
    >
      <Typography
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '140%',
          color: colorSet.color,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

Badge.propTypes = {
  /**
   * Text label to display
   */
  label: PropTypes.string.isRequired,
  
  /**
   * Status type that determines the color
   */
  status: PropTypes.oneOf(['error', 'warning', 'success', 'info', 'default']),
  
  /**
   * Width of the badge (default is 'auto')
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  /**
   * Additional styles to apply
   */
  sx: PropTypes.object,
};

export default Badge;
