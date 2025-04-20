import React from 'react';
import PropTypes from 'prop-types';
import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { Box } from '@mui/material';
import { Text } from '../typography';

/**
 * Enhanced Timeline component for displaying chronological events.
 */
const Timeline = ({
  events,
  align = 'alternate',
  emptyMessage = 'No events to display',
  className,
  sx = {},
  ...props
}) => {
  // Base styles for the timeline
  const baseStyles = {
    width: '100%',
    ...sx,
  };

  // If no events, show empty message
  if (!events || events.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Text>{emptyMessage}</Text>
      </Box>
    );
  }

  return (
    <MuiTimeline
      position={align}
      className={className}
      sx={baseStyles}
      {...props}
    >
      {events.map((event, index) => {
        const {
          id,
          title,
          content,
          date,
          icon,
          color = 'primary',
          variant = 'filled',
          connector = true,
          oppositeContent,
        } = event;

        return (
          <TimelineItem key={id || index}>
            {align !== 'right' && (oppositeContent || date) && (
              <TimelineOppositeContent color="text.secondary">
                {oppositeContent || date}
              </TimelineOppositeContent>
            )}
            <TimelineSeparator>
              <TimelineDot color={color} variant={variant}>
                {icon}
              </TimelineDot>
              {connector && index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              {title && <Text weight="medium">{title}</Text>}
              {content && <Text size="small" color="text.secondary">{content}</Text>}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </MuiTimeline>
  );
};

Timeline.propTypes = {
  /** Array of timeline events */
  events: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique identifier for the event */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** Title of the event */
      title: PropTypes.node,
      /** Content of the event */
      content: PropTypes.node,
      /** Date or time of the event */
      date: PropTypes.node,
      /** Icon for the timeline dot */
      icon: PropTypes.node,
      /** Color of the timeline dot */
      color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'grey']),
      /** Variant of the timeline dot */
      variant: PropTypes.oneOf(['filled', 'outlined']),
      /** Whether to show a connector to the next event */
      connector: PropTypes.bool,
      /** Custom content for the opposite side */
      oppositeContent: PropTypes.node,
    })
  ).isRequired,
  /** Alignment of the timeline */
  align: PropTypes.oneOf(['alternate', 'left', 'right']),
  /** Message to display when there are no events */
  emptyMessage: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default Timeline;
