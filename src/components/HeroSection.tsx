import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      padding={4}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Resume Service
      </Typography>
      <Typography variant="h5" gutterBottom>
        Upload, manage, and generate cover letters for your resumes
      </Typography>
	  <Button color="inherit" component={Link} to="/signup" >
        Get Started
      </Button>
    </Box>
  );
};

export default HeroSection;
