import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';

// Import Figma service and token utilities
import figmaService from '../../services/figmaService';
import {
  processColorTokens,
  processTypographyTokens,
  processSpacingTokens,
  processShapeTokens,
} from '../../utils/figmaTokensUtils';

// Import default theme as fallback
import defaultTheme from '../../theme/themeConfig';

/**
 * FigmaThemeProvider component
 * 
 * This component fetches design tokens from Figma and creates a theme
 * that is provided to the application.
 */
const FigmaThemeProvider = ({ children, fileId, fallbackToDefault = true }) => {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFigmaTokens = async () => {
      try {
        setLoading(true);
        
        // Fetch design tokens from Figma
        const tokensResponse = await figmaService.getDesignTokens(fileId);
        
        // Extract color tokens
        const colorTokens = figmaService.extractColorTokens(tokensResponse);
        
        // Process tokens
        const processedColors = processColorTokens(colorTokens);
        const processedTypography = processTypographyTokens(tokensResponse.typography || {});
        const processedSpacing = processSpacingTokens(tokensResponse.spacing || {});
        const processedShape = processShapeTokens(tokensResponse.shape || {});
        
        // Create theme
        const figmaTheme = createTheme({
          palette: processedColors,
          typography: processedTypography,
          spacing: processedSpacing,
          shape: processedShape,
          // Preserve component overrides from default theme
          components: defaultTheme.components,
        });
        
        setTheme(figmaTheme);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Figma tokens:', err);
        setError(err);
        
        // Fall back to default theme if enabled
        if (fallbackToDefault) {
          console.log('Falling back to default theme');
          setTheme(defaultTheme);
        }
        
        setLoading(false);
      }
    };

    if (fileId) {
      fetchFigmaTokens();
    } else {
      // If no fileId is provided, use default theme
      setTheme(defaultTheme);
      setLoading(false);
    }
  }, [fileId, fallbackToDefault]);

  // Show loading indicator while fetching tokens
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if there was an error and no fallback
  if (error && !theme) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: 'error.main',
        }}
      >
        Error loading theme from Figma. Please check your configuration.
      </Box>
    );
  }

  // Render children with theme
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

FigmaThemeProvider.propTypes = {
  /**
   * Children to render with the theme
   */
  children: PropTypes.node.isRequired,
  
  /**
   * Figma file ID to fetch design tokens from
   */
  fileId: PropTypes.string,
  
  /**
   * Whether to fall back to the default theme if there's an error
   */
  fallbackToDefault: PropTypes.bool,
};

export default FigmaThemeProvider;
