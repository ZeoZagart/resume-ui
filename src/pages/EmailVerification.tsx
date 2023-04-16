// src/pages/EmailVerification.tsx
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { verifyEmail, resendOTP } from '../api/resume_service'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const EmailVerification: React.FC = () => {
    const { token } = useAuth()
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigator = useNavigate()

    const handleVerification = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const response = await verifyEmail(token!!, otp)
        if (response.state === 'SUCCESS') {
            navigator('/dashboard')
        } else {
            setError(response.error)
        }
        setLoading(false)
    }

    const handleResendOTP = async () => {
        setLoading(true)
        setError('')

        const response = await resendOTP(token!!)
        if (response.state === 'SUCCESS') {
            setError('OTP sent again')
        } else {
            setError(response.error)
        }
        setLoading(false)
    }

    return (
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={4}
            onSubmit={handleVerification}
        >
            <Typography variant="h4" gutterBottom>
                Email Verification
            </Typography>
            <TextField
                label="OTP"
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={Boolean(error)}
                helperText={error}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Verify'}
            </Button>
            <Button
                variant="text"
                color="secondary"
                disabled={loading}
                onClick={handleResendOTP}
            >
                Resend OTP
            </Button>
        </Box>
    )
}

export default EmailVerification
