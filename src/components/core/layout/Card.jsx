import React from 'react';
import PropTypes from 'prop-types';
import { Card as MuiCard, CardContent, CardHeader, CardActions, Divider } from '@mui/material';

/**
 * Card component for displaying content in a contained card with optional header and footer.
 */
const Card = ({
  title,
  subtitle,
  headerAction,
  footer,
  elevation = 1,
  variant = 'outlined',
  children,
  className,
  sx = {},
  contentSx = {},
  headerSx = {},
  footerSx = {},
  ...props
}) => {
  // Base styles for the card
  const baseStyles = {
    borderRadius: '8px',
    overflow: 'hidden',
    ...sx,
  };

  // Content styles
  const contentStyles = {
    padding: '16px',
    '&:last-child': {
      paddingBottom: '16px',
    },
    ...contentSx,
  };

  // Header styles
  const headerStyles = {
    padding: '16px',
    ...headerSx,
  };

  // Footer styles
  const footerStyles = {
    padding: '8px 16px',
    ...footerSx,
  };

  return (
    <MuiCard
      elevation={elevation}
      variant={variant}
      className={className}
      sx={baseStyles}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <>
          <CardHeader
            title={title}
            subheader={subtitle}
            action={headerAction}
            sx={headerStyles}
          />
          <Divider />
        </>
      )}
      <CardContent sx={contentStyles}>
        {children}
      </CardContent>
      {footer && (
        <>
          <Divider />
          <CardActions sx={footerStyles}>
            {footer}
          </CardActions>
        </>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  /** The title of the card */
  title: PropTypes.node,
  /** The subtitle of the card */
  subtitle: PropTypes.node,
  /** Action component for the card header */
  headerAction: PropTypes.node,
  /** Footer content for the card */
  footer: PropTypes.node,
  /** Shadow depth of the card */
  elevation: PropTypes.number,
  /** The variant to use */
  variant: PropTypes.oneOf(['elevation', 'outlined']),
  /** The content of the card */
  children: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles for the card */
  sx: PropTypes.object,
  /** Custom styles for the content area */
  contentSx: PropTypes.object,
  /** Custom styles for the header */
  headerSx: PropTypes.object,
  /** Custom styles for the footer */
  footerSx: PropTypes.object,
};

export default Card;
