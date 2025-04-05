import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const MyVotes = () => {
  // Mock data for voted elections (to be replaced with API calls)
  const [votedElections] = useState([
    {
      id: 1,
      electionTitle: 'Student Council President',
      candidateName: 'Rahul',
      votedAt: '2025-04-05T10:30:00',
      department: 'Computer Science',
    },
    {
      id: 2,
      electionTitle: 'Department Representative',
      candidateName: 'Vidya',
      votedAt: '2025-04-08T14:15:00',
      department: 'Business Administration',
    },
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const username = localStorage.getItem('username') || 'User'; // Get username from localStorage

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Votes
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Welcome, {username}! Here's your voting history.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HowToVoteIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">Total Votes Cast</Typography>
              </Box>
              <Typography variant="h3" color="primary" align="center">
                {votedElections.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Election</TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Voted On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votedElections.map((vote) => (
              <TableRow key={vote.id}>
                <TableCell>{vote.electionTitle}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {vote.candidateName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={vote.department}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{formatDate(vote.votedAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyVotes;