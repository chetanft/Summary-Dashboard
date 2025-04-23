import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Paper, Collapse } from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Journey Details Error Handler component
 * Displays error messages with retry and fallback options
 * 
 * @param {Object} props - Component props
 * @param {string} props.error - Error message
 * @param {Function} props.onRetry - Function to retry the operation
 * @param {boolean} props.showDetails - Whether to show error details
 * @param {Object} props.errorDetails - Error details object
 * @returns {JSX.Element}
 */
const JourneyDetailsErrorHandler = ({ error, onRetry, showDetails = false, errorDetails = null }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'error.light',
        bgcolor: 'error.lighter',
        my: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Icon name="AlertTriangle" size={24} sx={{ color: 'error.main', mr: 2, mt: 0.5 }} />
        
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6" color="error.main" gutterBottom>
            Error Loading Journey Details
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {error || 'An error occurred while loading the journey details. Please try again or contact support if the problem persists.'}
          </Typography>
          
          {showDetails && errorDetails && (
            <>
              <Button
                variant="text"
                color="inherit"
                onClick={toggleExpanded}
                endIcon={<Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={16} />}
                sx={{ mb: 1 }}
              >
                {expanded ? 'Hide Details' : 'Show Details'}
              </Button>
              
              <Collapse in={expanded}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: 2,
                    overflow: 'auto',
                    maxHeight: '200px'
                  }}
                >
                  <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {errorDetails.toString()}
                  </Typography>
                </Box>
              </Collapse>
            </>
          )}
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onRetry}
              startIcon={<Icon name="RefreshCw" size={16} />}
            >
              Retry
            </Button>
            
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => window.history.back()}
              startIcon={<Icon name="ArrowLeft" size={16} />}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

JourneyDetailsErrorHandler.propTypes = {
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
  showDetails: PropTypes.bool,
  errorDetails: PropTypes.object
};

export default JourneyDetailsErrorHandler;
