import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Basic input validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Basic password validation
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // Enhanced rate limiting implementation
      const isAdminAttempt = formData.email.toLowerCase() === 'admin@voteswift.com';
      const storagePrefix = isAdminAttempt ? 'admin' : 'user';
      const attemptsKey = `${storagePrefix}LoginAttempts`;
      const timeKey = `${storagePrefix}LastAttemptTime`;
      
      const loginAttempts = parseInt(localStorage.getItem(attemptsKey) || '0');
      const lastAttemptTime = parseInt(localStorage.getItem(timeKey) || '0');
      const currentTime = Date.now();
      const timeLimit = isAdminAttempt ? 5 * 60 * 1000 : 15 * 60 * 1000; // 5 minutes for admin, 15 for others
      const maxAttempts = isAdminAttempt ? 5 : 3; // More attempts for admin
      
      // Reset attempts if lockout period has expired
      const timeSinceLastAttempt = currentTime - lastAttemptTime;
      if (timeSinceLastAttempt >= timeLimit) {
        localStorage.setItem(attemptsKey, '0');
        localStorage.removeItem(timeKey);
      } else if (loginAttempts >= maxAttempts) {
        const remainingMinutes = Math.ceil((timeLimit - timeSinceLastAttempt) / 60000);
        const remainingSeconds = Math.ceil((timeLimit - timeSinceLastAttempt) / 1000) % 60;
        const timeMessage = remainingMinutes > 0 
          ? `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}${remainingSeconds > 0 ? ` and ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}` : ''}` 
          : `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
        setError(`Account temporarily locked due to too many failed attempts. Please try again in ${timeMessage}.`);
        return;
      }

      // Reset attempts if lockout period has expired
      if (timeSinceLastAttempt >= timeLimit) {
        localStorage.setItem(attemptsKey, '0');
        localStorage.removeItem(timeKey);
      }

      // Secure admin validation with improved error handling
      const isAdmin = formData.email.toLowerCase() === 'admin@voteswift.com' && 
                     formData.password === 'Admin@VoteSwift2025!';
      
      // Clear previous session data
      localStorage.clear();

      // Log authentication attempt
      console.log('Authentication attempt:', { email: formData.email, isAdmin });

      if (isAdmin) {
        // Set admin session data
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', 'Admin');
        localStorage.setItem('adminLoginAttempts', '0');
        localStorage.removeItem('adminLastAttemptTime');
        console.log('Admin login successful');
        navigate('/admin', { replace: true });
      } else {
        // Update appropriate login attempts counter
        const attemptsKey = isAdminAttempt ? 'adminLoginAttempts' : 'loginAttempts';
        const timeKey = isAdminAttempt ? 'adminLastAttemptTime' : 'lastAttemptTime';
        localStorage.setItem(attemptsKey, String(loginAttempts + 1));
        localStorage.setItem(timeKey, String(currentTime));

        if (isAdminAttempt) {
          setError('Invalid admin credentials');
          return;
        }

        // Mock voter authentication
        localStorage.setItem('userRole', 'voter');
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', formData.email.split('@')[0]);
        localStorage.setItem('loginAttempts', '0');
        localStorage.removeItem('lastAttemptTime');
        console.log('Voter login successful');
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <Button color="primary" variant="outlined" sx={{ mr: 2 }} href="/login">
            Login
          </Button>
          <Button color="primary" variant="contained" href="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Secure Online Voting System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 6 }}>
          VoteSwift is a reliable and secure platform for online elections. Cast your vote with confidence, anytime, anywhere.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Why Choose VoteSwift?
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <LockIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Secure Voting
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Advanced encryption and security measures ensure your vote remains private and tamper-proof.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <VerifiedUserIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Vote Verification
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get confirmation of your vote with our transparent verification process.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <UpdateIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Real-time Results
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Watch the election results update in real-time as votes are counted.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              How It Works
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>1</Typography>
              <Typography variant="h6" gutterBottom>Register</Typography>
              <Typography variant="body2" color="text.secondary">
                Create your account with email verification.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>2</Typography>
              <Typography variant="h6" gutterBottom>Browse Elections</Typography>
              <Typography variant="body2" color="text.secondary">
                View active and upcoming elections.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>3</Typography>
              <Typography variant="h6" gutterBottom>Cast Your Vote</Typography>
              <Typography variant="body2" color="text.secondary">
                Select your candidate and confirm your choice.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" color="primary" gutterBottom>4</Typography>
              <Typography variant="h6" gutterBottom>View Results</Typography>
              <Typography variant="body2" color="text.secondary">
                See the outcome once the election closes.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Container maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
          <Typography component="h1" variant="h5">
            VoteSwift Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Box>
          </Box>
          </Paper>
        </Container>
      </Box>


    </Container>
    </>
  );
};

export default LoginPage;