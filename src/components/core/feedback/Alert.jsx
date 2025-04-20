import React from 'react';
import PropTypes from 'prop-types';
import { Alert as MuiAlert, AlertTitle, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * Enhanced Alert component for displaying feedback messages.
 */
const Alert = ({
  severity = 'info',
  variant = 'standard',
  title,
  children,
  icon,
  action,
  onClose,
  className,
  sx = {},
  ...props
}) => {
  // Custom icons based on severity
  const severityIcons = {
    success: <CheckCircleIcon fontSize="inherit" />,
    info: <InfoIcon fontSize="inherit" />,
    warning: <WarningIcon fontSize="inherit" />,
    error: <ErrorIcon fontSize="inherit" />,
  };

  // Use custom icon or default based on severity
  const alertIcon = icon === false ? false : (icon || severityIcons[severity]);

  // Base styles for the alert
  const baseStyles = {
    width: '100%',
    ...sx,
  };

  return (
    <Box className={className}>
      <MuiAlert
        severity={severity}
        variant={variant}
        icon={alertIcon}
        action={action}
        onClose={onClose}
        sx={baseStyles}
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </Box>
  );
};

Alert.propTypes = {
  /** The severity of the alert */
  severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  /** The variant of the alert */
  variant: PropTypes.oneOf(['standard', 'filled', 'outlined']),
  /** The title of the alert */
  title: PropTypes.node,
  /** The content of the alert */
  children: PropTypes.node,
  /** Custom icon for the alert (pass false to hide icon) */
  icon: PropTypes.node,
  /** Action component for the alert */
  action: PropTypes.node,
  /** Callback fired when the alert is closed */
  onClose: PropTypes.func,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Alert;
