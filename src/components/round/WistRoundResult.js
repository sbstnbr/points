import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import useLongPress from '../../hooks/useLongPress';

const getBadgeColor = (points) => (points < 0 ? 'secondary' : 'primary');

const WistRoundResult = ({
  playerId, handleIncreaseFold, handleDecreaseFold, folds, points,
}) => {
  const longPressProps = useLongPress(() => handleDecreaseFold(), 500);
  
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
      <Badge color={getBadgeColor(points)} badgeContent={folds} showZero>
        <Button
          variant="contained"
          onClick={handleIncreaseFold}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          {...longPressProps}
        >
          {points || '-'}
        </Button>
      </Badge>
    </Grid>
  );
};

export default WistRoundResult;
