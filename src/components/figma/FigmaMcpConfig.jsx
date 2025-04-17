import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Switch, 
  FormControlLabel,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { startFigmaMcpServer, stopFigmaMcpServer, isFigmaMcpServerRunning } from '../../services/figmaMcpService';

/**
 * Figma MCP Configuration Component
 * Allows users to configure and manage the Figma MCP server
 */
const FigmaMcpConfig = () => {
  const [figmaToken, setFigmaToken] = useState('');
  const [serverPort, setServerPort] = useState(3001);
  const [isServerRunning, setIsServerRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Check if server is running on component mount
  useEffect(() => {
    setIsServerRunning(isFigmaMcpServerRunning());
  }, []);

  // Handle starting the server
  const handleStartServer = async () => {
    if (!figmaToken) {
      setError('Please enter a Figma API token');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      await startFigmaMcpServer(figmaToken, serverPort);
      
      setIsServerRunning(true);
      setSuccess('Figma MCP server started successfully');
    } catch (err) {
      setError(`Failed to start Figma MCP server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle stopping the server
  const handleStopServer = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      await stopFigmaMcpServer();
      
      setIsServerRunning(false);
      setSuccess('Figma MCP server stopped successfully');
    } catch (err) {
      setError(`Failed to stop Figma MCP server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#434F64' }}>
        Figma MCP Server Configuration
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
          Figma API Token
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your Figma API token"
          value={figmaToken}
          onChange={(e) => setFigmaToken(e.target.value)}
          type="password"
          disabled={isServerRunning}
          helperText="Get your token from Figma.com > Account Settings > Access Tokens"
          sx={{ mb: 2 }}
        />
        
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
          Server Port
        </Typography>
        <TextField
          fullWidth
          placeholder="Server port"
          value={serverPort}
          onChange={(e) => setServerPort(parseInt(e.target.value) || 3001)}
          type="number"
          disabled={isServerRunning}
          sx={{ mb: 2 }}
        />
        
        <FormControlLabel
          control={
            <Switch
              checked={isServerRunning}
              onChange={() => isServerRunning ? handleStopServer() : handleStartServer()}
              disabled={loading}
            />
          }
          label={isServerRunning ? "Server Running" : "Server Stopped"}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        {isServerRunning ? (
          <Button
            variant="contained"
            color="error"
            onClick={handleStopServer}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            Stop Server
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartServer}
            disabled={loading || !figmaToken}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            Start Server
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default FigmaMcpConfig;
