import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import VoterDashboard from './components/voter/VoterDashboard';
import CandidateVoting from './components/voter/CandidateVoting';
import MyVotes from './components/voter/MyVotes';
import AdminDashboard from './components/admin/AdminDashboard';
import ElectionResults from './components/admin/ElectionResults';
import CandidateManagement from './components/admin/CandidateManagement';
import CreateElection from './components/admin/CreateElection';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#e8f5fe',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(120deg, #e8f5fe 0%, #f0f7ff 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected voter routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated && userRole === 'voter' ? (
                <VoterDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/election/:id/candidates"
            element={
              isAuthenticated && userRole === 'voter' ? (
                <CandidateVoting />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-votes"
            element={
              isAuthenticated && userRole === 'voter' ? (
                <MyVotes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Protected admin routes */}
          <Route path="/admin" element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin/election/:id/results" element={isAuthenticated && userRole === 'admin' ? <ElectionResults /> : <Navigate to="/login" />} />
          <Route path="/admin/election/:id/candidates" element={isAuthenticated && userRole === 'admin' ? <CandidateManagement /> : <Navigate to="/login" />} />
          <Route path="/admin/election/create" element={isAuthenticated && userRole === 'admin' ? <CreateElection /> : <Navigate to="/login" />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;