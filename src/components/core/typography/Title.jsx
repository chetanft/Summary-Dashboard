import React from 'react';
import PropTypes from 'prop-types';
import Typography from './Typography';

/**
 * Title component for section headings.
 * Provides a simpler API for heading elements.
 */
const Title = ({
  level = 1,
  color,
  align = 'inherit',
  gutterBottom = true,
  children,
  ...props
}) => {
  // Map level to typography variant
  const variant = `h${level}`;

  return (
    <Typography
      variant={variant}
      component={`h${level}`}
      color={color}
      align={align}
      gutterBottom={gutterBottom}
      {...props}
    >
      {children}
    </Typography>
  );
};

Title.propTypes = {
  /** The heading level (1-6) */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /** The color of the title */
  color: PropTypes.string,
  /** The alignment of the text */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /** If true, the text will have a bottom margin */
  gutterBottom: PropTypes.bool,
  /** The content of the component */
  children: PropTypes.node,
};

export default Title;
