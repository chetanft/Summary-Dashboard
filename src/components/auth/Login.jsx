import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Switch,
  Link,
} from '@mui/material';
import IconBundle from '../common/IconBundle';
import ReleaseCarousel from '../common/ReleaseCarousel';
import releaseNotes from '../../data/releaseNotes';
import freightTigerLogo from '../../assets/freight-tiger-logo-correct.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log('Login attempt with:', { username, password });

    if (!username || !password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      // Properly await the async login function
      const user = await login(username, password);
      console.log('Login result:', user);
      if (user) {
        console.log('Login successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('Login failed');
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
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
          padding: '48px 48px 24px',
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
              alt="FREIGHT TIGER"
              sx={{ height: '45px', width: 'auto', maxWidth: '250px' }}
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
              fontSize: '20px',
              lineHeight: '140%',
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
                  fontSize: '14px',
                  lineHeight: '140%',
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
                    minHeight: '52px',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#CED1D7',
                    },
                    '&:hover fieldset': {
                      borderColor: '#CED1D7',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#838C9D',
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
                  fontSize: '14px',
                  lineHeight: '140%',
                }}
              >
                Password
              </Typography>
              <Box sx={{ position: 'relative', width: '100%' }}>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***************"
                />
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePasswordVisibility}
                  sx={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {showPassword ? <IconBundle name="VisibilityOff" /> : <IconBundle name="Visibility" />}
                </IconButton>
              </Box>
              <Box sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '52px',
                    minHeight: '52px',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#CED1D7',
                    },
                    '&:hover fieldset': {
                      borderColor: '#CED1D7',
                    },
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    lineHeight: '140%',
                    color: '#838C9D',
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

            {/* Remember me toggle and Forgot password */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              height: '20px'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Switch
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  sx={{
                    width: '40px',
                    height: '20px',
                    '& .MuiSwitch-switchBase': {
                      '&.Mui-checked': {
                        color: '#FFFFFF',
                        '& + .MuiSwitch-track': {
                          backgroundColor: '#434F64',
                          opacity: 1,
                        },
                      },
                    },
                    '& .MuiSwitch-thumb': {
                      width: '16px',
                      height: '16px',
                    },
                    '& .MuiSwitch-track': {
                      borderRadius: '36.5px',
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: '#1A1A1A',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px',
                    lineHeight: '140%',
                  }}
                >
                  Remember me
                </Typography>
              </Box>
              <Link
                href="#"
                underline="none"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle forgot password
                }}
                sx={{
                  color: '#1890FF',
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '140%',
                  textAlign: 'right',
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 3,
                backgroundColor: '#434F64',
                borderRadius: '8px',
                height: '40px',
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '140%',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#323c4d',
                },
              }}
            >
              {loading ? 'Logging in...' : 'Sign In'}
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
                lineHeight: '140%',
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
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                  sx={{ height: '20px', width: '20px' }}
                />
                <Typography sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '140%' }}>
                  Sign in with Google
                </Typography>
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
                <Typography sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '140%' }}>
                  Sign in with Microsoft
                </Typography>
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
              fontWeight: 400,
              lineHeight: '140%',
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
              lineHeight: '16px',
              textAlign: 'center',
            }}
          >
            © Freight Tiger 2024
          </Typography>
        </Box>
      </Box>

      {/* Right Content Area - Release Notes Carousel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 0px',
          gap: '24px',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 20px',
            height: '40px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Box
              sx={{
                width: '7px',
                height: '7px',
                backgroundColor: '#5F697B',
                borderRadius: '50%',
              }}
            />
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#5F697B',
              }}
            >
              What's New?
            </Typography>
          </Box>
          <Button
            variant="outlined"
            sx={{
              height: '40px',
              border: '1px solid #CED1D7',
              borderRadius: '8px',
              padding: '12px 24px',
              gap: '8px',
              color: '#434F64',
              textTransform: 'none',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '19px',
            }}
            endIcon={<IconBundle name="ArrowRight" />}
          >
            View Release
          </Button>
        </Box>

        {/* Carousel */}
        <Box
          sx={{
            flex: 1,
            padding: '0px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flex: 1, position: 'relative' }}>
            <ReleaseCarousel releases={releaseNotes} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
