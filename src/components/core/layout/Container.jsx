import React from 'react';
import PropTypes from 'prop-types';
import { Container as MuiContainer } from '@mui/material';

/**
 * Container component for constraining content width and adding padding.
 */
const Container = ({
  maxWidth = 'lg',
  fixed = false,
  disableGutters = false,
  children,
  className,
  sx = {},
  ...props
}) => {
  // Base styles for the container
  const baseStyles = {
    ...sx,
  };

  return (
    <MuiContainer
      maxWidth={maxWidth}
      fixed={fixed}
      disableGutters={disableGutters}
      className={className}
      sx={baseStyles}
      {...props}
    >
      {children}
    </MuiContainer>
  );
};

Container.propTypes = {
  /** The maximum width of the container */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  /** If true, the container width is fixed */
  fixed: PropTypes.bool,
  /** If true, the left and right padding is removed */
  disableGutters: PropTypes.bool,
  /** The content of the container */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Container;
