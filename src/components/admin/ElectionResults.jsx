import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';

const ElectionResults = () => {
  const [results] = useState({
    electionTitle: 'Student Council President',
    totalVotes: 145,
    candidates: [
      { id: 1, name: 'Rahul', department: 'Computer Science', votes: 45, percentage: 31 },
      { id: 2, name: 'Vidya', department: 'Business Administration', votes: 35, percentage: 24 },
      { id: 3, name: 'Sameera', department: 'Environmental Science', votes: 30, percentage: 21 },
      { id: 4, name: 'Virat', department: 'Political Science', votes: 20, percentage: 14 },
      { id: 5, name: 'Majid', department: 'Arts and Culture', votes: 15, percentage: 10 },
    ],
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Election Results
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {results.electionTitle}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PollIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">Total Votes Cast</Typography>
              </Box>
              <Typography variant="h3" color="primary" align="center">
                {results.totalVotes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Votes</TableCell>
              <TableCell align="right">Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>
                  <Chip
                    label={candidate.department}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">{candidate.votes}</TableCell>
                <TableCell align="right">{candidate.percentage}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ElectionResults;