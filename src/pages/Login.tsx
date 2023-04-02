import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { login } from '../api/resume_service';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
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
      onSubmit={handleLogin}
    >
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
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
        Log In
      </Button>
    </Box>
  );
};

export default Login;
