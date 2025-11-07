import React, { useReducer } from 'react';
import Game from '../../components/Game/Game';
import WistRound from '../../components/round/WistRound';
import WistRoundResult from '../../components/round/WistRoundResult';
import { wistInitialState } from '../../constants/defaultValues';
import * as actions from '../../actions';
import { wist } from '../../reducers';

export default function WistGame() {
  const [state, dispatch] = useReducer(wist, wistInitialState);

  const createRound = () => dispatch(actions.roundWistAdd());

  const increaseBets = (roundId, playerId) => dispatch(actions.roundWistBetsIncrease(roundId, playerId));
  const decreaseBets = (roundId, playerId) => dispatch(actions.roundWistBetsDecrease(roundId, playerId));
  const increaseDones = (roundId, playerId) => dispatch(actions.roundWistDonesIncrease(roundId, playerId));
  const decreaseDones = (roundId, playerId) => dispatch(actions.roundWistDonesDecrease(roundId, playerId));

  const increaseFold = (roundId, playerId, activeStep) => () => (activeStep === 0 ? increaseBets(roundId, playerId) : increaseDones(roundId, playerId));
  const decreaseFold = (roundId, playerId, activeStep) => () => (activeStep === 0 ? decreaseBets(roundId, playerId) : decreaseDones(roundId, playerId));

  const switchActiveStep = roundId => step => () => {
    dispatch(actions.roundWistDonesInit(roundId));
    return dispatch(actions.roundWistActiveStepSwitch(roundId, step));
  };

  const calculatePoints = (roundId, playerId) => {
    const result = state.rounds[roundId].results[playerId];
    if (typeof result.bets !== 'undefined' && typeof result.dones !== 'undefined') {
      if (result.bets === result.dones) {
        return 10 + 10 * result.bets;
      }
      return Math.abs(result.bets - result.dones) * 10 * -1;
    }
    return null;
  };

  const calculateTotalPoints = (roundList, playerId) => roundList.map(round => calculatePoints(round.id, playerId)).reduce((a, b) => a + b, 0);

  const allowAddPlayer = state.rounds.length === 0;

  const addPlayer = name => dispatch(actions.playerAdd(name));

  const updatePlayerName = (id, name) => dispatch(actions.playerUpdate(id, name));

  return (
    <Game
      gameType="Wist"
      createRound={createRound}
      allowAddPlayer={allowAddPlayer}
      calculateTotalPoints={calculateTotalPoints}
      rounds={state.rounds}
      updatePlayerName={updatePlayerName}
      addPlayer={addPlayer}
      players={state.players}
    >
      {state.rounds.map(round => (
        <WistRound
          key={round.id}
          id={round.id}
          activeStep={round.activeStep}
          handleSwitchActiveStep={switchActiveStep(round.id)}
          handleIncreaseFold={increaseFold}
          handleDecreaseFold={decreaseFold}
        >
          {round.results.map(result => (
            <WistRoundResult
              key={result.playerId}
              folds={round.activeStep === 0 ? result.bets : result.dones}
              playerId={result.playerId}
              points={calculatePoints(round.id, result.playerId)}
              handleIncreaseFold={increaseFold(round.id, result.playerId, round.activeStep)}
              handleDecreaseFold={decreaseFold(round.id, result.playerId, round.activeStep)}
            />
          ))}
        </WistRound>
      ))}
    </Game>
  );
}
