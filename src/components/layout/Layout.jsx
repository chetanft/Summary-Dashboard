import { Box, Container, Typography } from '@mui/material';
import Header from './Header';

const Layout = ({ children, title, onRefresh }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onRefresh={onRefresh} />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {title && (
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </Container>
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          TMS Dashboard © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
