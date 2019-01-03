import React from 'react';
import Grid from '@material-ui/core/Grid';

import ScorePlayer from './ScorePlayer';

class Score extends React.Component {
  calculatePoints(i){
    return this.props.rounds.map(round=> round.result[i]).reduce((acc,val) => acc+val,0)
  }
  render(){
    const players = this.props.players.map((player,id) =>
      <ScorePlayer 
        name={player}
        points={this.calculatePoints(id)}
        handleUpdatePlayerName={this.props.handleUpdatePlayerName}
        players={this.props.players}
        id={id}
        key={id}
      />
    );
    return (
      <Grid item xs={12}>
      <Grid container>
        {players}
      </Grid>
    </Grid>
    )
  }
}

export default Score;