import React from 'react';
import PropTypes from 'prop-types';
import Typography from './Typography';

/**
 * Label component for form labels and other labeling needs.
 */
const Label = ({
  required = false,
  htmlFor,
  color,
  children,
  ...props
}) => {
  return (
    <Typography
      variant="label"
      component="label"
      color={color}
      htmlFor={htmlFor}
      sx={{
        display: 'block',
        marginBottom: '0.5rem',
        ...(props.sx || {}),
      }}
      {...props}
    >
      {children}
      {required && (
        <Typography
          component="span"
          color="error"
          sx={{ marginLeft: '0.25rem' }}
        >
          *
        </Typography>
      )}
    </Typography>
  );
};

Label.propTypes = {
  /** If true, displays a required asterisk */
  required: PropTypes.bool,
  /** The ID of the form element the label is bound to */
  htmlFor: PropTypes.string,
  /** The color of the label */
  color: PropTypes.string,
  /** The content of the component */
  children: PropTypes.node,
  /** Additional styles */
  sx: PropTypes.object,
};

export default Label;
