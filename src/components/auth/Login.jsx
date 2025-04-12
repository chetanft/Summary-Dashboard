import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Switch,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import freightTigerLogo from '../../assets/freight-tiger-logo.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const user = login(username, password);
    if (user) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: '456px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          boxShadow: '12px 0px 24px #EFEFEF',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Box sx={{ width: '360px', margin: '0 auto' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', mb: 4 }}>
            <Box
              component="img"
              src={freightTigerLogo}
              alt="Freight Tiger Logo"
              sx={{ height: '45px' }}
            />
          </Box>

          {/* Login Title */}
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 600,
              color: '#434F64',
              mb: 4,
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Log In
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: '#5F697B',
                  mb: 1,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Email or Phone Number
              </Typography>
              <TextField
                fullWidth
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="eg. someone@email.com"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '52px',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#CED1D7',
                    },
                    '&:hover fieldset': {
                      borderColor: '#CED1D7',
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: '#5F697B',
                  mb: 1,
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***************"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '52px',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#CED1D7',
                    },
                    '&:hover fieldset': {
                      borderColor: '#CED1D7',
                    },
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#434F64',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#434F64',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: '"Inter", sans-serif', color: '#1A1A1A' }}
                  >
                    Remember me
                  </Typography>
                }
              />
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#1890FF',
                  fontWeight: 500,
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '14px',
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 3,
                backgroundColor: '#434F64',
                borderRadius: '8px',
                height: '40px',
                textTransform: 'none',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
              }}
            >
              Sign In
            </Button>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Button
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                color: '#434F64',
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                textTransform: 'none',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                height: '40px',
              }}
            >
              Sign In with OTP
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                color: '#434F64',
                borderColor: 'transparent',
                backgroundColor: '#F0F1F7',
                textTransform: 'none',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                height: '40px',
                borderRadius: '6px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                  sx={{ height: '20px', width: '20px' }}
                />
                <Typography>Sign in with Google</Typography>
              </Box>
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                color: '#434F64',
                borderColor: 'transparent',
                backgroundColor: '#F0F1F7',
                textTransform: 'none',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                height: '40px',
                borderRadius: '6px',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft Logo"
                  sx={{ height: '20px', width: '20px' }}
                />
                <Typography>Sign in with Microsoft</Typography>
              </Box>
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ width: '360px', margin: '0 auto' }}>
          <Link
            href="#"
            underline="none"
            sx={{
              color: '#1890FF',
              fontFamily: '"Inter", sans-serif',
              fontSize: '14px',
              display: 'block',
              textAlign: 'center',
              mb: 2,
            }}
          >
            Need help with account?
          </Link>
          <Typography
            variant="body2"
            sx={{
              color: '#666666',
              fontFamily: '"Inter", sans-serif',
              fontSize: '13px',
              textAlign: 'center',
            }}
          >
            © Freight Tiger 2024
          </Typography>
        </Box>
      </Box>

      {/* Right Content Area - Placeholder for now */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ p: 4, maxWidth: '600px' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#434F64' }}>
            TMS Dashboard Demo
          </Typography>
          <Typography variant="body1" paragraph>
            Please use one of the following demo credentials to log in:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  CXO
                </Typography>
                <Typography variant="body2">Username: cxo</Typography>
                <Typography variant="body2">Password: cxo123</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Company User
                </Typography>
                <Typography variant="body2">Username: company</Typography>
                <Typography variant="body2">Password: company123</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Branch User
                </Typography>
                <Typography variant="body2">Username: branch</Typography>
                <Typography variant="body2">Password: branch123</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
