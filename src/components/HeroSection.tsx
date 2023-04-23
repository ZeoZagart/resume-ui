import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

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
                InterviewGrab. Increases your chances to land an interview.
            </Typography>
            <Typography variant="h5" gutterBottom>
                Effortlessly create and manage resumes, generate tailored cover letters, and find your dream job with our AI-powered platform.
            </Typography>
            <Button component={Link} to="/signup">
                Get Started
            </Button>
        </Box>
    )
}

export default HeroSection
