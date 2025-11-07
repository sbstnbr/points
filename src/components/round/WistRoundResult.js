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
  
  const handleClick = (e) => {
    // Call the long press onClick first to check if long press was triggered
    longPressProps.onClick(e);
    // If event wasn't prevented by long press, handle the normal click
    if (!e.defaultPrevented) {
      handleIncreaseFold();
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
      <Badge color={getBadgeColor(points)} badgeContent={folds} showZero>
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
          {points || '-'}
        </Button>
      </Badge>
    </Grid>
  );
};

export default WistRoundResult;
