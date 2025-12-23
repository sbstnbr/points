import React from 'react';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PollIcon from '@mui/icons-material/Poll';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import GameAnimatedIcon from './GameAnimatedIcon';

const DrawerContent = styled('div')({
  width: '250px',
  height: '100%',
  position: 'relative',
});

const IconContainer = styled('div')({
  width: '100%',
  position: 'absolute',
  bottom: '20px',
});

const games = [
  { name: 'Scopa', icon: <LocalCafeIcon /> },
  { name: 'Wist', icon: <PollIcon /> },
  { name: 'MTG', icon: <AutoAwesomeIcon /> },
];

const GameDrawer = ({ open, toggleDrawer }) => {
  const gameList = (
    <div>
      <List>
        {games.map((game) => (
          <ListItem button key={game.name} component={Link} to={`/${game.name.toLowerCase()}`}>
            <ListItemIcon>{game.icon}</ListItemIcon>
            <ListItemText primary={game.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <DrawerContent
        tabIndex={0}
        role="button"
        onClick={() => toggleDrawer(false)}
        onKeyDown={() => toggleDrawer(false)}
      >
        <Typography variant="h2">
          {' '}
          {gameList}
        </Typography>
        <IconContainer>
          <GameAnimatedIcon />
        </IconContainer>
      </DrawerContent>
    </SwipeableDrawer>
  );
};

GameDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default GameDrawer;
