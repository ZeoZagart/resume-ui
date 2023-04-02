import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { login } from '../api/resume_service'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setToken } = useAuth()
    const navigator = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const { token } = await login(email, password)
            setToken(token)
            navigator('/dashboard');
        } catch (error) {
            setError('Invalid email or password.')
        } finally {
            setLoading(false)
        }
    }

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
                error={Boolean(error)}
                helperText={error}
            />
            <TextField
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(error)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Log In'}
            </Button>
        </Box>
    )
}

export default Login
