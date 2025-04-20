import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select as MuiSelect,
  MenuItem,
  InputAdornment,
  Box,
} from '@mui/material';
import { Label } from '../typography';

/**
 * Enhanced Select component with consistent styling and features.
 */
const Select = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  placeholder,
  startAdornment,
  endAdornment,
  multiple = false,
  renderValue,
  className,
  sx = {},
  selectSx = {},
  labelProps = {},
  ...props
}) => {
  // Generate a unique ID if not provided
  const selectId = id || `select-${name || Math.random().toString(36).substr(2, 9)}`;

  // Base styles for the select
  const baseStyles = {
    width: fullWidth ? '100%' : 'auto',
    ...sx,
  };

  // Select styles
  const selectStyles = {
    ...selectSx,
  };

  return (
    <Box sx={baseStyles} className={className}>
      {label && (
        <Label
          htmlFor={selectId}
          required={required}
          sx={{ mb: 1 }}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <FormControl
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        error={Boolean(error)}
        disabled={disabled}
        required={required}
      >
        <MuiSelect
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          displayEmpty={Boolean(placeholder)}
          multiple={multiple}
          renderValue={renderValue}
          startAdornment={startAdornment && (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          )}
          endAdornment={endAdornment && (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          )}
          sx={selectStyles}
          {...props}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
        {helperText && (
          <Box
            component="p"
            sx={{
              margin: '3px 14px 0',
              fontSize: '0.75rem',
              color: error ? 'error.main' : 'text.secondary',
            }}
          >
            {helperText}
          </Box>
        )}
      </FormControl>
    </Box>
  );
};

Select.propTypes = {
  /** The id of the select element */
  id: PropTypes.string,
  /** The name of the select element */
  name: PropTypes.string,
  /** The label for the select */
  label: PropTypes.node,
  /** The value of the select */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  /** Callback fired when the value changes */
  onChange: PropTypes.func,
  /** Array of options for the select */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.node.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** Whether the select has an error */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Helper text to display below the select */
  helperText: PropTypes.node,
  /** Whether the select is required */
  required: PropTypes.bool,
  /** Whether the select is disabled */
  disabled: PropTypes.bool,
  /** Whether the select should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** The variant of the select */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** The size of the select */
  size: PropTypes.oneOf(['small', 'medium']),
  /** Placeholder text for the select */
  placeholder: PropTypes.string,
  /** Element to display at the start of the select */
  startAdornment: PropTypes.node,
  /** Element to display at the end of the select */
  endAdornment: PropTypes.node,
  /** Whether multiple values can be selected */
  multiple: PropTypes.bool,
  /** Function to customize the display of selected values */
  renderValue: PropTypes.func,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles for the container */
  sx: PropTypes.object,
  /** Custom styles for the select */
  selectSx: PropTypes.object,
  /** Props for the label component */
  labelProps: PropTypes.object,
};

export default Select;
