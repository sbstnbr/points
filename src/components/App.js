import React from 'react';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import RoundList from './round/RoundList';
import Score from './score/Score';
import GameDrawer from './game/GameDrawer';

class App extends React.Component {
  defaultState = {
    rounds: [],
    players: ['Jess', 'Seb'],
    open: false,
  };

  rules = {
    Scopa: {
      allowAddPlayer: false,
    },
    Wist: {
      allowAddPlayer: true,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      gameType: 'Scopa',
      ...this.defaultState,
    };
    this.createRound = this.createRound.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.resetRound = this.resetRound.bind(this);
    this.updatePlayerName = this.updatePlayerName.bind(this);
  }

  resetGame = (gameType = 'Scopa') => {
    this.toggleDrawer(false);
    return this.setState({
      gameType,
      ...this.defaultState,
    });
  };

  toggleDrawer = (open) => {
    this.setState({
      open,
    });
  };

  addPlayer = (player = 'Bro') => this.setState(state => ({ players: [...state.players, player] }));

  updatePlayerName = (id, newName) => this.setState((state) => {
    const players = state.players.slice();
    players[id] = newName;
    return { players };
  });

  addPoint = (roundId, player) => this.setState((state) => {
    const rounds = state.rounds.slice();
    rounds[roundId].result[player] += 1;
    return rounds;
  });

  createRound = () => this.setState((state) => {
    const newRound = {
      id: state.rounds.length,
      result: new Array(state.players.length).fill(0),
    };
    const rounds = [...state.rounds, newRound];
    return { rounds };
  });

  resetRound = (roundId, playerId) => {
    const { rounds } = this.state;
    const updatedRounds = rounds.slice();
    updatedRounds[roundId].result[playerId] = 0;
    return this.setState({
      rounds: updatedRounds,
    });
  };

  render() {
    const {
      rounds, players, gameType, open,
    } = this.state;
    const Game = () => (
      <Grid container spacing={16} alignItems="center" style={{ padding: '20px' }}>
        <Score
          rounds={rounds}
          players={players}
          handleUpdatePlayerName={this.updatePlayerName}
          handleAddPlayer={this.addPlayer}
          allowAddPlayer={this.rules[gameType].allowAddPlayer}
        />
        <RoundList
          rounds={rounds}
          handleNewRound={this.createRound}
          handleAddPoint={this.addPoint}
          handleResetRound={this.resetRound}
        />
      </Grid>
    );
    return (
      <Router>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit">
                {gameType}
              </Typography>
            </Toolbar>
          </AppBar>
          <GameDrawer resetGame={this.resetGame} toggleDrawer={this.toggleDrawer} open={open} />
          <Route exact path="/" component={Game} />
          <Route path="/Scopa" component={Game} />
          <Route path="/Wist" component={Game} />
        </div>
      </Router>
    );
  }
}

export default App;