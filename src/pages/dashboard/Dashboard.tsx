import React, { useState } from 'react'
import {
    Box,
    ListItemText,
    List,
    ListItemButton,
    Card,
    CardContent,
} from '@mui/material'
import MyResumes from './MyResumes'
import GenerateCoverLetter from './GenerateCoverLetter'
import { useTheme } from '@mui/material'

const Dashboard: React.FC = () => {
    const [tabValue, setTabValue] = useState(0)
    const { palette } = useTheme()

    const handleChange = (newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Box display="flex">
            <Box component="nav">
                <List
                    sx={{
                        border: `2px solid ${palette.primary.main}`,
                        margin: '2px',
                        borderRadius: '15px',
                        padding: '20px',
                        sx: {
                            height: '48px',
                        },
                    }}
                >
                    <ListItemButton
                        selected={tabValue === 0}
                        onClick={() => handleChange(0)}
                    >
                        <ListItemText primary="My Resumes" />
                    </ListItemButton>
                    <ListItemButton
                        selected={tabValue === 1}
                        onClick={() => handleChange(1)}
                    >
                        <ListItemText primary="Generate Cover Letter" />
                    </ListItemButton>
                </List>
            </Box>
            <Box p={2} flexGrow={1}>
                <Card>
                    <CardContent>
                        {tabValue === 0 && <MyResumes />}
                        {tabValue === 1 && <GenerateCoverLetter />}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default Dashboard
