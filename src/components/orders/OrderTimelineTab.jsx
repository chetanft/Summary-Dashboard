import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Timeline from '@mui/lab/Timeline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';

const getIconForEventType = (type) => {
  switch (type) {
    case 'document':
      return <DescriptionOutlinedIcon />;
    case 'planning':
      return <AssignmentOutlinedIcon />;
    case 'indent':
      return <AssignmentOutlinedIcon />;
    case 'transit':
      return <LocalShippingOutlinedIcon />;
    case 'delivered':
      return <CheckCircleOutlineIcon />;
    default:
      return <HelpOutlineOutlinedIcon />;
  }
};

const TimelineSubEvent = ({ event }) => {
  return (
    <Box sx={{ ml: 4, mt: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {event.type === 'In Process' ? (
          <HelpOutlineOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        ) : event.type === 'Plan generated' ? (
          <CheckCircleOutlineIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        ) : event.type === 'Published' ? (
          <DescriptionOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        ) : event.type === 'Pending Acceptance' ? (
          <ScheduleIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        ) : event.type === 'In Assignment' ? (
          <AssignmentOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        ) : event.type === 'Reporting' ? (
          <LocalShippingOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        ) : (
          <HelpOutlineOutlinedIcon fontSize="small" color="action" sx={{ mr: 1 }} />
        )}
        <Box>
          <Typography variant="body2">{event.type}</Typography>
          {event.details && (
            <Typography variant="body2" color="text.secondary">
              {event.details}
            </Typography>
          )}
          {event.additionalInfo && (
            <Typography variant="body2" color="text.secondary">
              {event.additionalInfo}
            </Typography>
          )}
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          {event.time && (
            <Typography variant="caption" color="text.secondary">
              {event.time}
            </Typography>
          )}
          {event.timeRange && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Start: {event.timeRange.start}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                End: {event.timeRange.end}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const OrderTimelineTab = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return <Typography>No timeline data available</Typography>;
  }

  return (
    <Box>
      {timeline.map((day) => (
        <Box key={day.id}>
          <Paper 
            sx={{ 
              display: 'inline-block', 
              px: 2, 
              py: 0.5, 
              mb: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 2
            }}
          >
            <Typography variant="subtitle2">{day.date}</Typography>
          </Paper>
          
          <Timeline position="right" sx={{ p: 0, m: 0 }}>
            {day.events.map((event) => (
              <TimelineItem key={event.id} sx={{ minHeight: 'auto' }}>
                <TimelineSeparator>
                  <TimelineDot 
                    color={event.status === 'active' ? 'primary' : 'grey'} 
                    variant={event.status === 'active' ? 'filled' : 'outlined'}
                  >
                    {getIconForEventType(event.icon)}
                  </TimelineDot>
                  {day.events.indexOf(event) !== day.events.length - 1 && (
                    <TimelineConnector />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1">{event.type}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {event.details}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {event.time}
                    </Typography>
                  </Box>
                  
                  {event.subEvents && event.subEvents.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {event.subEvents.map((subEvent) => (
                        <TimelineSubEvent key={subEvent.id} event={subEvent} />
                      ))}
                    </Box>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      ))}
    </Box>
  );
};

export default OrderTimelineTab;
