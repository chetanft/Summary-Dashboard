import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  CircularProgress,
  Alert,
  Divider,
  Grid
} from '@mui/material';

/**
 * Figma Design Viewer Component
 * Allows users to view Figma designs by embedding them in an iframe
 */
const FigmaDesignViewer = () => {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [figmaFileKey, setFigmaFileKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract file key from Figma URL
  const handleUrlChange = (url) => {
    setFigmaUrl(url);
    
    // Extract file key from URL
    try {
      const fileKeyMatch = url.match(/file\/([a-zA-Z0-9]+)/);
      if (fileKeyMatch && fileKeyMatch[1]) {
        setFigmaFileKey(fileKeyMatch[1]);
      } else {
        setFigmaFileKey('');
      }
    } catch (err) {
      setFigmaFileKey('');
    }
  };

  // Load Figma design
  const handleLoadDesign = () => {
    if (!figmaFileKey) {
      setError('Invalid Figma URL. Please enter a valid Figma file URL.');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#434F64' }}>
        Figma Design Viewer
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
          Figma File URL
        </Typography>
        <TextField
          fullWidth
          placeholder="https://www.figma.com/file/..."
          value={figmaUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadDesign}
          disabled={loading || !figmaFileKey}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          Load Design
        </Button>
      </Box>
      
      {figmaFileKey && !loading && (
        <Box sx={{ width: '100%', height: 600, border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
          <iframe
            title="Figma Design"
            width="100%"
            height="100%"
            src={`https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/file/${figmaFileKey}`}
            allowFullScreen
          />
        </Box>
      )}
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      )}
    </Paper>
  );
};

export default FigmaDesignViewer;
