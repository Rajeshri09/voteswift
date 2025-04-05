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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Rahul', department: 'Computer Science', position: 'President' },
    { id: 2, name: 'Vidya', department: 'Business Administration', position: 'Vice President' },
    { id: 3, name: 'Sameera', department: 'Environmental Science', position: 'Secretary' },
    { id: 4, name: 'Virat', department: 'Political Science', position: 'Member' },
    { id: 5, name: 'Majid', department: 'Arts and Culture', position: 'Member' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    department: '',
    position: '',
  });

  const handleEditClick = (candidate) => {
    setSelectedCandidate(candidate);
    setEditForm({
      name: candidate.name,
      department: candidate.department,
      position: candidate.position,
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCandidate(null);
    setEditForm({ name: '', department: '', position: '' });
  };

  const handleSaveEdit = () => {
    if (selectedCandidate) {
      setCandidates(candidates.map((candidate) =>
        candidate.id === selectedCandidate.id
          ? { ...candidate, ...editForm }
          : candidate
      ));
    }
    handleCloseDialog();
  };

  const handleDeleteCandidate = (candidateId) => {
    setCandidates(candidates.filter((candidate) => candidate.id !== candidateId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Candidates
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.department}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(candidate)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Candidate</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="department"
            label="Department"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.department}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="position"
            label="Position"
            type="text"
            fullWidth
            variant="outlined"
            value={editForm.position}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CandidateManagement;