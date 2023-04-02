import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signup } from '../api/resume_service';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await signup(name, email, password);
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } catch (error) {
      // Handle errors
    }
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
      <TextField
        label="Name"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
