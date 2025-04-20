import React from 'react';
import PropTypes from 'prop-types';
import Typography from './Typography';

/**
 * Subtitle component for secondary headings.
 * Provides a simpler API for subtitle elements.
 */
const Subtitle = ({
  size = 1,
  color,
  gutterBottom = true,
  children,
  ...props
}) => {
  // Map size to typography variant
  const variant = `subtitle${size}`;

  return (
    <Typography
      variant={variant}
      color={color}
      gutterBottom={gutterBottom}
      {...props}
    >
      {children}
    </Typography>
  );
};

Subtitle.propTypes = {
  /** The size of the subtitle (1 or 2) */
  size: PropTypes.oneOf([1, 2]),
  /** The color of the subtitle */
  color: PropTypes.string,
  /** If true, the text will have a bottom margin */
  gutterBottom: PropTypes.bool,
  /** The content of the component */
  children: PropTypes.node,
};

export default Subtitle;
