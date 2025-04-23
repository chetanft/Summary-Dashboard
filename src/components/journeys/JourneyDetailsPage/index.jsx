import React, { useState, useEffect, Suspense, lazy, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button, Snackbar, Alert } from '@mui/material';
import Icon from '../../common/Icon';
import useAnalytics from '../../../hooks/useAnalytics';
import useKeyboardShortcuts from '../../../hooks/useKeyboardShortcuts';
import useScreenReaderAnnouncement from '../../../hooks/useScreenReaderAnnouncement';
import KeyboardShortcutsHelp from '../../common/KeyboardShortcutsHelp';
import ScreenReaderAnnouncement from '../../common/ScreenReaderAnnouncement';
import Layout from '../../layout/Layout';
import ErrorBoundary from '../../common/ErrorBoundary';
import JourneyDetailsHeader from './JourneyDetailsHeader';
import JourneyOverviewPanel from './JourneyOverviewPanel';
import JourneyDetailsTabs from './JourneyDetailsTabs';
import JourneyStatusCards from './JourneyStatusCards';
import JourneyTimeline from './JourneyTimeline';
import PlannedRoute from './PlannedRoute';
import JourneyAdditionalDetails from './JourneyAdditionalDetails';
import JourneyDocuments from './JourneyDocuments';
import RouteDetailsTabs from './RouteDetailsTabs';
import StopsTable from './StopsTable';
import JourneyStatusUpdates from './JourneyStatusUpdates';
import DocumentUpload from './DocumentUpload';
import JourneyDetailsErrorHandler from './JourneyDetailsErrorHandler';
import SkeletonJourneyDetails from './SkeletonJourneyDetails';
import { fetchJourneyDetails } from '../../../services/journeyService';

// Lazy load the map components for better performance
const RouteMap = lazy(() => import('./RouteMap'));
const MapboxRouteMap = lazy(() => import('./MapboxRouteMap'));

// Feature flag for using Mapbox map
const USE_MAPBOX_MAP = false; // Set to false to use the placeholder map, true to use Mapbox

/**
 * Journey Details Page component
 * Displays detailed information about a specific journey
 *
 * @returns {JSX.Element}
 */
const JourneyDetailsPage = () => {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const analytics = useAnalytics();
  const [journeyDetails, setJourneyDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('outbound');
  const [activeJourneyTab, setActiveJourneyTab] = useState('tracking');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const printButtonRef = useRef(null);
  const { announcement, politeness, announce } = useScreenReaderAnnouncement();

  // Load journey details
  const loadJourneyDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real application, this would fetch data from an API
      // For now, we'll use mock data
      const data = await fetchJourneyDetails(journeyId);
      setJourneyDetails(data);
      setStatusUpdates(data.statusUpdates || []);
      setDocuments(data.documents || []);
      setLoading(false);

      // Track journey view
      analytics.trackJourneyView(journeyId);

      // Announce to screen readers
      announce(`Journey details loaded for journey ${journeyId}`);
    } catch (err) {
      setError('Failed to load journey details. Please try again.');
      setLoading(false);
      console.error('Error loading journey details:', err);
    }
  }, [journeyId]);

  // Load journey details on mount
  useEffect(() => {
    loadJourneyDetails();
  }, [loadJourneyDetails]);

  // Define back click handler
  const handleBackClick = useCallback(() => {
    analytics.trackJourneyAction('Back', journeyId);
    navigate('/my-journeys');
  }, [analytics, journeyId, navigate]);

  // Define tab change handler
  const handleTabChange = useCallback((tab) => {
    analytics.trackJourneyAction('TabChange', journeyId, { tab });
    setActiveTab(tab);

    // Announce tab change to screen readers
    const tabNames = {
      'outbound': 'Outbound',
      'roundTrip': 'Round Trip',
      'expressDelivery': 'Express Delivery'
    };
    announce(`Switched to ${tabNames[tab] || tab} tab`);
  }, [analytics, journeyId, setActiveTab, announce]);

  // Define journey tab change handler
  const handleJourneyTabChange = useCallback((tab) => {
    analytics.trackJourneyAction('JourneyTabChange', journeyId, { tab });
    setActiveJourneyTab(tab);

    // Announce tab change to screen readers
    const tabNames = {
      'tracking': 'Tracking',
      'loads': 'Loads',
      'alerts': 'Alerts',
      'yard-management': 'In yard management'
    };
    announce(`Switched to ${tabNames[tab] || tab} tab`);
  }, [analytics, journeyId, announce]);

  // Define keyboard shortcuts
  const shortcuts = {
    'Navigation': {
      'escape': {
        action: handleBackClick,
        description: 'Go back to journeys list'
      },
      'r': {
        action: loadJourneyDetails,
        description: 'Refresh journey details'
      }
    },
    'Tabs': {
      '1': {
        action: () => handleTabChange('outbound'),
        description: 'Switch to Outbound tab'
      },
      '2': {
        action: () => handleTabChange('roundTrip'),
        description: 'Switch to Round Trip tab'
      },
      '3': {
        action: () => handleTabChange('expressDelivery'),
        description: 'Switch to Express Delivery tab'
      }
    },
    'Actions': {
      'p': {
        action: () => {
          if (printButtonRef.current) {
            printButtonRef.current.click();
            setSnackbar({
              open: true,
              message: 'Printing journey details...',
              severity: 'info'
            });
            analytics.trackJourneyAction('Print', journeyId, { source: 'keyboard_shortcut' });
          }
        },
        description: 'Print journey details'
      },
      's': {
        action: () => {
          setSnackbar({
            open: true,
            message: 'Add status update dialog opened',
            severity: 'info'
          });
          // In a real implementation, this would open the status update dialog
          analytics.trackJourneyAction('OpenStatusDialog', journeyId, { source: 'keyboard_shortcut' });
        },
        description: 'Add status update'
      },
      'd': {
        action: () => {
          setSnackbar({
            open: true,
            message: 'Upload document dialog opened',
            severity: 'info'
          });
          // In a real implementation, this would open the document upload dialog
          analytics.trackJourneyAction('OpenDocumentDialog', journeyId, { source: 'keyboard_shortcut' });
        },
        description: 'Upload document'
      }
    },
    'Help': {
      '?': {
        action: () => setShowShortcutsHelp(true),
        description: 'Show keyboard shortcuts'
      }
    }
  };

  // Use keyboard shortcuts
  const { enable, disable } = useKeyboardShortcuts(
    Object.entries(shortcuts).reduce((acc, [category, categoryShortcuts]) => {
      Object.entries(categoryShortcuts).forEach(([key, { action }]) => {
        acc[key.toLowerCase()] = action;
      });
      return acc;
    }, {}),
    shortcutsEnabled
  );

  // Toggle shortcuts enabled/disabled
  const handleToggleShortcuts = (enabled) => {
    setShortcutsEnabled(enabled);
    if (enabled) {
      enable();
      setSnackbar({
        open: true,
        message: 'Keyboard shortcuts enabled',
        severity: 'success'
      });
    } else {
      disable();
      setSnackbar({
        open: true,
        message: 'Keyboard shortcuts disabled',
        severity: 'info'
      });
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // handleBackClick is now defined above with useCallback

  // handleTabChange is now defined above with the shortcuts

  if (loading) {
    return (
      <Layout>
        <SkeletonJourneyDetails />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box sx={{
          p: { xs: 2, sm: 3 },
          maxWidth: '1200px',
          mx: 'auto'
        }}>
          <JourneyDetailsErrorHandler
            error={error}
            onRetry={loadJourneyDetails}
            showDetails={import.meta.env.DEV}
            errorDetails={new Error(error)}
          />
        </Box>
      </Layout>
    );
  }

  if (!journeyDetails) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6">
            Journey not found
          </Typography>
        </Box>
      </Layout>
    );
  }

  // Filter stops based on active tab
  const filteredStops = activeTab === 'roundTrip'
    ? journeyDetails.stops
    : journeyDetails.stops.filter(stop =>
        activeTab === 'outbound'
          ? !stop.type.includes('Return')
          : true
      );

  return (
    <Layout>
      <ErrorBoundary
        title="Error in Journey Details Page"
        message="An error occurred while rendering the journey details. Please try again or contact support if the problem persists."
        showDetails={import.meta.env.DEV}
        onReset={() => window.location.reload()}
        actionButton={
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate('/my-journeys')}
            sx={{ ml: 2 }}
          >
            Back to Journeys
          </Button>
        }
      >
        <Box sx={{
          p: { xs: 2, sm: 3 },
          maxWidth: '1200px',
          mx: 'auto'
        }}>
          <JourneyDetailsHeader
            journeyId={journeyDetails?.id}
            deliveryTimeframe={journeyDetails?.deliveryTimeframe}
            onBackClick={handleBackClick}
            journeyDetails={journeyDetails}
            printButtonRef={printButtonRef}
          />

          {/* Journey Details Tabs */}
          <JourneyDetailsTabs
            activeTab={activeJourneyTab}
            onTabChange={handleJourneyTabChange}
          />

          {activeJourneyTab === 'tracking' && (
            <>
              <JourneyStatusCards journeyDetails={journeyDetails || {}} />
              <JourneyOverviewPanel
                shipper={journeyDetails?.shipper}
                tripStart={journeyDetails?.tripStart}
                transitTime={journeyDetails?.transitTime}
                totalDistance={journeyDetails?.totalDistance}
              />

              <Box sx={{ mt: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  Route Details
                </Typography>

                <RouteDetailsTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />

                <StopsTable stops={filteredStops} />
              </Box>

              {/* Status Updates and Documents */}
              <Grid container spacing={3} sx={{ mt: { xs: 1, md: 2 } }}>
                <Grid item xs={12} md={6}>
                  <JourneyStatusUpdates
                    journeyId={journeyId}
                    statusUpdates={statusUpdates}
                    onStatusUpdate={(updates) => {
                      setStatusUpdates(updates);
                      if (updates.length > statusUpdates.length) {
                        const latestUpdate = updates[updates.length - 1];
                        analytics.trackStatusUpdate(journeyId, latestUpdate.status, {
                          note: latestUpdate.note,
                          timestamp: latestUpdate.timestamp
                        });

                        // Announce status update to screen readers
                        const statusLabel = latestUpdate.status
                          .replace(/_/g, ' ')
                          .toLowerCase()
                          .replace(/\b\w/g, c => c.toUpperCase());
                        announce(`Status updated to ${statusLabel}`, 'assertive');
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DocumentUpload
                    journeyId={journeyId}
                    documents={documents}
                    onDocumentsChange={(docs) => {
                      const prevCount = documents.length;
                      setDocuments(docs);

                      if (docs.length > prevCount) {
                        // Document added
                        const newDoc = docs[docs.length - 1];
                        analytics.trackDocumentAction('Upload', newDoc.id, newDoc.type, {
                          name: newDoc.name,
                          fileName: newDoc.fileName,
                          fileSize: newDoc.fileSize
                        });

                        // Announce document upload to screen readers
                        announce(`Document ${newDoc.name} uploaded successfully`, 'assertive');
                      } else if (docs.length < prevCount) {
                        // Document deleted
                        const deletedDoc = documents.find(d => !docs.some(newD => newD.id === d.id));
                        if (deletedDoc) {
                          analytics.trackDocumentAction('Delete', deletedDoc.id, deletedDoc.type, {
                            name: deletedDoc.name
                          });

                          // Announce document deletion to screen readers
                          announce(`Document ${deletedDoc.name} deleted`, 'assertive');
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>

              {/* Map and Timeline */}
              <Box sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 3, md: 4 } }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    padding: '0px',
                    gap: '20px',
                    width: '100%',
                    height: '725px'
                  }}
                >
                  {/* Map Container */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '20px',
                      gap: '20px',
                      background: '#FFFFFF',
                      borderRadius: '8px',
                      flex: 1
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        height: '40px'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '20px',
                            lineHeight: '140%',
                            color: '#5F697B'
                          }}
                        >
                          Map
                        </Typography>
                        <Button
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '8px 24px',
                            gap: '8px',
                            background: '#FFFFFF',
                            border: '1px solid #434F64',
                            borderRadius: '100px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '140%',
                            color: '#434F64',
                            textTransform: 'none'
                          }}
                          startIcon={<Icon name="Fullscreen" size={16} useMui={true} />}
                        >
                          Expand
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '14px'
                        }}
                      >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '8px 0px',
                        gap: '7px'
                      }}
                    >
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid #838C9D',
                          borderRadius: '4px'
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '140%',
                          color: '#838C9D'
                        }}
                      >
                        24hr transit
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '0px',
                        height: '11.5px',
                        border: '1px solid #E6E6E6'
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '8px 0px',
                        gap: '7px'
                      }}
                    >
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          background: '#434F64',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Icon name="Check" size={14} color="#FFFFFF" useMui={true} />
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '140%',
                          color: '#434F64'
                        }}
                      >
                        Forward trip
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '0px',
                        height: '11.5px',
                        border: '1px solid #E6E6E6'
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '8px 0px',
                        gap: '7px'
                      }}
                    >
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid #CED1D7',
                          borderRadius: '4px'
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '140%',
                          color: '#CED1D7'
                        }}
                      >
                        Reverse Leg
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    sx={{
                      width: '40px',
                      height: '40px',
                      minWidth: '40px',
                      background: '#FFFFFF',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Icon name="Settings" size={16} color="#434F64" useMui={true} />
                  </Button>
                </Box>
                <Suspense fallback={
                  <Box sx={{ width: '100%', height: '523px', borderRadius: '6px', bgcolor: 'background.light', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="body1" color="text.secondary">Loading map...</Typography>
                  </Box>
                }>
                  {USE_MAPBOX_MAP ? (
                    <MapboxRouteMap
                      stops={filteredStops}
                      center={journeyDetails.mapCoordinates?.center}
                      zoom={journeyDetails.mapCoordinates?.zoom}
                    />
                  ) : (
                    <RouteMap
                      stops={filteredStops}
                      center={journeyDetails.mapCoordinates?.center}
                      zoom={journeyDetails.mapCoordinates?.zoom}
                    />
                  )}
                </Suspense>
              </Box>

                  {/* Timeline Container */}
                  <Box
                    sx={{
                      width: '400px',
                      height: '725px'
                    }}
                  >
                    <JourneyTimeline timelineEvents={journeyDetails?.timelineEvents} />
                  </Box>
                </Box>

                {/* Planned Route */}
                <PlannedRoute stops={journeyDetails?.plannedRouteStops} />

                {/* Journey Details and Additional Details */}
                <JourneyAdditionalDetails journeyDetails={journeyDetails || {}} />

                {/* Documents */}
                <JourneyDocuments documents={journeyDetails?.documents} />
              </Box>
            </>
          )}
        </Box>
      </ErrorBoundary>

      {/* Keyboard Shortcuts Help Dialog */}
      <KeyboardShortcutsHelp
        open={showShortcutsHelp}
        onClose={() => setShowShortcutsHelp(false)}
        shortcuts={shortcuts}
        enabled={shortcutsEnabled}
        onToggleEnabled={handleToggleShortcuts}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

      {/* Screen reader announcements */}
      <ScreenReaderAnnouncement
        message={announcement}
        politeness={politeness}
      />
    </Layout>
  );
};

export default JourneyDetailsPage;
