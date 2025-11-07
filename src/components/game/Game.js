import React from 'react';
import Grid from '@mui/material/Grid';

import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RoundList from '../round/RoundList';
import ScoreList from '../score/ScoreList';
import GameBar from './GameBar';
import GameDrawer from './GameDrawer';

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: '20px',
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleDrawer = (open) => {
    this.setState({
      open,
    });
  };

  render() {
    const { open } = this.state;
    const {
      gameType,
      allowAddPlayer,
      children,
      createRound,
      rounds,
      calculateTotalPoints,
      players,
      updatePlayerName,
      addPlayer,
    } = this.props;
    return (
      <div>
        <GameBar gameType={gameType} toggleDrawer={this.toggleDrawer} />
        <GameDrawer toggleDrawer={this.toggleDrawer} open={open} />
        <StyledGrid container spacing={2} alignItems="center">
          <ScoreList
            rounds={rounds}
            players={players}
            handleUpdatePlayerName={updatePlayerName}
            handleAddPlayer={addPlayer}
            allowAddPlayer={allowAddPlayer}
            calculateTotalPoints={calculateTotalPoints}
          />
          <RoundList>{children}</RoundList>
          <StyledFab onClick={createRound} color="secondary">
            <AddIcon />
          </StyledFab>
        </StyledGrid>
      </div>
    );
  }
}

Game.propTypes = {
  allowAddPlayer: PropTypes.bool,
};
Game.defaultProps = {
  allowAddPlayer: false,
};

export default Game;
