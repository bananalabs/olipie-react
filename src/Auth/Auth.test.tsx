import { ADD_ACCOUNT } from './constants';
import { SET_CURRENT_ACCOUNT } from '../App/constants';
import { ADD_USER } from '../User/constants';
import { addAccount } from './actions';
import { addAccount as addAccountSaga } from './sagas';
import * as fetch from '../utils/fetch';
import { put, call } from 'redux-saga/effects';

const url: string = 'http://localhost:3030/account';

test('Action ADD_ACCOUNT should return the correct type', () => {
    const expectedResult = {
        type: ADD_ACCOUNT,
        payload: {name: 'Test User', email: 'test@olipie.com', history: {}}    
    };
    expect(addAccount({name: 'Test User', email: 'test@olipie.com', history: {}})
        ).toEqual(expectedResult);
});

test('addAccount saga should invoke fetch.post and dispatch setCurrentAcount, addUser actions', () => {
    const userInfo = {
        name: 'Test User',
        email: 'test@olipie.com'
    };
    const user = {
        ...userInfo,
        profileColor: 'gray',
        kid: false,
        admin: true
    }
    const gen = addAccountSaga({type: ADD_ACCOUNT, 
                                payload: {...userInfo, history: {}}
                              });
    expect(gen.next().value).toEqual(call(fetch.post, url, {...userInfo, history: {}}));
    expect(gen.next({id: '1'}).value).toEqual(
        put({type: SET_CURRENT_ACCOUNT, payload: {accountId: '1'}}));
    expect(gen.next({accountId: '1', user: user}).value).toEqual(
            put({type: ADD_USER, payload: {accountId: '1', user: user}}));     
});