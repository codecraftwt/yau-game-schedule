// src/components/AgeGroups.jsx
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import React from 'react';

const AgeGroups = ({ org, onSelectAgeGroup }) => {
  return (
    <Box sx={{ p: { xs: 1, md: 4 } }}>
      <Typography variant="h5">{org.name}</Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        Select an age group to view the schedule for <strong>{org.name}</strong>.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {org.ageGroups.map((group) => (
          <Card
            key={group.name}
            sx={{
              width: 150,
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
            }}
          >
            <CardActionArea onClick={() => onSelectAgeGroup(group.name)}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{group.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {group.players} players
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AgeGroups;
