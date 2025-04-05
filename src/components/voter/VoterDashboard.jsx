import { useState, useEffect } from 'react';
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
  Stack,
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PollIcon from '@mui/icons-material/Poll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router-dom';

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [elections, setElections] = useState([
    {
      id: 1,
      title: 'Student Council President Election',
      description: 'Election for the position of Student Council President',
      status: 'active',
      startDate: '2025-04-01T09:00:00',
      endDate: '2025-04-15T18:00:00',
      totalVotes: 156,
      candidates: 3,
      hasVoted: false
    },
    {
      id: 2,
      title: 'Department Representative Election',
      description: 'Election for Department Representatives',
      status: 'upcoming',
      startDate: '2025-04-20T09:00:00',
      endDate: '2025-04-25T18:00:00',
      totalVotes: 0,
      candidates: 5,
      hasVoted: false
    }
  ]);

  const [stats, setStats] = useState({
    availableElections: 0,
    activeElections: 0,
    electionsVoted: 0,
    remainingVotes: 0
  });

  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  useEffect(() => {
    const activeCount = elections.filter(e => e.status === 'active').length;
    const votedCount = elections.filter(e => e.hasVoted).length;
    setStats({
      availableElections: elections.length,
      activeElections: activeCount,
      electionsVoted: votedCount,
      remainingVotes: elections.length - votedCount
    });
  }, [elections]);

  const handleViewResults = (electionId) => {
    if (userRole === 'admin') {
      navigate(`/admin/election/${electionId}/results`);
    }
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

  const handleVoteClick = (electionId) => {
    navigate(`/election/${electionId}/candidates`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Elections
      </Typography>
      
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ width: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <HowToVoteIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" component="div">
                  Available Elections
                </Typography>
              </Stack>
              <Typography variant="h4" color="primary" align="center">
                {stats.availableElections}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ width: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <PollIcon color="success" sx={{ fontSize: 40 }} />
                <Typography variant="h6" component="div">
                  Active Elections
                </Typography>
              </Stack>
              <Typography variant="h4" color="success" align="center">
                {stats.activeElections}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ width: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <CheckCircleIcon color="info" sx={{ fontSize: 40 }} />
                <Typography variant="h6" component="div">
                  Elections Voted
                </Typography>
              </Stack>
              <Typography variant="h4" color="info" align="center">
                {stats.electionsVoted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center',
              cursor: userRole === 'admin' ? 'pointer' : 'not-allowed',
              opacity: userRole === 'admin' ? 1 : 0.7
            }}
            onClick={() => handleViewResults(1)}
          >
            <CardContent sx={{ width: '100%' }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <TimerIcon color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="h6" component="div">
                  View Results
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" align="center">
                {userRole === 'admin' ? 'Click to view results' : 'Only permitted to admin to view'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Active Elections
      </Typography>
      <Grid container spacing={3}>
        {elections.map((election) => (
          <Grid item xs={12} md={6} key={election.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {election.title}
                  </Typography>
                  <Chip
                    label={election.status.toUpperCase()}
                    color={getStatusColor(election.status)}
                  />
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
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleVoteClick(election.id)}
                  disabled={election.status !== 'active' || election.hasVoted}
                >
                  {election.hasVoted ? 'Already Voted' : 'Vote Now'}
                </Button>
                <Button
                  size="small"
                  onClick={() => navigate(`/election/${election.id}/candidates`)}
                >
                  View Candidates
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => navigate('/my-votes')}
                >
                  View My Votes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VoterDashboard;