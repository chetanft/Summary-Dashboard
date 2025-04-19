import React from 'react';
import { Box, Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import {
  CheckCircle as CheckCircleIcon,
  LocalShipping as LocalShippingIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

/**
 * Journey Timeline component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.journey - Journey data
 * @returns {JSX.Element}
 */
const JourneyTimeline = ({ journey }) => {
  // Define the timeline stages and their order
  const stages = [
    'planned',
    'en-route-to-loading',
    'at-loading',
    'in-transit',
    'at-unloading',
    'in-return',
    'delivered'
  ];
  
  // Get the current stage index
  const currentStageIndex = stages.indexOf(journey.status);
  
  // Generate timeline events based on journey status
  const timelineEvents = [
    {
      stage: 'Planned',
      status: currentStageIndex >= 0 ? 'Completed' : 'In Progress',
      time: '09:00 AM, 12 Aug',
      details: 'Journey planned and vehicle assigned',
      completed: currentStageIndex > 0,
      icon: <AssignmentIcon />
    },
    {
      stage: 'En Route to Loading',
      status: currentStageIndex === 1 ? 'In Progress' : currentStageIndex > 1 ? 'Completed' : 'Pending',
      time: currentStageIndex >= 1 ? '10:30 AM, 12 Aug' : '-',
      details: 'Vehicle en route to loading point',
      completed: currentStageIndex > 1,
      icon: <LocalShippingIcon />
    },
    {
      stage: 'At Loading',
      status: currentStageIndex === 2 ? 'In Progress' : currentStageIndex > 2 ? 'Completed' : 'Pending',
      time: currentStageIndex >= 2 ? '11:15 AM, 12 Aug' : '-',
      details: 'Vehicle at loading point',
      completed: currentStageIndex > 2,
      icon: <LocalShippingIcon />
    },
    {
      stage: 'In Transit',
      status: currentStageIndex === 3 ? 'In Progress' : currentStageIndex > 3 ? 'Completed' : 'Pending',
      time: currentStageIndex >= 3 ? '12:00 PM, 12 Aug' : '-',
      details: 'Shipment in transit',
      completed: currentStageIndex > 3,
      icon: <LocalShippingIcon />
    },
    {
      stage: 'At Unloading',
      status: currentStageIndex === 4 ? 'In Progress' : currentStageIndex > 4 ? 'Completed' : 'Pending',
      time: currentStageIndex >= 4 ? '02:30 PM, 12 Aug' : '-',
      details: 'Vehicle at unloading point',
      completed: currentStageIndex > 4,
      icon: <LocalShippingIcon />
    },
    {
      stage: 'In Return',
      status: currentStageIndex === 5 ? 'In Progress' : currentStageIndex > 5 ? 'Completed' : 'Pending',
      time: currentStageIndex >= 5 ? '03:15 PM, 12 Aug' : '-',
      details: 'Vehicle returning after delivery',
      completed: currentStageIndex > 5,
      icon: <LocalShippingIcon />
    },
    {
      stage: 'Delivered',
      status: currentStageIndex === 6 ? 'Completed' : 'Pending',
      time: currentStageIndex >= 6 ? '04:00 PM, 12 Aug' : '-',
      details: 'Shipment delivered successfully',
      completed: currentStageIndex === 6,
      icon: <CheckCircleIcon />
    }
  ];
  
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Journey Timeline
      </Typography>
      
      <Timeline position="right">
        {timelineEvents.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent sx={{ flex: 0.2 }}>
              <Typography variant="caption" color="text.secondary">
                {event.time}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot 
                color={event.completed ? "success" : index === currentStageIndex ? "primary" : "grey"}
                variant={event.completed || index === currentStageIndex ? "filled" : "outlined"}
              >
                {event.icon}
              </TimelineDot>
              {index < timelineEvents.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {event.stage}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {event.details}
              </Typography>
              <Typography variant="caption" sx={{ 
                display: 'block', 
                color: event.status === 'In Progress' ? 'primary.main' : 
                       event.status === 'Completed' ? 'success.main' : 'text.secondary'
              }}>
                {event.status}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default JourneyTimeline;
