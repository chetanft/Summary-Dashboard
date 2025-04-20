import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField, InputAdornment, Box } from '@mui/material';
import { Label } from '../typography';

/**
 * Enhanced TextField component with consistent styling and features.
 */
const TextField = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  type = 'text',
  placeholder,
  startAdornment,
  endAdornment,
  multiline = false,
  rows,
  maxRows,
  className,
  sx = {},
  inputSx = {},
  labelProps = {},
  ...props
}) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  // Base styles for the text field
  const baseStyles = {
    width: fullWidth ? '100%' : 'auto',
    ...sx,
  };

  // Input styles
  const inputStyles = {
    ...inputSx,
  };

  return (
    <Box sx={baseStyles} className={className}>
      {label && (
        <Label
          htmlFor={inputId}
          required={required}
          sx={{ mb: 1 }}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <MuiTextField
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(error)}
        helperText={helperText}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        type={type}
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ),
          sx: inputStyles,
        }}
        {...props}
      />
    </Box>
  );
};

TextField.propTypes = {
  /** The id of the input element */
  id: PropTypes.string,
  /** The name of the input element */
  name: PropTypes.string,
  /** The label for the input */
  label: PropTypes.node,
  /** The value of the input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Callback fired when the value changes */
  onChange: PropTypes.func,
  /** Callback fired when the input loses focus */
  onBlur: PropTypes.func,
  /** Whether the input has an error */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Helper text to display below the input */
  helperText: PropTypes.node,
  /** Whether the input is required */
  required: PropTypes.bool,
  /** Whether the input is disabled */
  disabled: PropTypes.bool,
  /** Whether the input should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** The variant of the input */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** The size of the input */
  size: PropTypes.oneOf(['small', 'medium']),
  /** The type of the input */
  type: PropTypes.string,
  /** Placeholder text for the input */
  placeholder: PropTypes.string,
  /** Element to display at the start of the input */
  startAdornment: PropTypes.node,
  /** Element to display at the end of the input */
  endAdornment: PropTypes.node,
  /** Whether the input is multiline */
  multiline: PropTypes.bool,
  /** Number of rows for multiline input */
  rows: PropTypes.number,
  /** Maximum number of rows for multiline input */
  maxRows: PropTypes.number,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles for the container */
  sx: PropTypes.object,
  /** Custom styles for the input */
  inputSx: PropTypes.object,
  /** Props for the label component */
  labelProps: PropTypes.object,
};

export default TextField;
