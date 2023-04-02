import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material'

const Dashboard: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome, User
                </Typography>
                <Button variant="contained" color="primary">
                    Upload New Resume
                </Button>
            </Box>
        </Container>
    )
}

export default Dashboard
