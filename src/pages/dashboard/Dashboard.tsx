import React, { useState } from 'react'
import {
    Box,
    ListItemIcon,
    ListItemText,
    List,
    Divider,
    ListItemButton,
    Card,
    CardContent,
} from '@mui/material'
import MyResumes from './MyResumes'
import GenerateCoverLetter from './GenerateCoverLetter'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DescriptionIcon from '@mui/icons-material/Description'
import PostAddIcon from '@mui/icons-material/PostAdd'

const Dashboard: React.FC = () => {
    const [tabValue, setTabValue] = useState(0)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen)
    }

    const handleChange = (newValue: number) => {
        setTabValue(newValue)
    }

    const drawerItemStyles = (selected: boolean) => ({
        borderRadius: '4px',
        margin: '4px',
    })

    return (
        <Box display="flex">
            <Box component="nav">
                <List>
                    <ListItemButton
                        onClick={handleDrawerToggle}
                        sx={{
                            height: '48px',
                            ...drawerItemStyles(drawerOpen),
                        }}
                    >
                        <ListItemIcon>
                            {drawerOpen ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </ListItemIcon>
                        {drawerOpen && <ListItemText primary="Hide" />}
                    </ListItemButton>
                    <Divider />
                    <ListItemButton
                        onClick={() => handleChange(0)}
                        sx={{
                            height: '48px',
                            ...drawerItemStyles(tabValue === 0),
                        }}
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        {drawerOpen && <ListItemText primary="My Resumes" />}
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => handleChange(1)}
                        sx={{
                            height: '48px',
                            ...drawerItemStyles(tabValue === 1),
                        }}
                    >
                        <ListItemIcon>
                            <PostAddIcon />
                        </ListItemIcon>
                        {drawerOpen && (
                            <ListItemText primary="Generate Cover Letter" />
                        )}
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
