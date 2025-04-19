import React from 'react';
import PropTypes from 'prop-types';
import { 
  Card as MuiCard, 
  CardHeader, 
  CardContent, 
  CardActions, 
  CardMedia,
  Typography,
  IconButton,
  styled,
  Box
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

/**
 * Styled Card component that follows the design system
 */
const StyledCard = styled(MuiCard)(({ theme, variant, elevation }) => ({
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'box-shadow 0.3s ease-in-out',
  boxShadow: elevation ? theme.shadows[elevation] : 'none',
  border: variant === 'outlined' ? `1px solid ${theme.palette.divider}` : 'none',
  
  '&:hover': {
    boxShadow: elevation ? theme.shadows[elevation + 1] : theme.shadows[1],
  },
}));

/**
 * Styled CardHeader component
 */
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(2),
  '& .MuiCardHeader-title': {
    fontSize: '1.125rem',
    fontWeight: 600,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '0.875rem',
  },
}));

/**
 * Styled CardContent component
 */
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

/**
 * Styled CardActions component
 */
const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  justifyContent: 'flex-end',
}));

/**
 * Card component
 * 
 * A customizable card component that follows the design system.
 */
const Card = ({
  title,
  subheader,
  image,
  imageHeight,
  imageAlt,
  actions,
  children,
  variant,
  elevation,
  showMoreOptions,
  onMoreOptionsClick,
  headerAction,
  className,
  ...props
}) => {
  return (
    <StyledCard variant={variant} elevation={elevation} className={className} {...props}>
      {(title || subheader) && (
        <StyledCardHeader
          title={title}
          subheader={subheader}
          action={
            headerAction || (showMoreOptions ? (
              <IconButton aria-label="more options" onClick={onMoreOptionsClick}>
                <MoreVertIcon />
              </IconButton>
            ) : null)
          }
        />
      )}
      
      {image && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={image}
          alt={imageAlt || title || 'Card image'}
        />
      )}
      
      <StyledCardContent>
        {children}
      </StyledCardContent>
      
      {actions && actions.length > 0 && (
        <StyledCardActions>
          {actions}
        </StyledCardActions>
      )}
    </StyledCard>
  );
};

Card.propTypes = {
  /**
   * Card title
   */
  title: PropTypes.node,
  
  /**
   * Card subheader
   */
  subheader: PropTypes.node,
  
  /**
   * Image URL
   */
  image: PropTypes.string,
  
  /**
   * Image height in pixels
   */
  imageHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  /**
   * Image alt text
   */
  imageAlt: PropTypes.string,
  
  /**
   * Card actions (buttons, etc.)
   */
  actions: PropTypes.node,
  
  /**
   * Card content
   */
  children: PropTypes.node,
  
  /**
   * Card variant
   */
  variant: PropTypes.oneOf(['elevation', 'outlined']),
  
  /**
   * Card elevation (0-24)
   */
  elevation: PropTypes.number,
  
  /**
   * Whether to show the more options button
   */
  showMoreOptions: PropTypes.bool,
  
  /**
   * Callback for more options button click
   */
  onMoreOptionsClick: PropTypes.func,
  
  /**
   * Custom header action
   */
  headerAction: PropTypes.node,
  
  /**
   * Additional CSS class
   */
  className: PropTypes.string,
};

Card.defaultProps = {
  variant: 'elevation',
  elevation: 1,
  imageHeight: 200,
  showMoreOptions: false,
};

export default Card;
