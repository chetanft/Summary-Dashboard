import React, { createContext, useContext, memo } from 'react';

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

// Create a map of all pre-imported icons
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

// Create a context to provide icons throughout the app
const IconContext = createContext(materialIcons);

/**
 * Provider component that makes the icon registry available to any nested components
 */
export const IconRegistryProvider = ({ children }) => {
  return (
    <IconContext.Provider value={materialIcons}>
      {children}
    </IconContext.Provider>
  );
};

/**
 * Hook to access the icon registry
 */
export const useIconRegistry = () => useContext(IconContext);

/**
 * A component that renders a Material UI icon from the registry
 */
const Icon = memo(({ name, ...props }) => {
  const iconRegistry = useIconRegistry();
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return <IconComponent {...props} />;
});

export default Icon;
