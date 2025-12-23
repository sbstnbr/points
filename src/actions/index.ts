import * as types from '../constants/actionTypes';

export const playerAdd = (name = 'Bro') => ({
  type: types.PLAYER_ADD,
  name,
});

export const playerUpdate = (id: number, name: string) => ({
  type: types.PLAYER_UPDATE,
  id,
  name,
});

export const roundScopaAdd = () => ({
  type: types.ROUND_SCOPA_ADD,
});
export const roundScopaPointAdd = (roundId: number, playerId: number) => ({
  type: types.ROUND_SCOPA_POINT_ADD,
  roundId,
  playerId,
});
export const roundScopaReset = (roundId: number, playerId: number) => ({
  type: types.ROUND_SCOPA_RESET,
  roundId,
  playerId,
});

export const firstPlayerIdToServe = (playerId: number) => ({
  type: types.FIRST_PLAYER_ID_TO_SERVE_SET,
  playerId,
});

export const roundWistAdd = () => ({
  type: types.ROUND_WIST_ADD,
});
export const roundWistBetsIncrease = (roundId: number, playerId: number) => ({
  type: types.ROUND_WIST_BETS_INCREASE,
  roundId,
  playerId,
});
export const roundWistBetsDecrease = (roundId: number, playerId: number) => ({
  type: types.ROUND_WIST_BETS_DECREASE,
  roundId,
  playerId,
});
export const roundWistDonesInit = (roundId: number) => ({
  type: types.ROUND_WIST_DONES_INIT,
  roundId,
});
export const roundWistDonesIncrease = (roundId: number, playerId: number) => ({
  type: types.ROUND_WIST_DONES_INCREASE,
  roundId,
  playerId,
});
export const roundWistDonesDecrease = (roundId: number, playerId: number) => ({
  type: types.ROUND_WIST_DONES_DECREASE,
  roundId,
  playerId,
});
export const roundWistActiveStepSwitch = (roundId: number, step: number) => ({
  type: types.ROUND_WIST_ACTIVE_STEP_SWITCH,
  roundId,
  step,
});

export const roundMtgAdd = () => ({
  type: types.ROUND_MTG_ADD,
});

export const roundMtgLifeIncrease = (roundId: number, playerId: number, amount: number = 1) => ({
  type: types.ROUND_MTG_LIFE_INCREASE,
  roundId,
  playerId,
  amount,
});

export const roundMtgLifeDecrease = (roundId: number, playerId: number, amount: number = 1) => ({
  type: types.ROUND_MTG_LIFE_DECREASE,
  roundId,
  playerId,
  amount,
});

export const roundMtgLifeSet = (roundId: number, playerId: number, life: number) => ({
  type: types.ROUND_MTG_LIFE_SET,
  roundId,
  playerId,
  life,
});

export const roundMtgReset = (roundId: number) => ({
  type: types.ROUND_MTG_RESET,
  roundId,
});
