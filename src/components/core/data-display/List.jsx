import React from 'react';
import PropTypes from 'prop-types';
import {
  List as MuiList,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemAvatar,
  Divider,
  Box,
} from '@mui/material';
import { Text } from '../typography';

/**
 * Enhanced List component for displaying lists of items.
 */
const List = ({
  items,
  dense = false,
  dividers = false,
  disablePadding = false,
  renderItem,
  emptyMessage = 'No items to display',
  className,
  sx = {},
  ...props
}) => {
  // Base styles for the list
  const baseStyles = {
    width: '100%',
    ...sx,
  };

  // Default item renderer
  const defaultRenderItem = (item, index) => {
    const {
      id,
      primary,
      secondary,
      icon,
      avatar,
      button = false,
      onClick,
      selected,
      disabled,
      ...itemProps
    } = item;

    const itemKey = id || index;
    const hasIcon = Boolean(icon);
    const hasAvatar = Boolean(avatar);
    const hasSecondary = Boolean(secondary);

    const itemContent = (
      <>
        {hasIcon && <ListItemIcon>{icon}</ListItemIcon>}
        {hasAvatar && <ListItemAvatar>{avatar}</ListItemAvatar>}
        <ListItemText
          primary={primary}
          secondary={hasSecondary ? secondary : null}
          {...itemProps}
        />
      </>
    );

    return button ? (
      <ListItemButton
        key={itemKey}
        onClick={onClick}
        selected={selected}
        disabled={disabled}
      >
        {itemContent}
      </ListItemButton>
    ) : (
      <ListItem key={itemKey} disabled={disabled}>
        {itemContent}
      </ListItem>
    );
  };

  // Use custom renderer or default
  const renderListItem = renderItem || defaultRenderItem;

  return (
    <MuiList
      dense={dense}
      disablePadding={disablePadding}
      className={className}
      sx={baseStyles}
      {...props}
    >
      {items.length > 0 ? (
        items.map((item, index) => (
          <React.Fragment key={item.id || index}>
            {renderListItem(item, index)}
            {dividers && index < items.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))
      ) : (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Text>{emptyMessage}</Text>
        </Box>
      )}
    </MuiList>
  );
};

List.propTypes = {
  /** Array of list items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique identifier for the item */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** Primary text for the item */
      primary: PropTypes.node.isRequired,
      /** Secondary text for the item */
      secondary: PropTypes.node,
      /** Icon element for the item */
      icon: PropTypes.node,
      /** Avatar element for the item */
      avatar: PropTypes.node,
      /** Whether the item is a button */
      button: PropTypes.bool,
      /** Click handler for the item */
      onClick: PropTypes.func,
      /** Whether the item is selected */
      selected: PropTypes.bool,
      /** Whether the item is disabled */
      disabled: PropTypes.bool,
    })
  ).isRequired,
  /** Whether to render the list with dense padding */
  dense: PropTypes.bool,
  /** Whether to show dividers between items */
  dividers: PropTypes.bool,
  /** Whether to disable padding */
  disablePadding: PropTypes.bool,
  /** Custom renderer for list items */
  renderItem: PropTypes.func,
  /** Message to display when there are no items */
  emptyMessage: PropTypes.node,
  /** Additional class name */
  className: PropTypes.string,
  /** Custom styles */
  sx: PropTypes.object,
};

export default List;
