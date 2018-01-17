import { createSelector } from 'reselect';

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
  function(app) {
    return app.users;
  }
);
