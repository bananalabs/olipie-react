import { put, call, takeEvery } from 'redux-saga/effects';
import { ADD_ACCOUNT } from './constants';
import { setCurrentAccount } from '../App/actions';
import { getUsers, addUser } from '../User/actions';
import * as fetch from '../utils/fetch';

const url: string = 'http://localhost:3030/account';

export function* addAccount(action: {type: string, 
  payload: {name: string, email: string, history: any}}) {
  try {
    // Create new/get existing account for signed in user
    const account = yield call(fetch.post, url, {
      name: action.payload.name,
      email: action.payload.email
    });
    // Set currently active account
    yield put(setCurrentAccount({accountId: account.id}));
    // Add/Get admin user for this account
    yield put(addUser({
        accountId: account.id,
        user: {
            name: action.payload.name,
            email: action.payload.email,
            profileColor: 'gray',
            kid: false,
            admin: true
        }
    }));
    yield put(getUsers({
      accountId: account.id,
    }));
    // Add account to local storage
    localStorage.setItem('olipie-account', account.id);
    if (account.new) {
      action.payload.history.push('/setup');
    } else {
      action.payload.history.push('/profiles');
    }
  } catch (err) {
    console.log(err);
  }
}

// watcher Saga: spawn a new addAccount task on each ADD_ACCOUNT
export function* watchAddAccount(): any {
  yield takeEvery(ADD_ACCOUNT, addAccount);
}

function* authSaga() {
  yield [
    watchAddAccount()
  ];
}

export default authSaga;
