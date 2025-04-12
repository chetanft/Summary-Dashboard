import { Box } from '@mui/material';
import Header from './Header';

const Layout = ({ children, onRefresh }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      width: '100%',
    }}>
      {/* Header */}
      <Header onRefresh={onRefresh} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px 20px 0px',
          gap: '20px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
