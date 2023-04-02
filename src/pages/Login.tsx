import { Box, TextField, Button, Typography } from '@mui/material';

const Login: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login and API call
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
        Log In
      </Typography>
      <TextField label="Email" type="email" margin="normal" />
      <TextField label="Password" type="password" margin="normal" />
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </Box>
  );
};

export default Login;