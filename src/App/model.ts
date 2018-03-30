import { User } from '../User/model';
import { createSelector } from 'reselect';
import { Settings } from '../Settings/model';
import { Video } from '../Videos/model';

export type AppState = {
  account: string,
  users: User[],
  videos: Video[],
  currentUser: User,
  settings: Settings
};

const selectApp = () => (state: any) => state.app;

export const selectAccount = () => createSelector(
  selectApp(),
  (app) => app.account
);

export const selectCurrentUser = () => createSelector(
  selectApp(),
  (app) => app.currentUser
);