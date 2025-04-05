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
  Avatar,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { motion } from 'framer-motion';

const candidates = [
  {
    id: 1,
    name: 'Rahul',
    department: 'Computer Science',
    description: 'A passionate advocate for technology innovation and student empowerment. Rahul has led multiple successful tech initiatives and believes in creating an inclusive digital learning environment.',
    achievements: ['President of Tech Club', 'Dean\'s List 2023', 'Hackathon Winner'],
    promises: ['Implement campus-wide tech workshops', 'Create student mentorship program', 'Enhance digital infrastructure'],
    avatar: '👨‍💻',
  },
  {
    id: 2,
    name: 'Vidya',
    department: 'Business Administration',
    description: 'An entrepreneurial mind with a focus on sustainable campus initiatives. Vidya has demonstrated strong leadership skills through various student organizations.',
    achievements: ['Founder of Entrepreneurship Society', 'Student Business Competition Winner', 'Campus Sustainability Lead'],
    promises: ['Launch student startup incubator', 'Implement green campus initiatives', 'Enhance career networking events'],
    avatar: '👩‍💼',
  },
  {
    id: 3,
    name: 'Sameera',
    department: 'Environmental Science',
    description: 'A dedicated environmentalist and community builder. Sameera has spearheaded multiple successful environmental campaigns and believes in creating a sustainable future.',
    achievements: ['Environmental Club President', 'Climate Action Award', 'Research Publication'],
    promises: ['Implement campus recycling program', 'Organize sustainability workshops', 'Create green spaces'],
    avatar: '👩‍🔬',
  },
  {
    id: 4,
    name: 'Virat',
    department: 'Political Science',
    description: 'A strong advocate for student rights and campus policy reform. Virat has experience in student government and believes in transparent leadership.',
    achievements: ['Student Senate Member', 'Policy Reform Initiative Lead', 'Debate Team Captain'],
    promises: ['Improve student representation', 'Reform campus policies', 'Enhance communication channels'],
    avatar: '👨‍⚖️',
  },
  {
    id: 5,
    name: 'Majid',
    department: 'Arts and Culture',
    description: 'A creative visionary focused on enriching campus cultural life. Majid has organized numerous successful cultural events and believes in fostering diversity.',
    achievements: ['Cultural Society President', 'Arts Festival Organizer', 'Diversity Ambassador'],
    promises: ['Expand cultural programs', 'Create art spaces', 'Promote inclusive events'],
    avatar: '👨‍🎨',
  },
];

const CandidateVoting = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votedCandidate, setVotedCandidate] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  const handleVoteClick = (candidate) => {
    setError(null);
    setSelectedCandidate(candidate);
    setShowConfirmDialog(true);
  };

  const handleConfirmVote = async () => {
    try {
      setIsVoting(true);
      setError(null);
      
      // Simulated API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API call
      // const response = await api.submitVote(selectedCandidate.id);
      
      setVotedCandidate(selectedCandidate);
      setShowConfirmDialog(false);
      setShowSuccessDialog(true);
    } catch (err) {
      setError('Failed to submit your vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error" align="center">
            {error}
          </Typography>
        </Box>
      )}
      <Typography variant="h4" gutterBottom>
        Cast Your Vote
      </Typography>
      <Grid container spacing={3}>
        {candidates.map((candidate) => (
          <Grid item xs={12} md={6} key={candidate.id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        fontSize: '2rem',
                        mr: 2,
                        bgcolor: 'primary.main',
                      }}
                    >
                      {candidate.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="div">
                        {candidate.name}
                      </Typography>
                      <Chip
                        label={candidate.department}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <Typography color="text.secondary" paragraph>
                    {candidate.description}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    Achievements:
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {candidate.achievements.map((achievement, index) => (
                      <Chip
                        key={index}
                        label={achievement}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Campaign Promises:
                  </Typography>
                  <Box>
                    {candidate.promises.map((promise, index) => (
                      <Chip
                        key={index}
                        label={promise}
                        size="small"
                        color="secondary"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ mt: 'auto', p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleVoteClick(candidate)}
                    disabled={votedCandidate !== null}
                  >
                    {votedCandidate?.id === candidate.id
                      ? 'Voted!'
                      : 'Vote for Candidate'}
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => !isVoting && setShowConfirmDialog(false)}
      >
        <DialogTitle>Confirm Your Vote</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to vote for {selectedCandidate?.name}?
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Note: You cannot change your vote once confirmed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowConfirmDialog(false)} 
            disabled={isVoting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmVote} 
            variant="contained" 
            autoFocus
            disabled={isVoting}
          >
            {isVoting ? 'Submitting...' : 'Confirm Vote'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      >
        <DialogTitle>Vote Submitted Successfully!</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thank you for voting!
            </Typography>
            <Typography>
              You have successfully voted for {votedCandidate?.name}.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowSuccessDialog(false)} 
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CandidateVoting;