import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedElection, setSelectedElection] = useState(null);

  // Mock data for elections (to be replaced with API calls)
  const [elections] = useState([
    {
      id: 1,
      title: 'Student Council President',
      status: 'active',
      startDate: '2025-04-01T09:00:00',
      endDate: '2025-04-15T10:00:00',
      totalVotes: 145,
      candidates: 5,
      candidateNames: ['Rahul', 'Vidya', 'Sameera', 'Virat', 'Majid']
    },
    {
      id: 2,
      title: 'Department Representative',
      status: 'upcoming',
      startDate: '2025-04-20T10:00:00',
      endDate: '2025-04-25T16:00:00',
      totalVotes: 0,
      candidates: 4,
      candidateNames: ['Priya', 'Arjun', 'Zara', 'Dev']
    },
  ]);

  const handleMenuClick = (event, election) => {
    setAnchorEl(event.currentTarget);
    setSelectedElection(election);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedElection(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'ended':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewResults = (electionId) => {
    navigate(`/admin/election/${electionId}/results`);
    handleMenuClose();
  };

  const handleManageCandidates = (electionId) => {
    navigate(`/admin/election/${electionId}/candidates`);
    handleMenuClose();
  };

  const handleEditElection = (electionId) => {
    navigate(`/admin/election/${electionId}/edit`);
    handleMenuClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Election Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/admin/election/create')}
        >
          Create New Election
        </Button>
      </Box>

      <Grid container spacing={3}>
        {elections.map((election) => (
          <Grid item xs={12} md={6} key={election.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {election.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={election.status.toUpperCase()}
                      color={getStatusColor(election.status)}
                      sx={{ mr: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, election)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography color="text.secondary" gutterBottom>
                  Start: {formatDate(election.startDate)}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  End: {formatDate(election.endDate)}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Typography variant="body2">
                    Total Votes: {election.totalVotes}
                  </Typography>
                  <Typography variant="body2">
                    Candidates: {election.candidates}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleViewResults(election.id)}
                >
                  View Results
                </Button>
                <Button
                  size="small"
                  onClick={() => handleManageCandidates(election.id)}
                >
                  Manage Candidates
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedElection && handleEditElection(selectedElection.id)}>
          Edit Election
        </MenuItem>
        <MenuItem onClick={() => selectedElection && handleViewResults(selectedElection.id)}>
          View Results
        </MenuItem>
        <MenuItem onClick={() => selectedElection && handleManageCandidates(selectedElection.id)}>
          Manage Candidates
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default AdminDashboard;