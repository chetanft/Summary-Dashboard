import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import Icon from '../common/Icon';
import { formatDate, formatFileSize } from '../../utils/dateUtils';

// Document type icons
const documentTypeIcons = {
  'invoice': 'FileText',
  'pod': 'FileCheck',
  'driver': 'User',
  'vehicle': 'Truck',
  'load': 'Package',
  'event': 'Calendar',
  'other': 'File',
};

// Document type labels
const documentTypeLabels = {
  'invoice': 'Invoice',
  'pod': 'Proof of Delivery',
  'driver': 'Driver Document',
  'vehicle': 'Vehicle Document',
  'load': 'Load Document',
  'event': 'Event Document',
  'other': 'Other Document',
};

const JourneyDocuments = ({ journey }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [documentType, setDocumentType] = useState('other');
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setDocumentType('other');
    setSelectedFile(null);
    setDescription('');
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    // In a real application, this would call an API to upload the file
    // For this implementation, we'll just close the dialog
    handleCloseUploadDialog();
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Journey Documents</Typography>
        <Button
          variant="contained"
          startIcon={<Icon name="Upload" size={18} />}
          onClick={handleOpenUploadDialog}
        >
          Upload Document
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="documents table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Uploaded By</TableCell>
              <TableCell>Uploaded At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journey.documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box sx={{ py: 3 }}>
                    <Icon name="File" size={48} sx={{ color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No documents available
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload documents using the button above
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              journey.documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <Chip
                      icon={<Icon name={documentTypeIcons[document.type] || 'File'} size={14} />}
                      label={documentTypeLabels[document.type] || document.type}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{document.name}</TableCell>
                  <TableCell>{formatFileSize(document.size)}</TableCell>
                  <TableCell>{document.uploadedBy}</TableCell>
                  <TableCell>{formatDate(document.uploadedAt)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Icon name="Download" size={14} />}
                        component={Link}
                        href={document.url}
                        target="_blank"
                      >
                        Download
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Icon name="Eye" size={14} />}
                        component={Link}
                        href={document.url}
                        target="_blank"
                      >
                        View
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Document Type"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                {Object.entries(documentTypeLabels).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ height: 56, textTransform: 'none' }}
                startIcon={<Icon name="Upload" size={18} />}
              >
                {selectedFile ? selectedFile.name : 'Select File'}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
            startIcon={<Icon name="Upload" size={18} />}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

JourneyDocuments.propTypes = {
  journey: PropTypes.object.isRequired,
};

export default JourneyDocuments;
