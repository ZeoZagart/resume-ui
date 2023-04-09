import React, { useState } from 'react';
import { Box, ListItemIcon, ListItemText, List, Divider, ListItemButton } from '@mui/material';
import MyResumes from './MyResumes';
import GenerateCoverLetter from './GenerateCoverLetter';
import AccountSettings from './AccountSettings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import PostAddIcon from '@mui/icons-material/PostAdd';

const Dashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleChange = (newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box display="flex">
      <Box component="nav">
        <List>
          <ListItemButton onClick={handleDrawerToggle} sx={{ height: '48px' }}>
            <ListItemIcon>
              {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Hide" />}
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => handleChange(0)} sx={{ height: '48px' }}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="My Resumes" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleChange(1)} sx={{ height: '48px' }}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Generate Cover Letter" />}
          </ListItemButton>
          <ListItemButton onClick={() => handleChange(2)} sx={{ height: '48px' }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Account Settings" />}
          </ListItemButton>
        </List>
      </Box>
      <Box p={2} flexGrow={1}>
        {tabValue === 0 && <MyResumes />}
        {tabValue === 1 && <GenerateCoverLetter />}
        {tabValue === 2 && <AccountSettings />}
      </Box>
    </Box>
  );
};

export default Dashboard;
