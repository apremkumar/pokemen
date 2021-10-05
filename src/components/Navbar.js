import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
  
// Exporting Default Navbar to the App.js File
export default function Navbar() {
  
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" 
            color="inherit" aria-label="menu">
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Pokemen
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}