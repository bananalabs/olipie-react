import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_USERS, ADD_USER } from './constants';
import { getUsersSuccess, addUserSuccess } from './actions';
import * as fetch from '../utils/fetch';
import { User } from './model';

const url: string = 'http://localhost:3030/user';

export function* getUsers(action: {type: string, accountId: string}) {
  try {
    const users = yield call(fetch.get, `${url}?accountId=${action.accountId}`);
    yield put(getUsersSuccess(users));
  } catch (err) {
    console.log(err);
  }
}

export function* addUser(action: {type: string, user: User}) {
  try {
    const user = yield call(fetch.post, url, action.user);
    yield put(addUserSuccess(user));
  } catch (err) {
    console.log(err);
  }
}

// watcher Saga: spawn a new getUsers task on each GET_USERS
export function* watchGetUsers(): any {
  yield takeEvery(GET_USERS, getUsers);
}


// watcher Saga: spawn a new getUsers task on each ADD_USER
export function* watchAddUser(): any {
  yield takeEvery(ADD_USER, addUser);
}

function* userSaga() {
  yield [
    watchGetUsers(),
    watchAddUser()
  ];
}

export default userSaga;
