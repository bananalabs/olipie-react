import { createSelector } from 'reselect';
import { AppState } from '../App/model';

export type Video = {
    id: string,
    flagged: boolean
};

const selectApp = () => (state: any) => state.app;

export const selectVideos = () => createSelector(
  selectApp(),
  function(app: AppState) {
    return app.videos;
  }
);
