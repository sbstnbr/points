import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Panel = styled('div')(({ bgcolor, rotated }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: bgcolor,
  position: 'relative',
  transform: rotated ? 'rotate(180deg)' : 'none',
  userSelect: 'none',
}));

const PlayerIcon = styled('div')({
  fontSize: 'clamp(40px, 8vw, 60px)',
  marginBottom: '10px',
});

const LifeTotal = styled('div')({
  fontSize: 'clamp(120px, 25vw, 200px)',
  fontWeight: 700,
  color: '#1a1a1a',
  textShadow: '0 4px 0 rgba(255, 255, 255, 0.3)',
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  lineHeight: 1,
  WebkitTextStroke: '3px rgba(255, 255, 255, 0.8)',
  paintOrder: 'stroke fill',
});

const ControlsContainer = styled('div')({
  display: 'flex',
  gap: '60px',
  marginTop: '10px',
});

const ControlButton = styled(IconButton)({
  width: '50px',
  height: '50px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  color: 'rgba(0, 0, 0, 0.6)',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '28px',
  },
});

const MtgPlayerPanel = ({
  life,
  onIncreaseLife,
  onDecreaseLife,
  backgroundColor,
  rotated = false,
  icon = '🎮',
}) => {
  return (
    <Panel bgcolor={backgroundColor} rotated={rotated}>
      <PlayerIcon>{icon}</PlayerIcon>
      <LifeTotal>{life}</LifeTotal>
      <ControlsContainer>
        <ControlButton onClick={onDecreaseLife} aria-label="decrease life">
          <RemoveIcon />
        </ControlButton>
        <ControlButton onClick={onIncreaseLife} aria-label="increase life">
          <AddIcon />
        </ControlButton>
      </ControlsContainer>
    </Panel>
  );
};

MtgPlayerPanel.propTypes = {
  life: PropTypes.number.isRequired,
  onIncreaseLife: PropTypes.func.isRequired,
  onDecreaseLife: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  rotated: PropTypes.bool,
  icon: PropTypes.string,
};

export default MtgPlayerPanel;

