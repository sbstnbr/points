import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import CardContent from '@mui/material/CardContent';
import PropTypes from 'prop-types';
import Round from './Round';
import useLongPress from '../../hooks/useLongPress';

const PlayerScore = ({ score, playerId, roundId, handleAddPoint, handleResetRound, playerIdToServe }) => {
  const longPressProps = useLongPress(() => handleResetRound(roundId, playerId), 500);
  
  const handleClick = (e) => {
    // Call the long press onClick first to check if long press was triggered
    longPressProps.onClick(e);
    // If event wasn't prevented by long press, handle the normal click
    if (!e.defaultPrevented) {
      handleAddPoint(roundId, playerId);
    }
  };
  
  return (
    <Grid
      item
      container
      xs={3}
      sm={2}
      md={1}
      alignItems="center"
      direction="column"
    >
      <Badge variant="dot" invisible={playerId !== playerIdToServe} color="primary">
        <Button
          variant="contained"
          onClick={handleClick}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          onMouseDown={longPressProps.onMouseDown}
          onMouseUp={longPressProps.onMouseUp}
          onMouseLeave={longPressProps.onMouseLeave}
          onTouchStart={longPressProps.onTouchStart}
          onTouchEnd={longPressProps.onTouchEnd}
          onTouchMove={longPressProps.onTouchMove}
          onTouchCancel={longPressProps.onTouchCancel}
        >
          {score}
        </Button>
      </Badge>
    </Grid>
  );
};

const ScopaRound = ({
  result, id, handleAddPoint, handleResetRound, playerIdToServe,
}) => {
  return (
    <Round>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-evenly">
          {result.map((score, playerId) => (
            <PlayerScore
              key={playerId}
              score={score}
              playerId={playerId}
              roundId={id}
              handleAddPoint={handleAddPoint}
              handleResetRound={handleResetRound}
              playerIdToServe={playerIdToServe}
            />
          ))}
        </Grid>
      </CardContent>
    </Round>
  );
};

ScopaRound.propTypes = {
  result: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.number.isRequired,
  handleAddPoint: PropTypes.func.isRequired,
  handleResetRound: PropTypes.func.isRequired,
};

export default ScopaRound;
