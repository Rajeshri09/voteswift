import { useState, useEffect } from 'react';
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
  Alert,
  Grid,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (userRole !== 'admin') {
      setError('Access Denied: Only administrators can view election results.');
      return;
    }

    setLoading(true);
    // Mock election results data (to be replaced with actual API call)
    const mockResults = [
      {
        electionId: 1,
        title: 'Student Council President',
        totalVotes: 150,
        candidates: [
          { name: 'John Doe', votes: 75, percentage: 50 },
          { name: 'Jane Smith', votes: 45, percentage: 30 },
          { name: 'Bob Johnson', votes: 30, percentage: 20 },
        ],
      },
      {
        electionId: 2,
        title: 'Department Representative',
        totalVotes: 100,
        candidates: [
          { name: 'Alice Brown', votes: 60, percentage: 60 },
          { name: 'Charlie Wilson', votes: 40, percentage: 40 },
        ],
      },
    ];

    setResults(mockResults);
    setLoading(false);
  }, [userRole]);

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loading Election Results...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Election Results
      </Typography>
      {results.map((election) => (
        <Paper key={election.electionId} sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {election.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Total Votes: {election.totalVotes}
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {/* Pie Chart */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" align="center" gutterBottom>
                Vote Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={election.candidates}
                    dataKey="votes"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {election.candidates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Grid>

            {/* Bar Chart */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" align="center" gutterBottom>
                Vote Comparison
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={election.candidates}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#8884d8">
                    {election.candidates.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell align="right">Votes</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {election.candidates.map((candidate) => (
                  <TableRow key={candidate.name}>
                    <TableCell component="th" scope="row">
                      {candidate.name}
                    </TableCell>
                    <TableCell align="right">{candidate.votes}</TableCell>
                    <TableCell align="right">{candidate.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Container>
  );
};

export default ResultsPage;