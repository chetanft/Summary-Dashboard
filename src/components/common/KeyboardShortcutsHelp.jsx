import React from 'react';
import PropTypes from 'prop-types';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Box, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material';
import Icon from './Icon';

/**
 * Keyboard Shortcuts Help component
 * Displays a dialog with keyboard shortcuts
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onClose - Function to close the dialog
 * @param {Object} props.shortcuts - Object with shortcut categories and their shortcuts
 * @param {boolean} props.enabled - Whether shortcuts are enabled
 * @param {Function} props.onToggleEnabled - Function to toggle shortcuts enabled/disabled
 * @returns {JSX.Element}
 */
const KeyboardShortcutsHelp = ({ open, onClose, shortcuts, enabled, onToggleEnabled }) => {
  // Format key combination for display
  const formatKey = (key) => {
    return key
      .split('+')
      .map(k => {
        if (k === 'ctrl') return '⌘/Ctrl';
        if (k === 'shift') return '⇧';
        if (k === 'alt') return 'Alt';
        if (k === 'escape') return 'Esc';
        if (k === 'arrowup') return '↑';
        if (k === 'arrowdown') return '↓';
        if (k === 'arrowleft') return '←';
        if (k === 'arrowright') return '→';
        return k.charAt(0).toUpperCase() + k.slice(1);
      })
      .join(' + ');
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="keyboard-shortcuts-title"
    >
      <DialogTitle id="keyboard-shortcuts-title" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Keyboard Shortcuts
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'text.secondary' }}
        >
          <Icon name="X" size={20} />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={enabled}
                onChange={(e) => onToggleEnabled(e.target.checked)}
                color="primary"
              />
            }
            label="Enable keyboard shortcuts"
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {Object.entries(shortcuts).map(([category, categoryShortcuts], index) => (
          <React.Fragment key={category}>
            <Typography variant="h6" gutterBottom>
              {category}
            </Typography>
            
            <List dense disablePadding>
              {Object.entries(categoryShortcuts).map(([key, { description }]) => (
                <ListItem key={key} disableGutters sx={{ py: 0.5 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: 1,
                      py: 0.5,
                      mr: 2,
                      minWidth: '80px',
                      borderRadius: '4px',
                      backgroundColor: 'background.light',
                      border: '1px solid',
                      borderColor: 'divider',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {formatKey(key)}
                  </Box>
                  
                  <ListItemText primary={description} />
                </ListItem>
              ))}
            </List>
            
            {index < Object.keys(shortcuts).length - 1 && (
              <Divider sx={{ my: 2 }} />
            )}
          </React.Fragment>
        ))}
        
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            Press <strong>?</strong> anywhere to show this dialog
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

KeyboardShortcutsHelp.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shortcuts: PropTypes.object.isRequired,
  enabled: PropTypes.bool.isRequired,
  onToggleEnabled: PropTypes.func.isRequired
};

export default KeyboardShortcutsHelp;
