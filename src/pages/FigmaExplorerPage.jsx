import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import FigmaComponentViewer from '../components/figma/FigmaComponentViewer';

/**
 * FigmaExplorerPage component
 *
 * This page allows users to explore Figma designs by entering a file ID.
 */
const FigmaExplorerPage = () => {
  const [fileId, setFileId] = useState('');
  const [activeFileId, setActiveFileId] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);

  // Handle file ID input change
  const handleFileIdChange = (event) => {
    setFileId(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate file ID
    if (!fileId.trim()) {
      setError('Please enter a Figma file ID');
      return;
    }

    // Extract file ID from URL if needed
    let extractedFileId = fileId.trim();

    // Check if it's a Figma URL
    if (extractedFileId.includes('figma.com')) {
      try {
        // Handle different Figma URL formats
        if (extractedFileId.includes('/file/')) {
          // Standard file URL: https://www.figma.com/file/abcdef123456/FileName
          const url = new URL(extractedFileId);
          const pathParts = url.pathname.split('/');
          const fileIdIndex = pathParts.indexOf('file') + 1;

          if (fileIdIndex > 0 && fileIdIndex < pathParts.length) {
            extractedFileId = pathParts[fileIdIndex];
          } else {
            setError('Could not extract file ID from URL');
            return;
          }
        } else if (extractedFileId.includes('/design/')) {
          // Design URL: https://www.figma.com/design/abcdef123456/FileName
          const url = new URL(extractedFileId);
          const pathParts = url.pathname.split('/');
          const fileIdIndex = pathParts.indexOf('design') + 1;

          if (fileIdIndex > 0 && fileIdIndex < pathParts.length) {
            extractedFileId = pathParts[fileIdIndex];
          } else {
            setError('Could not extract file ID from URL');
            return;
          }
        } else {
          // Try to extract ID using regex
          const matches = extractedFileId.match(/[a-zA-Z0-9]{22,32}/);
          if (matches && matches.length > 0) {
            extractedFileId = matches[0];
          } else {
            setError('Could not extract file ID from URL');
            return;
          }
        }
      } catch (err) {
        console.error('Error parsing Figma URL:', err);
        setError('Invalid Figma URL');
        return;
      }
    }

    setActiveFileId(extractedFileId);
    setError(null);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Figma Design Explorer
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Enter a Figma file ID or URL to explore its design components and tokens.
      </Typography>

      {/* File ID input form */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <TextField
              label="Figma File ID or URL"
              variant="outlined"
              fullWidth
              value={fileId}
              onChange={handleFileIdChange}
              placeholder="e.g., FigmaFileID123 or https://www.figma.com/file/FigmaFileID123/DesignSystem"
              error={!!error}
              helperText={error}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ height: 56 }}
            >
              Explore
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Display content when a file ID is provided */}
      {activeFileId ? (
        <>
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Components" />
              <Tab label="Design Tokens" />
              <Tab label="Color Palette" />
            </Tabs>
          </Paper>

          {/* Components tab */}
          {activeTab === 0 && (
            <Paper sx={{ p: 0, overflow: 'hidden' }}>
              <FigmaComponentViewer fileId={activeFileId} />
            </Paper>
          )}

          {/* Design Tokens tab */}
          {activeTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Design Tokens
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                This feature is coming soon. It will display typography, spacing, and other design tokens.
              </Alert>
            </Paper>
          )}

          {/* Color Palette tab */}
          {activeTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Color Palette
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                This feature is coming soon. It will display the color palette from the Figma file.
              </Alert>
            </Paper>
          )}
        </>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Enter a Figma file ID to get started
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can find the file ID in the Figma URL: https://www.figma.com/file/[FILE_ID]/...
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default FigmaExplorerPage;
