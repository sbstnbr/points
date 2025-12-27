import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MtgPlayerPanel from '../../components/round/MtgPlayerPanel';
import GameDrawer from '../../components/Game/GameDrawer';

const STARTING_LIFE = 20;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  height: '100dvh', // Dynamic viewport height for mobile browsers
  width: '100vw',
  overflow: 'hidden',
  position: 'fixed',
  top: 0,
  left: 0,
  '@supports (-webkit-touch-callout: none)': {
    // iOS Safari fallback
    height: '-webkit-fill-available',
  },
});

const Divider = styled('div')({
  height: '4px',
  backgroundColor: '#1a1a1a',
  position: 'relative',
  zIndex: 10,
});

const MenuButton = styled(IconButton)({
  position: 'fixed',
  top: '50%',
  left: '10px',
  transform: 'translateY(-50%)',
  zIndex: 100,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  color: 'rgba(0, 0, 0, 0.6)',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

// Colors matching the reference image
const PLAYER_COLORS = {
  top: '#d4956a',    // Orange/coral
  bottom: '#7a8ba8', // Blue/gray
};

export default function MtgGame() {
  const [player1Life, setPlayer1Life] = useState(STARTING_LIFE);
  const [player2Life, setPlayer2Life] = useState(STARTING_LIFE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <Container>
      {/* Player 1 - Top (rotated 180°) */}
      <MtgPlayerPanel
        life={player1Life}
        onIncreaseLife={() => setPlayer1Life((l) => l + 1)}
        onDecreaseLife={() => setPlayer1Life((l) => l - 1)}
        backgroundColor={PLAYER_COLORS.top}
        icon="🦊"
        rotated
      />
      
      <Divider />
      
      {/* Player 2 - Bottom */}
      <MtgPlayerPanel
        life={player2Life}
        onIncreaseLife={() => setPlayer2Life((l) => l + 1)}
        onDecreaseLife={() => setPlayer2Life((l) => l - 1)}
        backgroundColor={PLAYER_COLORS.bottom}
        icon="🐱"
      />

      {/* Menu button for drawer access */}
      <MenuButton onClick={() => toggleDrawer(true)} aria-label="menu">
        <MenuIcon />
      </MenuButton>

      <GameDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </Container>
  );
}
