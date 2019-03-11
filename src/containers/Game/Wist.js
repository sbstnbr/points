import React, { useState } from 'react';
import Game from '../../components/game/Game';
import WistRound from '../../components/round/WistRound';
import WistRoundResult from '../../components/round/WistRoundResult';

export default function WistGame() {
  const [rounds, setRounds] = useState([]);
  const [nbPlayers, setNbPlayers] = useState(2);

  const createRound = () => {
    const newRound = {
      id: rounds.length,
      results: [],
      activeStep: 0,
    };
    for (let index = 0; index < nbPlayers; index += 1) {
      newRound.results.push({ playerId: index, bets: 0 });
    }
    return setRounds(rounds.concat([newRound]));
  };

  const increaseNbPlayers = () => setNbPlayers(nbPlayers + 1);

  function increaseBets(roundId, playerId) {
    const newRounds = rounds.slice();
    newRounds[roundId].results[playerId].bets += 1;
    setRounds(newRounds);
  }
  function increaseDones(roundId, playerId) {
    const newRounds = rounds.slice();
    newRounds[roundId].results[playerId].dones += 1;
    setRounds(newRounds);
  }
  function decreaseBets(roundId, playerId) {
    const newRounds = rounds.slice();
    newRounds[roundId].results[playerId].bets -= 1;
    setRounds(newRounds);
  }
  function decreaseDones(roundId, playerId) {
    const newRounds = rounds.slice();
    newRounds[roundId].results[playerId].dones -= 1;
    setRounds(newRounds);
  }
  const increaseFold = (roundId, playerId, activeStep) => () => (activeStep === 0 ? increaseBets(roundId, playerId) : increaseDones(roundId, playerId));
  const decreaseFold = (roundId, playerId, activeStep) => () => (activeStep === 0 ? decreaseBets(roundId, playerId) : decreaseDones(roundId, playerId));

  const switchActiveStep = roundId => step => () => {
    const newRounds = rounds.map((round) => {
      if (round.id === roundId) {
        const updatedRound = { ...round };
        updatedRound.results = round.results.map((result) => {
          if (!result.dones) {
            const updatedResult = { ...result };
            updatedResult.dones = result.bets;
            return updatedResult;
          }
          return result;
        });
        return { ...updatedRound, activeStep: step };
      }
      return round;
    });
    setRounds(newRounds);
  };

  const calculatePoints = (roundId, playerId) => {
    const result = rounds[roundId].results[playerId];
    if (typeof result.bets !== 'undefined' && typeof result.dones !== 'undefined') {
      if (result.bets === result.dones) {
        return 10 + 10 * result.bets;
      }
      return Math.abs(result.bets - result.dones) * 10 * -1;
    }
    return null;
  };

  const calculateTotalPoints = (roundList, playerId) => roundList.map(round => calculatePoints(round.id, playerId)).reduce((a, b) => a + b, 0);

  const allowAddPlayer = rounds.length === 0;

  return (
    <Game
      gameType="Wist"
      createRound={createRound}
      allowAddPlayer={allowAddPlayer}
      calculateTotalPoints={calculateTotalPoints}
      rounds={rounds}
      increaseNbPlayers={increaseNbPlayers}
    >
      {rounds.map(round => (
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