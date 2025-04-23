import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import Icon from '../../../common/Icon';
import EditLoadModal from '../EditLoadModal';
import { updateJourneyLoad } from '../../../../services/journeyService';

/**
 * Load ID Cell component
 * Displays a load ID with an edit button
 *
 * @param {Object} props - Component props
 * @param {string} props.loadId - Load ID
 * @param {boolean} props.isReturn - Whether this is a return load
 * @returns {JSX.Element}
 */
const LoadIDCell = ({ loadId, isReturn = false, stopId, journeyId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLoadId, setCurrentLoadId] = useState(loadId);
  const [currentIsReturn, setCurrentIsReturn] = useState(isReturn);
  const [isUpdating, setIsUpdating] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleEditLoad = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveLoad = async (newLoadData) => {
    // Set updating state
    setIsUpdating(true);

    // Optimistically update UI
    const previousLoadId = currentLoadId;
    const previousIsReturn = currentIsReturn;
    setCurrentLoadId(newLoadData.id);
    setCurrentIsReturn(newLoadData.isReturn);

    try {
      // Perform actual API update
      await updateJourneyLoad(journeyId, stopId, newLoadData);

      // Show success message
      setSnackbar({
        open: true,
        message: 'Load information updated successfully',
        severity: 'success'
      });
    } catch (error) {
      // Revert optimistic update on error
      setCurrentLoadId(previousLoadId);
      setCurrentIsReturn(previousIsReturn);

      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to update load information',
        severity: 'error'
      });

      // Re-throw error to be handled by the modal
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography
          variant="body2"
          sx={{ mb: 0.5 }}
        >
          {currentIsReturn && (
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontStyle: 'italic',
                color: 'text.secondary',
                mr: 0.5
              }}
            >
              Return:
            </Typography>
          )}
          {currentLoadId}
        </Typography>

        <Button
          variant="text"
          size="small"
          startIcon={<Icon name="Edit" size={14} />}
          onClick={handleEditLoad}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleEditLoad();
            }
          }}
          disabled={isUpdating}
          aria-label={`Edit load ${currentLoadId}`}
          tabIndex={0}
          sx={{
            color: 'primary.main',
            p: 0,
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            },
            '&:focus-visible': {
              backgroundColor: 'action.hover',
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '2px'
            }
          }}
        >
          Edit Load
        </Button>
      </Box>

      <EditLoadModal
        open={isModalOpen}
        onClose={handleCloseModal}
        loadId={currentLoadId}
        isReturn={currentIsReturn}
        onSave={handleSaveLoad}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

LoadIDCell.propTypes = {
  loadId: PropTypes.string.isRequired,
  isReturn: PropTypes.bool,
  stopId: PropTypes.string,
  journeyId: PropTypes.string
};

// Default props
LoadIDCell.defaultProps = {
  isReturn: false,
  stopId: 'unknown',
  journeyId: 'unknown'
};

export default LoadIDCell;
