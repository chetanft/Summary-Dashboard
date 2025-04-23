import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Icon from '../../common/Icon';
import { addJourneyDocument, deleteJourneyDocument } from '../../../services/journeyService';

/**
 * Document Upload component
 * Allows uploading and managing documents for a journey
 *
 * @param {Object} props - Component props
 * @param {string} props.journeyId - Journey ID
 * @param {Array} props.documents - Array of document objects
 * @param {Function} props.onDocumentsChange - Function to handle documents change
 * @returns {JSX.Element}
 */
const DocumentUpload = ({ journeyId, documents = [], onDocumentsChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Document type options
  const documentTypes = [
    { value: 'INVOICE', label: 'Invoice' },
    { value: 'BOL', label: 'Bill of Lading' },
    { value: 'POD', label: 'Proof of Delivery' },
    { value: 'CUSTOMS', label: 'Customs Document' },
    { value: 'INSURANCE', label: 'Insurance Document' },
    { value: 'INSPECTION', label: 'Inspection Report' },
    { value: 'OTHER', label: 'Other' }
  ];

  // Get document type label
  const getDocumentTypeLabel = (typeValue) => {
    const type = documentTypes.find(option => option.value === typeValue);
    return type ? type.label : typeValue;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on file type
  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();

    const iconMap = {
      'pdf': 'FileText',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'FileSpreadsheet',
      'xlsx': 'FileSpreadsheet',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      'gif': 'Image'
    };

    return iconMap[extension] || 'File';
  };

  // Handle dialog open
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setDocumentName('');
    setDocumentType('');
    setSelectedFile(null);
    setError('');
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!documentName) {
        // Use file name as document name if not provided
        setDocumentName(file.name.split('.')[0]);
      }
    }
  };

  // Handle document name change
  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  // Handle document type change
  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  // Handle file browse click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Handle submit
  const handleSubmit = async () => {
    if (!documentName) {
      setError('Please enter a document name');
      return;
    }

    if (!documentType) {
      setError('Please select a document type');
      return;
    }

    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // In a real app, this would upload the file to a server
      // For now, we'll simulate the upload
      const newDocument = {
        id: `doc-${Date.now()}`,
        name: documentName,
        type: documentType,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(selectedFile) // In a real app, this would be a server URL
      };

      await addJourneyDocument(journeyId, newDocument);

      // Call the onDocumentsChange callback with the new document
      onDocumentsChange([...documents, newDocument]);

      // Close the dialog
      handleCloseDialog();
    } catch (err) {
      setError('Failed to upload document. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle document delete
  const handleDeleteDocument = async (documentId) => {
    try {
      await deleteJourneyDocument(journeyId, documentId);

      // Call the onDocumentsChange callback with the updated documents
      const updatedDocuments = documents.filter(doc => doc.id !== documentId);
      onDocumentsChange(updatedDocuments);
    } catch (err) {
      console.error('Failed to delete document:', err);
      // Show error message
    }
  };

  // Handle document view
  const handleViewDocument = (document) => {
    // In a real app, this would open the document in a new tab or viewer
    window.open(document.url, '_blank');
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        mb: 3
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'background.light'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Documents
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon name="Upload" size={16} />}
          onClick={handleOpenDialog}
        >
          Upload Document
        </Button>
      </Box>

      <Divider />

      <List sx={{ p: 0 }}>
        {documents.length === 0 ? (
          <ListItem>
            <ListItemText
              primary="No documents uploaded"
              secondary="Upload documents related to this journey"
              primaryTypographyProps={{ color: 'text.secondary' }}
            />
          </ListItem>
        ) : (
          documents.map((document, index) => (
            <React.Fragment key={document.id}>
              <ListItem
                sx={{
                  py: 2,
                  px: 3
                }}
                button
                onClick={() => handleViewDocument(document)}
              >
                <ListItemIcon>
                  <Icon name={getFileIcon(document.fileName)} size={24} />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                        {document.name}
                      </Typography>

                      <Chip
                        label={getDocumentTypeLabel(document.type)}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ height: '20px', fontSize: '0.75rem' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        {document.fileName}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        {formatFileSize(document.fileSize)}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Uploaded on {formatDate(document.uploadDate)}
                      </Typography>
                    </Box>
                  }
                />

                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDocument(document.id);
                    }}
                  >
                    <Icon name="Trash" size={20} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              {index < documents.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))
        )}
      </List>

      {/* Upload Document Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Upload Document
          <IconButton onClick={handleCloseDialog} aria-label="close">
            <Icon name="X" size={20} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mb: 2 }}
            >
              {error}
            </Typography>
          )}

          <TextField
            label="Document Name"
            value={documentName}
            onChange={handleDocumentNameChange}
            fullWidth
            margin="normal"
            disabled={isSubmitting}
          />

          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="document-type-label">Document Type</InputLabel>
            <Select
              labelId="document-type-label"
              id="document-type"
              value={documentType}
              label="Document Type"
              onChange={handleDocumentTypeChange}
              disabled={isSubmitting}
            >
              {documentTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: '4px',
              p: 3,
              textAlign: 'center',
              bgcolor: 'background.light',
              mb: 2
            }}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />

            {selectedFile ? (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Icon name={getFileIcon(selectedFile.name)} size={24} sx={{ mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {selectedFile.name}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary">
                  {formatFileSize(selectedFile.size)}
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleBrowseClick}
                  sx={{ mt: 2 }}
                  disabled={isSubmitting}
                >
                  Change File
                </Button>
              </Box>
            ) : (
              <Box>
                <Icon name="Upload" size={32} sx={{ color: 'text.secondary', mb: 1 }} />

                <Typography variant="body1" sx={{ mb: 1 }}>
                  Drag and drop a file here, or
                </Typography>

                <Button
                  variant="outlined"
                  onClick={handleBrowseClick}
                  disabled={isSubmitting}
                >
                  Browse Files
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            color="inherit"
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isSubmitting || !documentName || !documentType || !selectedFile}
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Document'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

DocumentUpload.propTypes = {
  journeyId: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      fileName: PropTypes.string.isRequired,
      fileSize: PropTypes.number.isRequired,
      uploadDate: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  onDocumentsChange: PropTypes.func.isRequired
};

export default DocumentUpload;
