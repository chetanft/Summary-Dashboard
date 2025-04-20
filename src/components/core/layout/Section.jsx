import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { Title } from '../typography';

/**
 * Section component for page sections with optional title.
 */
const Section = ({
  title,
  titleLevel = 2,
  spacing = 3,
  children,
  className,
  sx = {},
  ...props
}) => {
  // Base styles for the section
  const baseStyles = {
    marginBottom: `${spacing * 8}px`,
    width: '100%',
    ...sx,
  };

  return (
    <Box
      component="section"
      className={`section ${className || ''}`}
      sx={baseStyles}
      {...props}
    >
      {title && (
        <Title level={titleLevel} gutterBottom>
          {title}
        </Title>
      )}
      {children}
    </Box>
  );
};

Section.propTypes = {
  /** The title of the section */
  title: PropTypes.node,
  /** The heading level for the title */
  titleLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** Spacing at the bottom of the section */
  spacing: PropTypes.number,
  /** The content of the section */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Section;
