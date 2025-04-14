import { memo } from 'react';

// Import only the icons we need
import NotificationsIcon from '@mui/icons-material/Notifications';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Map of icon names to components
const iconMap = {
  notifications: NotificationsIcon,
  refresh: RefreshIcon,
  search: SearchIcon,
  filterList: FilterListIcon,
  visibility: VisibilityIcon,
  visibilityOff: VisibilityOffIcon,
  infoOutlined: InfoOutlinedIcon,
  zoomIn: ZoomInIcon,
  moreVert: MoreVertIcon,
  close: CloseIcon,
  arrowBack: ArrowBackIcon,
  trendingUp: TrendingUpIcon,
  trendingDown: TrendingDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  warningAmber: WarningAmberIcon,
  accessTime: AccessTimeIcon,
  person: PersonIcon,
  localShipping: LocalShippingIcon,
  checkCircle: CheckCircleIcon,
  error: ErrorIcon,
};

/**
 * Icon component that renders a Material UI icon by name
 * @param {Object} props - Component props
 * @param {string} props.name - Icon name
 * @param {Object} props.sx - Style object
 * @returns {React.ReactElement} - Icon component
 */
const Icon = ({ name, ...props }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent {...props} />;
};

export default memo(Icon);
