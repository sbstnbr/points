import { defaultPlayers } from '../constants/defaultValues';
import scopaGame from './game/scopa';
import wistGame from './game/wist';
import mtgGame from './game/mtg';
import players from './players';

const initialState = {
  rounds: [],
  players: defaultPlayers,
};

export const scopa = (state = initialState, action) => ({
  ...scopaGame(state, action),
  players: players(state.players, action),
});

export const wist = (state = initialState, action) => ({
  ...wistGame(state, action),
  players: players(state.players, action),
});

export const mtg = (state = initialState, action) => ({
  ...mtgGame(state, action),
  players: players(state.players, action),
});
