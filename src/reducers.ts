/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.ts, reducers wouldn't be hot reloadable.
 */

import { combineReducers, ReducersMapObject } from 'redux';
// import appReducer from './containers/App/reducer';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: ReducersMapObject) {
  return combineReducers(Object.assign({}, asyncReducers, {
    // app: appReducer
  }));
}
