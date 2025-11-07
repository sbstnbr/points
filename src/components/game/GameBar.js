import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const GameBar = ({ toggleDrawer, gameType }) => (
  <AppBar position="static" color="default">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu" onClick={() => toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h1" color="inherit">
        {gameType}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default GameBar;
