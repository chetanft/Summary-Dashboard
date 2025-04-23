import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../../../theme/unifiedThemeConfig';
import LoadIDCell from '../LoadIDCell';
import { updateJourneyLoad } from '../../../../../services/journeyService';

// Mock the journeyService
jest.mock('../../../../../services/journeyService', () => ({
  updateJourneyLoad: jest.fn()
}));

// Mock the Icon component
jest.mock('../../../../common/Icon', () => {
  return function MockIcon({ name }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  };
});

// Mock the EditLoadModal component
jest.mock('../../EditLoadModal', () => {
  return function MockEditLoadModal({ open, onClose, loadId, isReturn, onSave }) {
    const handleSave = async () => {
      try {
        await onSave({ id: 'NEW-LOAD-ID', isReturn: true });
      } catch (error) {
        // Catch the error to prevent it from bubbling up in tests
        console.error('Error in MockEditLoadModal:', error);
      }
    };

    return open ? (
      <div data-testid="edit-load-modal">
        <div>Edit Load Modal</div>
        <div>Load ID: {loadId}</div>
        <div>Is Return: {isReturn ? 'Yes' : 'No'}</div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null;
  };
});

describe('LoadIDCell', () => {
  const mockProps = {
    loadId: 'TEST-LOAD-001',
    isReturn: false,
    stopId: 'stop-1',
    journeyId: 'journey-1'
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock the updateJourneyLoad function
    updateJourneyLoad.mockResolvedValue({});
  });

  it('renders load ID correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <LoadIDCell {...mockProps} />
      </ThemeProvider>
    );

    // Check if the load ID is displayed
    expect(screen.getByText('TEST-LOAD-001')).toBeInTheDocument();

    // Check if the edit button is displayed
    expect(screen.getByText('Edit Load')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Edit')).toBeInTheDocument();
  });

  it('renders return load correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <LoadIDCell {...mockProps} isReturn={true} />
      </ThemeProvider>
    );

    // Check if the return label is displayed
    expect(screen.getByText('Return:')).toBeInTheDocument();

    // Check if the load ID is displayed
    expect(screen.getByText('TEST-LOAD-001')).toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <LoadIDCell {...mockProps} />
      </ThemeProvider>
    );

    // Click the edit button
    fireEvent.click(screen.getByText('Edit Load'));

    // Check if the edit modal is displayed
    expect(screen.getByTestId('edit-load-modal')).toBeInTheDocument();
    expect(screen.getByText('Load ID: TEST-LOAD-001')).toBeInTheDocument();
    expect(screen.getByText('Is Return: No')).toBeInTheDocument();
  });

  it('updates load ID when save button is clicked', async () => {
    render(
      <ThemeProvider theme={theme}>
        <LoadIDCell {...mockProps} />
      </ThemeProvider>
    );

    // Click the edit button
    fireEvent.click(screen.getByText('Edit Load'));

    // Click the save button
    fireEvent.click(screen.getByText('Save'));

    // Check if updateJourneyLoad was called with the correct arguments
    expect(updateJourneyLoad).toHaveBeenCalledWith('journey-1', 'stop-1', { id: 'NEW-LOAD-ID', isReturn: true });

    // Check if the load ID is updated (optimistic update)
    await waitFor(() => {
      expect(screen.getByText('NEW-LOAD-ID')).toBeInTheDocument();
    });

    // Check if the return label is displayed (optimistic update)
    await waitFor(() => {
      expect(screen.getByText('Return:')).toBeInTheDocument();
    });
  });

  it('shows error message when update fails', async () => {
    // Mock the updateJourneyLoad function to reject
    updateJourneyLoad.mockImplementation(() => Promise.reject(new Error('Failed to update load')));

    render(
      <ThemeProvider theme={theme}>
        <LoadIDCell {...mockProps} />
      </ThemeProvider>
    );

    // Click the edit button
    fireEvent.click(screen.getByText('Edit Load'));

    // Click the save button
    fireEvent.click(screen.getByText('Save'));

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to update load information')).toBeInTheDocument();
    });

    // Check if the load ID is not updated (reverted optimistic update)
    await waitFor(() => {
      expect(screen.getByText('TEST-LOAD-001')).toBeInTheDocument();
    });
  });

  it('closes edit modal when cancel button is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <LoadIDCell {...mockProps} />
      </ThemeProvider>
    );

    // Click the edit button
    fireEvent.click(screen.getByText('Edit Load'));

    // Check if the edit modal is displayed
    expect(screen.getByTestId('edit-load-modal')).toBeInTheDocument();

    // Click the cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if the edit modal is closed
    expect(screen.queryByTestId('edit-load-modal')).not.toBeInTheDocument();
  });
});
