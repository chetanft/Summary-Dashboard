import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import IconBundle from './IconBundle';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to error reporting service
    if (import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true') {
      // Here you would typically log to your error reporting service
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload the page or retry the failed operation
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: 3,
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <IconBundle
            name="Error"
            sx={{
              fontSize: 64,
              color: 'error.main',
              marginBottom: 2,
            }}
          />
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We're sorry for the inconvenience. Please try again or contact support if the problem persists.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleRetry}
            startIcon={<IconBundle name="Refresh" />}
            sx={{ marginTop: 2 }}
          >
            Try Again
          </Button>
          {import.meta.env.VITE_APP_ENVIRONMENT === 'development' && this.state.error && (
            <Box sx={{ marginTop: 4, textAlign: 'left', maxWidth: '800px' }}>
              <Typography variant="h6" gutterBottom>
                Error Details (Development Only):
              </Typography>
              <Box
                component="pre"
                sx={{
                  backgroundColor: '#f8f9fa',
                  padding: 2,
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: '200px',
                }}
              >
                {this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </Box>
            </Box>
          )}
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 