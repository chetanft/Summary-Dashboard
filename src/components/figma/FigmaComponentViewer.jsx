import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Import Figma service
import figmaService from '../../services/figmaService';

/**
 * FigmaComponentViewer component
 * 
 * This component displays components from a Figma file.
 */
const FigmaComponentViewer = ({ fileId }) => {
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true);
        
        // Fetch components from Figma
        const componentsResponse = await figmaService.getComponents(fileId);
        
        if (componentsResponse && componentsResponse.meta && componentsResponse.meta.components) {
          const componentsList = Object.values(componentsResponse.meta.components);
          setComponents(componentsList);
          setFilteredComponents(componentsList);
          
          // Fetch images for components
          const nodeIds = componentsList.map(component => component.node_id);
          const imagesResponse = await figmaService.getImages(fileId, nodeIds);
          
          if (imagesResponse && imagesResponse.images) {
            setImageUrls(imagesResponse.images);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Figma components:', err);
        setError(err);
        setLoading(false);
      }
    };

    if (fileId) {
      fetchComponents();
    }
  }, [fileId]);

  // Filter components based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredComponents(components);
    } else {
      const filtered = components.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredComponents(filtered);
    }
  }, [searchTerm, components]);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Show loading indicator
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error message
  if (error) {
    return (
      <Box sx={{ p: 4, color: 'error.main' }}>
        <Typography variant="h6">Error loading components from Figma</Typography>
        <Typography variant="body2">{error.message}</Typography>
      </Box>
    );
  }

  // Show empty state
  if (components.length === 0) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No components found</Typography>
        <Typography variant="body2">
          No components were found in the specified Figma file.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Figma Components
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Viewing components from Figma file: {fileId}
      </Typography>
      
      {/* Search input */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search components..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      {/* Components grid */}
      <Grid container spacing={3}>
        {filteredComponents.map((component) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={component.node_id}>
            <Card sx={{ height: '100%' }}>
              {imageUrls[component.node_id] && (
                <CardMedia
                  component="img"
                  height="140"
                  image={imageUrls[component.node_id]}
                  alt={component.name}
                  sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {component.name}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  Component ID: {component.key}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* No results message */}
      {filteredComponents.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">No matching components</Typography>
          <Typography variant="body2">
            No components match your search term: "{searchTerm}"
          </Typography>
        </Box>
      )}
    </Box>
  );
};

FigmaComponentViewer.propTypes = {
  /**
   * Figma file ID to fetch components from
   */
  fileId: PropTypes.string.isRequired,
};

export default FigmaComponentViewer;
