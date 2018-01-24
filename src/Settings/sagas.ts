import { put, call, takeEvery } from 'redux-saga/effects';
import { SET_FILTER, UPDATE_FILTER } from './constants';
import { setFilterSuccess } from './actions';
import * as fetch from '../utils/fetch';

const url: string = 'http://localhost:3030/filter';

function* setFilter(action: {type: string, payload: {accountId: string, keywords: string}}) {
  try {
    yield call(fetch.post, url, {
      accountId: action.payload.accountId,
      keywords: action.payload.keywords}
    );
    yield put(setFilterSuccess({keywords: action.payload.keywords}));
  } catch (err) {
    console.log(err);
  }
}

function* updateFilter(action: {type: string, 
  payload: {accountId: string, keywords: string}}) {
  try {
    const filter = yield call(
      fetch.get, 
      url + '?accountId=' + encodeURIComponent(action.payload.accountId), 
      {keywords: action.payload.keywords});
    yield call(
        fetch.update, 
        `${url}/${filter[0].id}`, 
        {keywords: action.payload.keywords});
    yield put(setFilterSuccess({keywords: action.payload.keywords}));
  } catch (err) {
    console.log(err);
  }
}

// watcher Saga: spawn a new setFilter task on each SET_FILTER
export function* watchSetFilter(): any {
  yield takeEvery(SET_FILTER, setFilter);
}

// watcher Saga: spawn a new updateFilter task on each UPDATE_FITLER
export function* watchUpdateFilter(): any {
  yield takeEvery(UPDATE_FILTER, updateFilter);
}

function* settingsSaga() {
  yield [
    watchSetFilter(),
    watchUpdateFilter()
  ];
}

export default settingsSaga;
