import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Label } from '../typography';

/**
 * Enhanced DatePicker component with consistent styling and features.
 */
const DatePicker = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  size = 'medium',
  minDate,
  maxDate,
  format = 'MM/dd/yyyy',
  className,
  sx = {},
  inputSx = {},
  labelProps = {},
  ...props
}) => {
  // Generate a unique ID if not provided
  const pickerId = id || `date-picker-${name || Math.random().toString(36).substr(2, 9)}`;

  // Base styles for the date picker
  const baseStyles = {
    width: fullWidth ? '100%' : 'auto',
    ...sx,
  };

  // Input styles
  const inputStyles = {
    ...inputSx,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={baseStyles} className={className}>
        {label && (
          <Label
            htmlFor={pickerId}
            required={required}
            sx={{ mb: 1 }}
            {...labelProps}
          >
            {label}
          </Label>
        )}
        <MuiDatePicker
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              id: pickerId,
              name,
              error: Boolean(error),
              helperText,
              required,
              disabled,
              fullWidth,
              variant,
              size,
              sx: inputStyles,
            },
          }}
          minDate={minDate}
          maxDate={maxDate}
          format={format}
          disabled={disabled}
          {...props}
        />
      </Box>
    </LocalizationProvider>
  );
};

DatePicker.propTypes = {
  /** The id of the input element */
  id: PropTypes.string,
  /** The name of the input element */
  name: PropTypes.string,
  /** The label for the date picker */
  label: PropTypes.node,
  /** The value of the date picker */
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]),
  /** Callback fired when the value changes */
  onChange: PropTypes.func,
  /** Whether the date picker has an error */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Helper text to display below the date picker */
  helperText: PropTypes.node,
  /** Whether the date picker is required */
  required: PropTypes.bool,
  /** Whether the date picker is disabled */
  disabled: PropTypes.bool,
  /** Whether the date picker should take up the full width of its container */
  fullWidth: PropTypes.bool,
  /** The variant of the input */
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  /** The size of the input */
  size: PropTypes.oneOf(['small', 'medium']),
  /** The minimum selectable date */
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]),
  /** The maximum selectable date */
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.number]),
  /** The format of the date */
  format: PropTypes.string,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles for the container */
  sx: PropTypes.object,
  /** Custom styles for the input */
  inputSx: PropTypes.object,
  /** Props for the label component */
  labelProps: PropTypes.object,
};

export default DatePicker;
