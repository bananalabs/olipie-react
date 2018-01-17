import { createSelector } from 'reselect';

export type Settings = {
    filter: string;
};

const selectApp = () => (state: any) => state.app;

export const selectFilter = () => createSelector(
  selectApp(),
  (app) => app.settings.filter
);
