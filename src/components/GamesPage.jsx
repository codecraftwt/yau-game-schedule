// src/components/GamesPage.jsx
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import AgeGroups from './AgeGroups';
import ScheduleTable from './ScheduleTable';
import { mockData } from '../data';

const GamesPage = () => {
  const [selectedOrg, setSelectedOrg] = useState(mockData.organizations[0].name);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:900px)');
  const org = mockData.organizations.find((o) => o.name === selectedOrg);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        organizations={mockData.organizations}
        selectedOrg={selectedOrg}
        onSelectOrg={(name) => {
          setSelectedOrg(name);
          setSelectedAgeGroup(null);
        }}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMobile={isMobile}
      />

      <Box sx={{ flex: 1, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
        {/* Mobile AppBar */}
        {isMobile && (
          <AppBar
            position="fixed"
            color="primary"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                YAU Game Schedule
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ mt: isMobile ? 8 : 0 }}>
          {!selectedAgeGroup ? (
            <AgeGroups org={org} onSelectAgeGroup={setSelectedAgeGroup} />
          ) : (
            <ScheduleTable
              org={org}
              ageGroup={selectedAgeGroup}
              onBack={() => setSelectedAgeGroup(null)}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GamesPage;
