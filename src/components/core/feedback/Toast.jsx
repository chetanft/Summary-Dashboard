import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

/**
 * Toast component for displaying temporary notifications.
 */
const Toast = ({
  open,
  onClose,
  message,
  title,
  severity = 'info',
  autoHideDuration = 6000,
  horizontal = 'right',
  vertical = 'bottom',
  className,
  sx = {},
  ...props
}) => {
  // Handle close event
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      className={className}
      {...props}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          ...sx,
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

Toast.propTypes = {
  /** Whether the toast is open */
  open: PropTypes.bool.isRequired,
  /** Callback fired when the toast is closed */
  onClose: PropTypes.func,
  /** The message to display in the toast */
  message: PropTypes.node.isRequired,
  /** The title of the toast */
  title: PropTypes.node,
  /** The severity of the toast */
  severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  /** The duration in milliseconds before the toast auto-hides */
  autoHideDuration: PropTypes.number,
  /** Horizontal position of the toast */
  horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  /** Vertical position of the toast */
  vertical: PropTypes.oneOf(['top', 'bottom']),
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Toast;
