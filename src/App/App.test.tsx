import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from '.';
import Header from '../Header';
import { SET_MODE, SET_CURRENT_ACCOUNT, SET_CURRENT_USER, Mode } from './constants';
import { setMode, setCurrentAccount, setCurrentUser } from './actions';
import appReducer, { initialState } from './reducer';

test('<App />', () => {
    it('should render a Header', () => {
      const props = {mode: 0, dispatch: () => {}, history: {}};
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.find(Header)).toHaveLength(1);
    });
});

test('Action SET_MODE should return the correct type', () => {
  const expectedResult = {
      type: SET_MODE,
      payload: {mode: Mode.Adult}
  };
  expect(setMode({mode: Mode.Adult})).toEqual(expectedResult);
});

test('Action SET_ACCOUNT should return the correct type', () => {
  const expectedResult = {
      type: SET_CURRENT_ACCOUNT,
      payload: {accountId: '100'}
  };
  expect(setCurrentAccount({accountId: '100'})).toEqual(expectedResult);
});

test('Action SET_CURRENT_USER should return the correct type', () => {
  const user = {
    id: '1',
    name: 'User1',
    profileColor: 'red',
    admin: false,
    kid: false
  };
  const expectedResult = {
      type: SET_CURRENT_USER,
      payload: {user: user}
  };
  expect(setCurrentUser({user: user})).toEqual(expectedResult);
});

test('Reducer should handle the setMode action correctly', () => {
  const expectedResult = {...initialState, mode: Mode.Adult}; 
  const actual = appReducer(initialState, setMode({mode: Mode.Adult}));
  expect(actual).toEqual(expectedResult);
});

test('Reducer should handle the setCurrentAccount action correctly', () => {
  const expectedResult = {...initialState, account: '1'}; 
  const actual = appReducer(initialState, setCurrentAccount({accountId: '1'}));
  expect(actual).toEqual(expectedResult);
});

test('Reducer should handle the setCurrentUser action correctly', () => {
  const user = {
    id: '1',
    name: 'User1',
    profileColor: 'red',
    admin: false,
    kid: false
  };
  const expectedResult = {...initialState, currentUser: user}; 
  const actual = appReducer(initialState, setCurrentUser({user: user}));
  expect(actual).toEqual(expectedResult);
});