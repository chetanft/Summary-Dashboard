import React, { createContext, useContext, memo, useEffect } from 'react';
import { preloadCommonIcons } from '../../utils/iconUtils';

// Import all commonly used Material UI icons directly
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CircleIcon from '@mui/icons-material/Circle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleIcon from '@mui/icons-material/Article';
import HistoryIcon from '@mui/icons-material/History';
import SupportIcon from '@mui/icons-material/Support';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import PlanningIcon from '@mui/icons-material/Event';
import PaletteIcon from '@mui/icons-material/Palette';

// Import Lucide icons
// Using dynamic import to avoid build issues
let LucideIcons = {};

// Try to load Lucide icons, but don't fail if they're not available
try {
  // This will be properly chunked during build
  import('lucide-react').then(module => {
    LucideIcons = module;
  }).catch(error => {
    console.warn('Failed to load Lucide icons:', error);
  });
} catch (error) {
  console.warn('Failed to import Lucide icons:', error);
}

// Create a map of all pre-imported Material UI icons
const materialIcons = {
  AccessTime: AccessTimeIcon,
  AccountCircle: AccountCircleIcon,
  Add: AddIcon,
  ArrowBack: ArrowBackIcon,
  ArrowDropDown: ArrowDropDownIcon,
  ArrowForward: ArrowForwardIcon,
  ArrowRight: ArrowRightIcon,
  CheckCircle: CheckCircleIcon,
  ChevronLeft: ChevronLeftIcon,
  ChevronRight: ChevronRightIcon,
  Close: CloseIcon,
  Dashboard: DashboardIcon,
  Delete: DeleteIcon,
  Edit: EditIcon,
  Error: ErrorIcon,
  FilterList: FilterListIcon,
  Info: InfoIcon,
  LocalShipping: LocalShippingIcon,
  Menu: MenuIcon,
  MoreVert: MoreVertIcon,
  Notifications: NotificationsIcon,
  Person: PersonIcon,
  Refresh: RefreshIcon,
  Search: SearchIcon,
  Settings: SettingsIcon,
  TrendingDown: TrendingDownIcon,
  TrendingUp: TrendingUpIcon,
  Visibility: VisibilityIcon,
  VisibilityOff: VisibilityOffIcon,
  WarningAmber: WarningAmberIcon,
  Circle: CircleIcon,
  Assignment: AssignmentIcon,
  DirectionsCar: DirectionsCarIcon,
  Storefront: StorefrontIcon,
  Receipt: ReceiptIcon,
  Description: DescriptionIcon,
  AttachMoney: AttachMoneyIcon,
  Gavel: GavelIcon,
  Article: ArticleIcon,
  History: HistoryIcon,
  Support: SupportIcon,
  ViewQuilt: ViewQuiltIcon,
  Planning: PlanningIcon,
  Palette: PaletteIcon,
};

// Create a mapping between Material UI icons and their Lucide equivalents
const iconMapping = {
  AccessTime: 'Clock',
  AccountCircle: 'UserCircle',
  Add: 'Plus',
  ArrowBack: 'ArrowLeft',
  ArrowDropDown: 'ChevronDown',
  ArrowForward: 'ArrowRight',
  ArrowRight: 'ArrowRight',
  CheckCircle: 'CheckCircle',
  ChevronLeft: 'ChevronLeft',
  ChevronRight: 'ChevronRight',
  Close: 'X',
  Dashboard: 'LayoutDashboard',
  Delete: 'Trash2',
  Edit: 'Edit',
  Error: 'AlertCircle',
  FilterList: 'Filter',
  Info: 'Info',
  LocalShipping: 'Truck',
  Menu: 'Menu',
  MoreVert: 'MoreVertical',
  Notifications: 'Bell',
  Person: 'User',
  Refresh: 'RefreshCw',
  Search: 'Search',
  Settings: 'Settings',
  TrendingDown: 'TrendingDown',
  TrendingUp: 'TrendingUp',
  Visibility: 'Eye',
  VisibilityOff: 'EyeOff',
  WarningAmber: 'AlertTriangle',
  Circle: 'Circle',
  Assignment: 'ClipboardList',
  DirectionsCar: 'Car',
  Storefront: 'Store',
  Receipt: 'Receipt',
  Description: 'FileText',
  AttachMoney: 'DollarSign',
  Gavel: 'Gavel',
  Article: 'FileText',
  History: 'History',
  Support: 'LifeBuoy',
  ViewQuilt: 'LayoutGrid',
  Planning: 'Calendar',
  Palette: 'Palette',
};

// Create a context to provide icons throughout the app
const IconContext = createContext({ materialIcons, lucideIcons: LucideIcons, iconMapping });

/**
 * Provider component that makes the icon registry available to any nested components
 */
export const IconRegistryProvider = ({ children }) => {
  // State to track if Lucide icons are loaded
  const [lucideIcons, setLucideIcons] = React.useState(LucideIcons);

  // Load Lucide icons dynamically
  useEffect(() => {
    import('lucide-react')
      .then(module => {
        setLucideIcons(module);
        // Preload common icons after Lucide is loaded
        preloadCommonIcons();
      })
      .catch(error => {
        console.warn('Failed to load Lucide icons in provider:', error);
      });
  }, []);

  return (
    <IconContext.Provider value={{ materialIcons, lucideIcons, iconMapping }}>
      {children}
    </IconContext.Provider>
  );
};

/**
 * Hook to access the icon registry
 */
export const useIconRegistry = () => useContext(IconContext);

/**
 * A component that renders an icon from the registry
 * @param {Object} props - Component props
 * @param {string} props.name - Icon name
 * @param {boolean} props.useMui - Whether to use Material UI icon (default: false)
 * @param {Object} props.rest - Other props to pass to the icon component
 */
const Icon = memo(({ name, useMui = false, ...props }) => {
  const { materialIcons, lucideIcons, iconMapping } = useIconRegistry();

  // If useMui is true, use Material UI icon
  if (useMui) {
    const MuiIconComponent = materialIcons[name];
    if (!MuiIconComponent) {
      console.warn(`Material UI Icon "${name}" not found in registry`);
      return null;
    }
    return <MuiIconComponent {...props} />;
  }

  // Otherwise, use Lucide icon
  // First, check if there's a mapping for this icon name
  const lucideIconName = iconMapping[name] || name;

  // Check if lucideIcons is loaded and has the icon
  if (lucideIcons && typeof lucideIcons === 'object') {
    const LucideIconComponent = lucideIcons[lucideIconName];

    if (LucideIconComponent) {
      return <LucideIconComponent {...props} />;
    }
  }

  // Fallback to Material UI icon if Lucide icon is not found or not loaded yet
  const FallbackIcon = materialIcons[name];
  if (FallbackIcon) {
    return <FallbackIcon {...props} />;
  }

  // If no icon is found, return null
  console.warn(`Icon "${name}" (Lucide: "${lucideIconName}") not found in any registry`);
  return null;
});

export default Icon;
