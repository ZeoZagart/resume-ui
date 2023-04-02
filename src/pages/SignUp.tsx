import { Box, TextField, Button, Typography } from '@mui/material';

const SignUp: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform sign up and API call
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={4}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <TextField label="Name" margin="normal" />
      <TextField label="Email" type="email" margin="normal" />
      <TextField label="Password" type="password" margin="normal" />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;