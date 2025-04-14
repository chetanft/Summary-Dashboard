import { memo } from 'react';
import Icon from './IconRegistry';

/**
 * A wrapper around the Icon component from IconRegistry
 * This is kept for backward compatibility with existing code
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Icon name in PascalCase (e.g., "Notifications", "CheckCircle")
 * @returns {React.ReactElement} - Icon component
 */
const IconBundle = ({ name, ...props }) => {
  return <Icon name={name} {...props} />;
};

export default memo(IconBundle);
