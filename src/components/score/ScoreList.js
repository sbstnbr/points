import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import Score from './Score';

function ScoreList({
  players,
  rounds,
  handleUpdatePlayerName,
  allowAddPlayer,
  handleAddPlayer,
  calculateTotalPoints,
}) {
  const Players = players.map((player, id) => (
    <Score
      player={player}
      points={calculateTotalPoints(rounds, id)}
      handleUpdatePlayerName={handleUpdatePlayerName}
      key={player.id}
    />
  ));
  const addPlayerButton = allowAddPlayer ? (
    <IconButton onClick={() => handleAddPlayer()}>
      <Add />
    </IconButton>
  ) : null;
  return (
    <Grid item xs={12} container justifyContent="space-evenly">
      {Players}
      {addPlayerButton}
    </Grid>
  );
}

ScoreList.propTypes = {
  rounds: PropTypes.arrayOf(PropTypes.object).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired }),
  ).isRequired,
  allowAddPlayer: PropTypes.bool.isRequired,
  handleUpdatePlayerName: PropTypes.func.isRequired,
  handleAddPlayer: PropTypes.func.isRequired,
};

export default ScoreList;
