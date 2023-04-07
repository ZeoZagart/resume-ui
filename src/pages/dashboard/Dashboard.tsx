import React, { useState } from 'react'
import { Box, AppBar, Tabs, Tab } from '@mui/material'
import MyResumes from './MyResumes'
import GenerateCoverLetter from './GenerateCoverLetter'
import AccountSettings from './AccountSettings'

const Dashboard: React.FC = () => {
    const [tabValue, setTabValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <Box>
            <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab label="My Resumes" />
                    <Tab label="Generate Cover Letter" />
                    <Tab label="Account Settings" />
                </Tabs>
            </AppBar>
            <Box p={3}>
                {tabValue === 0 && <MyResumes />}
                {tabValue === 1 && <GenerateCoverLetter />}
                {tabValue === 2 && <AccountSettings />}
            </Box>
        </Box>
    )
}

export default Dashboard
