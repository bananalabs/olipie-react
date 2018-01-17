import { User } from '../User/model';
import { Mode } from './constants';
import { createSelector } from 'reselect';
import { Settings } from '../Settings/model';

export type AppState = {
  // auth: AuthState,
  // account: Account,
  // users: Users,
  // videos: Videos,
  // filter: Filter,
  // settings: Settings,
  // search: Search
  mode: Mode,
  account: string,
  users: User[],
  settings: Settings
};

const selectApp = () => (state: any) => state.app;

export const selectMode = () => createSelector(
  selectApp(),
  (app) => app.mode
);

export const selectAccount = () => createSelector(
  selectApp(),
  (app) => app.account
);