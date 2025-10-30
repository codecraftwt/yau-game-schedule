// src/components/GamesPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import SportsSelection from './SportsSelection';
import AgeGroups from './AgeGroups';
import ScheduleTable from './ScheduleTable';
import { api } from '../services/api';

const GamesPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [orgsResponse, schedulesResponse] = await Promise.all([
          api.getOrganizations(),
          api.getSchedules()
        ]);

        if (orgsResponse.success) {
          setOrganizations(orgsResponse.data);
          if (orgsResponse.data.length > 0) {
            setSelectedOrg(orgsResponse.data[0].name);
          }
        }

        if (schedulesResponse.success) {
          setSchedules(schedulesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const org = organizations.find((o) => o.name === selectedOrg);

  // Reset sport and age group when organization changes
  const handleSelectOrg = (orgName) => {
    setSelectedOrg(orgName);
    setSelectedSport(null);
    setSelectedAgeGroup(null);
  };

  // Reset age group when sport changes
  const handleSelectSport = (sport) => {
    setSelectedSport(sport);
    setSelectedAgeGroup(null);
  };

  // Handle back navigation
  const handleBackToSports = () => {
    setSelectedSport(null);
    setSelectedAgeGroup(null);
  };

  const handleBackToAgeGroups = () => {
    setSelectedAgeGroup(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar
        organizations={organizations}
        selectedOrg={selectedOrg}
        onSelectOrg={handleSelectOrg}
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
                YAU TeamUp
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ mt: isMobile ? 8 : 0 }}>
          {!selectedSport ? (
            // Show Sports Selection (TeamUp Page)
            <SportsSelection 
              org={org} 
              onSelectSport={handleSelectSport}
            />
          ) : !selectedAgeGroup ? (
            // Show Age Groups for selected sport
            <AgeGroups
              org={org}
              sport={selectedSport}
              onSelectAgeGroup={setSelectedAgeGroup}
              onBack={handleBackToSports}
              schedules={schedules}
            />
          ) : (
            // Show Schedule Table for selected age group
            <ScheduleTable
              org={org}
              sport={selectedSport}
              ageGroup={selectedAgeGroup}
              onBack={handleBackToAgeGroups}
              schedules={schedules}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GamesPage;