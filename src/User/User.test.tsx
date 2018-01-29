import {
    GET_USERS,
    GET_USERS_SUCCESS,
    ADD_USER,
    ADD_USER_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS
} from './constants';
import { getUsers,
         getUsersSuccess,
         addUser,
         addUserSuccess,
         updateUser,
         updateUserSuccess} from './actions';
import { userReducer } from './reducer';
import { User } from './model';
import {
    addUser as addUserSaga,
    getUsers as getUsersSaga,
    updateUser as updateUserSaga
} from './sagas';
import * as fetch from '../utils/fetch';
import { put, call } from 'redux-saga/effects';

const url: string = 'http://localhost:3030/user';

test('Action GET_USERS should return the correct type', () => {
    const expectedResult = {
        type: GET_USERS,
        payload: {accountId: '1'}    
    };
    expect(getUsers({accountId: '1'})).toEqual(expectedResult);
});

test('Action GET_USERS_SUCCESS should return the correct type', () => {
    const users = [{
        id: '1',
        name: 'User1',
        profileColor: 'red',
        kid: false,
        admin: true
    }];
    const expectedResult = {
        type: GET_USERS_SUCCESS,
        payload: {users: users}
    };
    expect(getUsersSuccess({users: users})).toEqual(expectedResult);
});

test('Action ADD_USER should return the correct type', () => {
    const expectedResult = {
        type: ADD_USER,
        payload: {
            accountId: '1',
            user: {}
        }
    };
    expect(addUser({accountId: '1', user: {} as User})).toEqual(expectedResult);
});

test('Action UPDATE_USER should return the correct type', () => {
    const user = {
        id: '1',
        name: 'User1',
        profileColor: 'red',
        kid: false,
        admin: true
    }
    const expectedResult = {
        type: UPDATE_USER,
        payload: {
            user: user
        }
    };
    expect(updateUser({user: user})).toEqual(expectedResult);
});

test('Action ADD_USER_SUCCESS should return the correct type', () => {
    const user = {
        id: '1',
        name: 'User1',
        profileColor: 'red',
        kid: false,
        admin: true
    };
    const expectedResult = {
        type: ADD_USER_SUCCESS,
        payload: {user: user}
    };
    expect(addUserSuccess({user: user})).toEqual(expectedResult);
});

test('Reducer should handle the getUsersSuccess action correctly', () => {
    const users = [{
        id: '1',
        name: 'User1',
        profileColor: 'red',
        kid: false,
        admin: true
    }];
    const expectedResult = users; 
    const actual = userReducer([] as User[], addUserSuccess({user: users[0]}));
    expect(actual).toEqual(expectedResult);
  });

test('Reducer should handle the updateUserSuccess action correctly', () => {
    const users = [{
        id: '1',
        name: 'User1',
        profileColor: 'red',
        kid: false,
        admin: true
    }, {
        id: '2',
        name: 'User2',
        profileColor: 'blue',
        kid: true,
        admin: false
    }];
    const expectedResult = [{
        id: '1',
        name: 'User1',
        profileColor: 'red',
        kid: false,
        admin: true
    }, {
        id: '2',
        name: 'User2',
        profileColor: 'green',
        kid: true,
        admin: false
    }];
    const updatedUser = {...users[1], profileColor: 'green'};
    const actual = userReducer(users, updateUserSuccess({user: updatedUser}));
    expect(actual).toEqual(expectedResult);
  });

test('addUser saga should invoke fetch.post and dispatch success action', () => {
    const user: any = {
        name: 'Test User',
        profileColor: 'green',
        kid: true,
        admin: false
    };
    const gen = addUserSaga({type: ADD_USER, payload: {accountId: '1', user: user}});
    expect(gen.next().value).toEqual(call(fetch.post, url, {accountId: '1', ...user}));
    expect(gen.next({...user, new: true}).value).toEqual
        (put({type: ADD_USER_SUCCESS, payload: {user: user}}));
});

test('updateUser saga should invoke fetch.update and dispatch success action', () => {
    const gen = updateUserSaga({type: UPDATE_USER, payload: {user: {} as User}});
    expect(gen.next().value).toEqual(call(fetch.update, url, {}));
    expect(gen.next({}).value).toEqual(put({type: UPDATE_USER_SUCCESS, payload: {user: {}}}));
});

test('getUsers saga should invoke fetch.get and dispatch success action', () => {
    const gen = getUsersSaga({type: GET_USERS, payload: {accountId: '1'}});
    expect(gen.next().value).toEqual(call(fetch.get, `${url}?accountId=1`));
    expect(gen.next([]).value).toEqual(put({type: GET_USERS_SUCCESS, payload: {users: []}}));
});