import { createSelector } from 'reselect';
import { AppState } from '../App/model';

export type User = {
    id: string,
    name: string,
    profileColor: string,
    kid: boolean,
    admin: boolean
};

const selectApp = () => (state: any) => state.app;

export const selectUsers = () => createSelector(
  selectApp(),
  function(app: AppState) {
    return app.users;
  }
);
