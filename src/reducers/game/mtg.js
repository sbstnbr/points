import * as types from '../../constants/actionTypes';
import { mtgInitialState, MTG_STARTING_LIFE } from '../../constants/defaultValues';

const initialState = { ...mtgInitialState };

const mtg = (state = initialState, action) => {
  switch (action.type) {
    case types.ROUND_MTG_ADD: {
      return {
        ...state,
        rounds: state.rounds.concat({
          id: state.rounds.reduce((maxId, round) => Math.max(round.id, maxId), -1) + 1,
          results: state.players.map((player, playerId) => ({
            playerId,
            life: state.startingLife || MTG_STARTING_LIFE,
          })),
        }),
      };
    }
    case types.ROUND_MTG_LIFE_INCREASE: {
      const newRounds = state.rounds.map((round) => {
        if (round.id === action.roundId) {
          const newResults = round.results.map((result) => {
            if (result.playerId === action.playerId) {
              return { ...result, life: result.life + (action.amount || 1) };
            }
            return result;
          });
          return { ...round, results: newResults };
        }
        return round;
      });
      return { ...state, rounds: newRounds };
    }
    case types.ROUND_MTG_LIFE_DECREASE: {
      const newRounds = state.rounds.map((round) => {
        if (round.id === action.roundId) {
          const newResults = round.results.map((result) => {
            if (result.playerId === action.playerId) {
              return { ...result, life: result.life - (action.amount || 1) };
            }
            return result;
          });
          return { ...round, results: newResults };
        }
        return round;
      });
      return { ...state, rounds: newRounds };
    }
    case types.ROUND_MTG_LIFE_SET: {
      const newRounds = state.rounds.map((round) => {
        if (round.id === action.roundId) {
          const newResults = round.results.map((result) => {
            if (result.playerId === action.playerId) {
              return { ...result, life: action.life };
            }
            return result;
          });
          return { ...round, results: newResults };
        }
        return round;
      });
      return { ...state, rounds: newRounds };
    }
    case types.ROUND_MTG_RESET: {
      const newRounds = state.rounds.map((round) => {
        if (round.id === action.roundId) {
          const newResults = round.results.map((result) => ({
            ...result,
            life: state.startingLife || MTG_STARTING_LIFE,
          }));
          return { ...round, results: newResults };
        }
        return round;
      });
      return { ...state, rounds: newRounds };
    }
    default:
      return state;
  }
};

export default mtg;

