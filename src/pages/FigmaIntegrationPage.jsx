import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import Layout from '../components/layout/Layout';
import FigmaMcpConfig from '../components/figma/FigmaMcpConfig';
import FigmaDesignViewer from '../components/figma/FigmaDesignViewer';

/**
 * Figma Integration Page
 * Provides a UI for configuring and using the Figma MCP server
 */
const FigmaIntegrationPage = () => {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#434F64' }}>
          Figma Integration
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            {/* Figma MCP Server Configuration */}
            <FigmaMcpConfig />
            
            {/* Figma Integration Info */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#434F64' }}>
                About Figma MCP Integration
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                The Figma Model Context Protocol (MCP) server allows AI assistants like Claude to access and understand your Figma designs. This enables more accurate implementation of designs and better collaboration between design and development.
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Features:</strong>
              </Typography>
              
              <ul>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Access Figma files and projects
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Extract design tokens and variables
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Analyze design systems
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Generate code from designs
                  </Typography>
                </li>
              </ul>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Note:</strong> You need a Figma API token to use this integration. Get your token from Figma.com &gt; Account Settings &gt; Access Tokens.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            {/* Figma Design Viewer */}
            <FigmaDesignViewer />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default FigmaIntegrationPage;
