import React, { useReducer } from 'react';
import Game from '../../components/Game/Game';
import ScopaRound from '../../components/round/ScopaRound';
import { scopa } from '../../reducers';
import * as actions from '../../actions';
import { scopaInitialState } from '../../constants/defaultValues';

export default function ScopaGame() {
  const [state, dispatch] = useReducer(scopa, scopaInitialState);
  const firstPlayerIdToServe = Math.floor(Math.random() * state.players.length);

  const createRound = () => {
    if (state.rounds.length === 0) {
      // TODO: Use effect
      dispatch(actions.firstPlayerIdToServe(firstPlayerIdToServe));
    }
    return dispatch(actions.roundScopaAdd());
  };
  const addPoint = (roundId, playerId) => dispatch(actions.roundScopaPointAdd(roundId, playerId));
  const resetRound = (roundId, playerId) => dispatch(actions.roundScopaReset(roundId, playerId));

  const addPlayer = name => dispatch(actions.playerAdd(name));
  const updatePlayerName = (id, newName) => dispatch(actions.playerUpdate(id, newName));

  const allowAddPlayer = state.rounds.length === 0;
  const calculateTotalPoints = (rounds, i) => rounds.map(round => round.result[i]).reduce((acc, val) => acc + val, 0);

  return (
    <Game
      gameType="Scopa"
      createRound={createRound}
      rounds={state.rounds}
      calculateTotalPoints={calculateTotalPoints}
      allowAddPlayer={allowAddPlayer}
      players={state.players}
      updatePlayerName={updatePlayerName}
      addPlayer={addPlayer}
    >
      {state.rounds.map(round => (
        <ScopaRound
          key={round.id}
          id={round.id}
          result={round.result}
          handleAddPoint={addPoint}
          handleResetRound={resetRound}
          playerIdToServe={round.playerIdToServe}
        />
      ))}
    </Game>
  );
}
