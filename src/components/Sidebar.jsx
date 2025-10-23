// src/components/Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React from 'react';

const Sidebar = ({ organizations, selectedOrg, onSelectOrg, mobileOpen, onClose, isMobile }) => {
  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'blue', // light blue
        color: '#ffffff',
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
        }}
      >
        {isMobile && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              left: 8,
              top: 8,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
          YAU
        </Typography>
        <Typography variant="caption" sx={{ color: '#f0f9ff', display: 'block' }}>
          Young Athlete University
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 0.5, fontWeight: 500, color: '#f1f5f9' }}
        >
          Game Schedule
        </Typography>
      </Box>

      {/* Organizations List */}
      <Typography
        variant="overline"
        sx={{
          px: 2,
          py: 1,
          color: '#e0f2fe',
          letterSpacing: 0.5,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        ORGANIZATIONS
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {organizations.map((org) => (
          <ListItemButton
            key={org.name}
            onClick={() => {
              onSelectOrg(org.name);
              if (isMobile) onClose();
            }}
            sx={{
              backgroundColor: selectedOrg === org.name ? '#ffffff' : 'transparent',
              color: selectedOrg === org.name ? '#1e3a8a' : '#ffffff',
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              '&:hover': {
                backgroundColor:
                  selectedOrg === org.name ? '#f1f5f9' : 'rgba(255,255,255,0.15)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: selectedOrg === org.name ? 600 : 400 }}
                >
                  {org.name}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
         zIndex: 1300,
        '& .MuiDrawer-paper': {
          width: 240,
          borderRight: 0,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          borderRight: 0,
        },
      }}
      open
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
