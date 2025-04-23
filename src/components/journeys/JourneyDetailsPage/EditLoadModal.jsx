import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box,
  FormControlLabel,
  Switch,
  Typography,
  IconButton,
  CircularProgress
} from '@mui/material';
import Icon from '../../common/Icon';

/**
 * Edit Load Modal component
 * Modal for editing load information
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {string} props.loadId - Current load ID
 * @param {boolean} props.isReturn - Whether this is a return load
 * @param {Function} props.onSave - Function to save changes
 * @returns {JSX.Element}
 */
const EditLoadModal = ({ open, onClose, loadId, isReturn, onSave }) => {
  const [newLoadId, setNewLoadId] = useState(loadId);
  const [newIsReturn, setNewIsReturn] = useState(isReturn);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSave = async () => {
    if (!newLoadId.trim()) {
      setError('Load ID is required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await onSave({
        id: newLoadId,
        isReturn: newIsReturn
      });
      
      onClose();
    } catch (err) {
      setError('Failed to update load information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClose = () => {
    // Reset form state
    setNewLoadId(loadId);
    setNewIsReturn(isReturn);
    setError('');
    onClose();
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Edit Load Information
        <IconButton onClick={handleClose} aria-label="close">
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
        
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Load ID"
            value={newLoadId}
            onChange={(e) => setNewLoadId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!error && !newLoadId.trim()}
            helperText={error && !newLoadId.trim() ? 'Load ID is required' : ''}
            disabled={loading}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={newIsReturn}
                onChange={(e) => setNewIsReturn(e.target.checked)}
                disabled={loading}
              />
            }
            label="Return Load"
            sx={{ mt: 1 }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={handleClose} 
          color="inherit"
          disabled={loading}
        >
          Cancel
        </Button>
        
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={loading || !newLoadId.trim()}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditLoadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  loadId: PropTypes.string.isRequired,
  isReturn: PropTypes.bool,
  onSave: PropTypes.func.isRequired
};

export default EditLoadModal;
