import wist from './wist';
import * as actions from '../../actions';
import { wistInitialState, wistRound } from '../../constants/defaultValues';

const wistStateWithARound = {
  ...wistInitialState,
  rounds: [wistRound(0)],
};

describe('wist rounds reducers', () => {
  it('should have a default state', () => {
    expect(wist(undefined, {})).toEqual(wistInitialState);
  });
  it('should handle ROUND_WIST_ADD', () => {
    const excepted = {
      ...wistInitialState,
      rounds: [wistRound(0)],
    };
    expect(wist(wistInitialState, actions.roundWistAdd())).toEqual(excepted);
  });
  it('should handle ROUND_WIST_BETS_INCREASE', () => {
    const state = { ...wistStateWithARound };
    const excepted = { ...wistInitialState, rounds: [wistRound(0)] };
    excepted.rounds[0].results[1].bets = 1;
    expect(wist(state, actions.roundWistBetsIncrease(0, 1))).toEqual(excepted);
  });
  it('should handle ROUND_WIST_BETS_DECREASE', () => {
    const state = { ...wistStateWithARound };
    const excepted = { ...wistInitialState, rounds: [wistRound(0)] };
    excepted.rounds[0].results[1].bets = -1;
    expect(wist(state, actions.roundWistBetsDecrease(0, 1))).toEqual(excepted);
  });
  it('should handle ROUND_WIST_DONES_INIT if dones are not defined', () => {
    const state = { ...wistInitialState, rounds: [wistRound(0)] };
    state.rounds[0].results[1].bets = 3;
    const excepted = { ...wistInitialState, rounds: [wistRound(0)] };
    excepted.rounds[0].results[0].dones = 0;
    excepted.rounds[0].results[1].dones = 3;
    excepted.rounds[0].results[1].bets = 3;
    expect(wist(state, actions.roundWistDonesInit(0))).toEqual(excepted);
  });
  it('should handle ROUND_WIST_DONES_INCREASE', () => {
    const state = { ...wistInitialState, rounds: [wistRound(0)] };
    state.rounds[0].results[1].dones = 0;
    const excepted = { ...wistInitialState, rounds: [wistRound(0)] };
    excepted.rounds[0].results[1].dones = 1;
    expect(wist(state, actions.roundWistDonesIncrease(0, 1))).toEqual(excepted);
  });
  it('should handle ROUND_WIST_DONES_DECREASE', () => {
    const state = { ...wistInitialState, rounds: [wistRound(0)] };
    state.rounds[0].results[1].dones = 0;
    const excepted = { ...wistInitialState, rounds: [wistRound(0)] };
    excepted.rounds[0].results[1].dones = -1;
    expect(wist(state, actions.roundWistDonesDecrease(0, 1))).toEqual(excepted);
  });
  it('should handle ROUND_WIST_ACTIVE_STEP_SWITCH', () => {
    const state = { ...wistStateWithARound };
    const excepted = {
      ...wistInitialState,
      rounds: [
        {
          ...wistRound(0),
          activeStep: 1,
        },
      ],
    };
    expect(wist(state, actions.roundWistActiveStepSwitch(0, 1))).toEqual(excepted);
    expect(wist(excepted, actions.roundWistActiveStepSwitch(0, 0))).toEqual(state);
  });
});
