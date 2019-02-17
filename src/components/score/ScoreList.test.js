import React from 'react';

import { shallow } from 'enzyme';
import ScoreList from './ScoreList';

const rounds = [{ id: 1, result: [3, 0] }, { id: 2, result: [5, 0] }];

const score = (
  <ScoreList
    players={[{ id: 0, name: 'Jess' }, { id: 1, name: 'Seb' }]}
    rounds={rounds}
    allowAddPlayer
    handleUpdatePlayerName={() => null}
    handleAddPlayer={() => null}
  />
);

it('renders without crashing', () => {
  shallow(score);
});

it('calculates a player score by summing rounds', () => {
  const wrapper = shallow(score);
  expect(wrapper.instance().calculatePoints(rounds, 0)).toEqual(8);
});