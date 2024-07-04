export const defaultPlayers = [
  {
    id: 0,
    name: '🦊',
  },
  {
    id: 1,
    name: '🐱',
  },
];

export const scopaInitialState = {
  players: defaultPlayers,
  rounds: [],
  firstPlayerIdToServe: 0,
};

export const scopaRound = (id, nbPlayer = 2) => ({
  id,
  results: new Array(nbPlayer).fill(0),
});

export const wistInitialState = {
  players: defaultPlayers,
  rounds: [],
};
export const wistResult = playerId => ({
  playerId,
  bets: 0,
  dones: undefined,
});
export const wistRound = (id, nbPlayer = 2) => ({
  id,
  results: Array.from(Array(nbPlayer).keys()).map(playerId => wistResult(playerId)),
  activeStep: 0,
});
