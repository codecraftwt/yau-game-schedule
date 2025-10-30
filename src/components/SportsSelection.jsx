// src/components/SportsSelection.jsx
import { Box, Card, CardActionArea, Typography, Grid } from '@mui/material';
import React from 'react';

// Sport icons or images (you can replace these with actual images)
const sportImages = {
  Soccer: '⚽',
  Basketball: '🏀',
  Flag_football: '🏈',
  Kickball: '👟',
  Cheer: '📣'
};

const SportsSelection = ({ org, onSelectSport }) => {
  if (!org || !org.sports) return null;

  const sports = Object.keys(org.sports);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Welcome to YAU TeamUp
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Select your child's sport for <strong>{org.name}</strong> to view their team and game schedule.
      </Typography>

      {/* Sports Grid */}
      <Grid container spacing={3}>
        {sports.map((sport) => (
          <Grid item xs={12} sm={6} md={4} key={sport}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                },
              }}
            >
              <CardActionArea 
                onClick={() => onSelectSport(sport)}
                sx={{ height: '100%', p: 3 }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      fontSize: '4rem', 
                      mb: 2,
                      lineHeight: 1
                    }}
                  >
                    {sportImages[sport] || '🏆'}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 1 
                    }}
                  >
                    {sport.replace('_', ' ')}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {org.sports[sport].divisions.length} age group(s) available
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 600 
                    }}
                  >
                    View {sport.replace('_', ' ')} Schedule →
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* How to Use Guide */}
      <Box sx={{ mt: 6, p: 3, backgroundColor: 'background.default', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          How to Use This Page
        </Typography>
        <Box component="ol" sx={{ pl: 2 }}>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            <strong>Select your child's sport</strong> from the options above
          </Typography>
          <Typography component="li" variant="body1" sx={{ mb: 1 }}>
            <strong>Choose your child's age group</strong> from the available divisions
          </Typography>
          <Typography component="li" variant="body1">
            <strong>View practice times, game schedules, and locations</strong>
          </Typography>
        </Box>
      </Box>

      {/* Quick Access Buttons */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Card 
          sx={{ 
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'action.hover' }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>📅</Typography>
            <Typography variant="body2" fontWeight={500}>
              Full Game Calendar
            </Typography>
          </Box>
        </Card>
        
        <Card 
          sx={{ 
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'action.hover' }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>📍</Typography>
            <Typography variant="body2" fontWeight={500}>
              Game Day Locations
            </Typography>
          </Box>
        </Card>
        
        <Card 
          sx={{ 
            borderRadius: 2,
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'action.hover' }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>👤</Typography>
            <Typography variant="body2" fontWeight={500}>
              Parent Resources
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default SportsSelection;