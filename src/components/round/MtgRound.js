import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Round from './Round';

const LifeDisplay = styled(Typography)(({ theme, isDead }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  minWidth: '80px',
  textAlign: 'center',
  color: isDead ? theme.palette.error.main : theme.palette.text.primary,
}));

const PlayerLifeContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const PlayerLife = ({
  life,
  playerId,
  roundId,
  handleIncreaseLife,
  handleDecreaseLife,
}) => {
  const isDead = life <= 0;

  return (
    <PlayerLifeContainer item xs={6} sm={4} md={3}>
      <LifeDisplay isDead={isDead}>{life}</LifeDisplay>
      <ButtonGroup variant="contained" size="small">
        <Button
          onClick={() => handleDecreaseLife(roundId, playerId)}
          color="error"
          aria-label="decrease life"
        >
          <RemoveIcon />
        </Button>
        <Button
          onClick={() => handleIncreaseLife(roundId, playerId)}
          color="success"
          aria-label="increase life"
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
    </PlayerLifeContainer>
  );
};

PlayerLife.propTypes = {
  life: PropTypes.number.isRequired,
  playerId: PropTypes.number.isRequired,
  roundId: PropTypes.number.isRequired,
  handleIncreaseLife: PropTypes.func.isRequired,
  handleDecreaseLife: PropTypes.func.isRequired,
};

const MtgRound = ({
  results,
  id,
  handleIncreaseLife,
  handleDecreaseLife,
}) => {
  return (
    <Round>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-evenly">
          {results.map((result) => (
            <PlayerLife
              key={result.playerId}
              life={result.life}
              playerId={result.playerId}
              roundId={id}
              handleIncreaseLife={handleIncreaseLife}
              handleDecreaseLife={handleDecreaseLife}
            />
          ))}
        </Grid>
      </CardContent>
    </Round>
  );
};

MtgRound.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      playerId: PropTypes.number.isRequired,
      life: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.number.isRequired,
  handleIncreaseLife: PropTypes.func.isRequired,
  handleDecreaseLife: PropTypes.func.isRequired,
};

export default MtgRound;

