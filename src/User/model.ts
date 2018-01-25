import { createSelector } from 'reselect';
import { AppState } from '../App/model';

export type User = {
    id: string,
    name: string,
    profileColor: string,
    kid: boolean,
    admin: boolean
};

export const findUser = function(users: User[], name: string): User {
  return users.find((user: User) => {
    return user.name === name;
  });
};

const selectApp = () => (state: any) => state.app;

export const selectUsers = () => createSelector(
  selectApp(),
  function(app: AppState) {
    return app.users;
  }
);
