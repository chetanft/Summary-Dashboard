import React from 'react';
import PropTypes from 'prop-types';
import { Typography as MuiTypography } from '@mui/material';

/**
 * Typography component that provides consistent text styling throughout the application.
 * Wraps MUI Typography with our custom styling and variants.
 */
const Typography = ({
  variant = 'body1',
  component,
  color,
  align = 'inherit',
  noWrap = false,
  gutterBottom = false,
  children,
  className,
  sx = {},
  ...props
}) => {
  // Map our custom variants to MUI variants if needed
  const variantMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    button: 'span',
    overline: 'span',
    label: 'span',
    ...props.variantMapping
  };

  // Default component based on variant if not specified
  const defaultComponent = component || variantMapping[variant] || 'span';

  // Base styles for our typography
  const baseStyles = {
    fontFamily: 'Inter, sans-serif',
    ...(variant === 'h1' && {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    }),
    ...(variant === 'h2' && {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    }),
    ...(variant === 'h3' && {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    }),
    ...(variant === 'h4' && {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    }),
    ...(variant === 'h5' && {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    }),
    ...(variant === 'h6' && {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    }),
    ...(variant === 'subtitle1' && {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    }),
    ...(variant === 'subtitle2' && {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    }),
    ...(variant === 'body1' && {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    }),
    ...(variant === 'body2' && {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    }),
    ...(variant === 'caption' && {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    }),
    ...(variant === 'button' && {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    }),
    ...(variant === 'overline' && {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    }),
    ...(variant === 'label' && {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    }),
    // Apply custom styles passed via sx prop
    ...sx,
  };

  return (
    <MuiTypography
      variant={variant}
      component={defaultComponent}
      color={color}
      align={align}
      noWrap={noWrap}
      gutterBottom={gutterBottom}
      className={className}
      sx={baseStyles}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

Typography.propTypes = {
  /** The variant to use */
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'caption', 'button', 'overline', 'label'
  ]),
  /** The component used for the root node */
  component: PropTypes.elementType,
  /** The color of the component */
  color: PropTypes.string,
  /** The alignment of the text */
  align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
  /** If true, the text will not wrap, but instead will truncate with an ellipsis */
  noWrap: PropTypes.bool,
  /** If true, the text will have a bottom margin */
  gutterBottom: PropTypes.bool,
  /** The content of the component */
  children: PropTypes.node,
  /** Override or extend the styles applied to the component */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
  /** Mapping of variants to components */
  variantMapping: PropTypes.object,
};

export default Typography;
