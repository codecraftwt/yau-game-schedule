// src/components/AgeGroups.jsx
import { Box, Card, CardActionArea, Typography, Button, Grid } from '@mui/material';
import React from 'react';
import { ArrowBack } from '@mui/icons-material';

const AgeGroups = ({ org, sport, onSelectAgeGroup, onBack, schedules }) => {
  if (!org || !sport) return null;

  // Get age groups for the selected sport
  const ageGroups = org.sports[sport]?.divisions || [];

  // Count games for each age group
  const getAgeGroupStats = (ageGroupName) => {
    const gamesCount = schedules.filter(game => {
      const isOrgGame = game.team1.orgName === org.name || game.team2.orgName === org.name;
      const isSportMatch = game.team1.sport === sport;
      const isAgeGroupMatch = game.team1.ageGroup === ageGroupName || game.team2.ageGroup === ageGroupName;
      return isOrgGame && isSportMatch && isAgeGroupMatch;
    }).length;

    return {
      games: gamesCount,
      players: 'Multiple' // Placeholder - you can update this with actual data
    };
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Back Button and Breadcrumb */}
      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{ 
          mb: 2,
          textTransform: 'none',
          color: 'text.secondary'
        }}
      >
        Back to Sports
      </Button>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
        Dashboard / {org.name} / {sport.replace('_', ' ')}
      </Typography>

      <Typography variant="h4" sx={{ mb: 1 }}>
        {sport.replace('_', ' ')} - {org.name}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Select an age group to view the schedule for <strong>{sport.replace('_', ' ')}</strong>.
      </Typography>

      {ageGroups.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No age groups found for {sport.replace('_', ' ')} in {org.name}.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {ageGroups.map((ageGroup, index) => {
            const stats = getAgeGroupStats(ageGroup.ageGroup);
            return (
              <Grid item xs={12} sm={6} md={4} key={ageGroup.ageGroup}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    },
                  }}
                >
                  <CardActionArea 
                    onClick={() => onSelectAgeGroup(ageGroup.ageGroup)}
                    sx={{ height: '100%', p: 3 }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {ageGroup.ageGroup}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Age: {ageGroup.age}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                      <Box>
                        <Typography variant="h6" color="primary">
                          {stats.games}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Games
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6" color="primary">
                          {stats.players}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Players
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default AgeGroups;