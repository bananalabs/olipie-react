import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from '.';
import Header from '../Header';
import { SET_MODE, SET_ACCOUNT, SET_USER, Mode } from './constants';
import { setMode, setAccount, setUser } from './actions';
import appReducer, { initialState } from './reducer';

test('<App />', () => {
    it('should render a Header', () => {
      const props = {mode: 0, dispatch: () => {}};
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.find(Header)).toHaveLength(1);
    });
});

test('Action SET_MODE should return the correct type', () => {
  const expectedResult = {
      type: SET_MODE,
      payload: {mode: Mode.Watch}
  };
  expect(setMode({mode: Mode.Watch})).toEqual(expectedResult);
});

test('Action SET_ACCOUNT should return the correct type', () => {
  const expectedResult = {
      type: SET_ACCOUNT,
      payload: {accountId: '100'}
  };
  expect(setAccount({accountId: '100'})).toEqual(expectedResult);
});

test('Action SET_USER should return the correct type', () => {
  const user = {
    id: '1',
    name: 'User1',
    profileColor: 'red',
    admin: false,
    kid: false
  };
  const expectedResult = {
      type: SET_USER,
      payload: {user: user}
  };
  expect(setUser({user: user})).toEqual(expectedResult);
});

test('Reducer should handle the setMode action correctly', () => {
  const expectedResult = {...initialState, mode: Mode.Monitor}; 
  const actual = appReducer(initialState, setMode({mode: Mode.Monitor}));
  expect(actual).toEqual(expectedResult);
});

test('Reducer should handle the setAccount action correctly', () => {
  const expectedResult = {...initialState, account: '1'}; 
  const actual = appReducer(initialState, setAccount({accountId: '1'}));
  expect(actual).toEqual(expectedResult);
});

test('Reducer should handle the setUser action correctly', () => {
  const user = {
    id: '1',
    name: 'User1',
    profileColor: 'red',
    admin: false,
    kid: false
  };
  const expectedResult = {...initialState, currentUser: user}; 
  const actual = appReducer(initialState, setUser({user: user}));
  expect(actual).toEqual(expectedResult);
});