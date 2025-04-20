import React from 'react';
import PropTypes from 'prop-types';
import Typography from './Typography';

/**
 * Text component for general text content.
 * Provides a simpler API for the most common text use cases.
 */
const Text = ({
  size = 'medium',
  weight = 'regular',
  color,
  children,
  ...props
}) => {
  // Map size to typography variant
  const variantMap = {
    small: 'body2',
    medium: 'body1',
    large: 'subtitle1',
  };

  // Map weight to font weight
  const weightMap = {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  };

  // Get the variant based on size
  const variant = variantMap[size] || 'body1';

  // Apply font weight via sx prop
  const sx = {
    fontWeight: weightMap[weight] || 400,
    ...(props.sx || {}),
  };

  return (
    <Typography
      variant={variant}
      color={color}
      sx={sx}
      {...props}
    >
      {children}
    </Typography>
  );
};

Text.propTypes = {
  /** The size of the text */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** The font weight of the text */
  weight: PropTypes.oneOf(['light', 'regular', 'medium', 'semibold', 'bold']),
  /** The color of the text */
  color: PropTypes.string,
  /** The content of the component */
  children: PropTypes.node,
  /** Additional props to pass to the Typography component */
  sx: PropTypes.object,
};

export default Text;
