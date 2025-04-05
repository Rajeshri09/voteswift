import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';

const CreateElection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form data
    if (!formData.title || !formData.type || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.startDate >= formData.endDate) {
      setError('End date must be after start date');
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await api.createElection(formData);
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError('Failed to create election. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Election
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Election Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Election Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  label="Election Type"
                  onChange={handleInputChange}
                >
                  <MenuItem value="student_council">Student Council</MenuItem>
                  <MenuItem value="department_rep">Department Representative</MenuItem>
                  <MenuItem value="club_leader">Club Leadership</MenuItem>
                  <MenuItem value="general">General Election</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.endDate}
                onChange={handleDateChange('endDate')}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type="button"
              onClick={() => navigate('/admin')}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Election
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success">
            Election created successfully! Redirecting...
          </Alert>
        </Snackbar>
      </Paper>
      </LocalizationProvider>
    </Container>
  );
};

export default CreateElection;