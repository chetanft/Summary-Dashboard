import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../typography';

/**
 * Enhanced Modal component for displaying dialogs.
 */
const Modal = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen = false,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  hideCloseButton = false,
  className,
  sx = {},
  titleSx = {},
  contentSx = {},
  actionsSx = {},
  ...props
}) => {
  // Handle backdrop click
  const handleBackdropClick = (event) => {
    if (disableBackdropClick) {
      event.stopPropagation();
      return;
    }
    
    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  // Base styles
  const baseStyles = {
    ...sx,
  };

  // Title styles
  const titleStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    ...titleSx,
  };

  // Content styles
  const contentStyles = {
    padding: '16px 24px',
    ...contentSx,
  };

  // Actions styles
  const actionsStyles = {
    padding: '16px 24px',
    ...actionsSx,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      onBackdropClick={handleBackdropClick}
      disableEscapeKeyDown={disableEscapeKeyDown}
      className={className}
      sx={baseStyles}
      {...props}
    >
      {title && (
        <DialogTitle sx={titleStyles} disableTypography>
          <Title level={5} sx={{ margin: 0 }}>
            {title}
          </Title>
          {!hideCloseButton && onClose && (
            <IconButton
              aria-label="close"
              onClick={(e) => onClose(e, 'closeButton')}
              size="small"
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent sx={contentStyles} dividers={Boolean(title)}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={actionsStyles}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

Modal.propTypes = {
  /** Whether the modal is open */
  open: PropTypes.bool.isRequired,
  /** Callback fired when the modal is closed */
  onClose: PropTypes.func,
  /** The title of the modal */
  title: PropTypes.node,
  /** The content of the modal */
  children: PropTypes.node,
  /** Actions to display in the modal footer */
  actions: PropTypes.node,
  /** The maximum width of the modal */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  /** Whether the modal should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** Whether the modal should take up the full screen */
  fullScreen: PropTypes.bool,
  /** Whether clicking the backdrop should close the modal */
  disableBackdropClick: PropTypes.bool,
  /** Whether pressing the Escape key should close the modal */
  disableEscapeKeyDown: PropTypes.bool,
  /** Whether to hide the close button */
  hideCloseButton: PropTypes.bool,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles for the modal */
  sx: PropTypes.object,
  /** Custom styles for the title */
  titleSx: PropTypes.object,
  /** Custom styles for the content */
  contentSx: PropTypes.object,
  /** Custom styles for the actions */
  actionsSx: PropTypes.object,
};

export default Modal;
