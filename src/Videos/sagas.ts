import { call, takeEvery } from 'redux-saga/effects';
import { ADD_VIDEO_TO_HISTORY } from './constants';
import * as fetch from '../utils/fetch';
import { User } from '../User/model';
import { Video } from './model';

const url: string = 'http://localhost:3030/video';

export function* addVideo(action: {type: string, user: User, video: Video}) {
  try {
    yield call(fetch.post, url, {userId: action.user.id, ...action.video});
  } catch (err) {
    console.log(err);
  }
}

// watcher Saga: spawn a new getUsers task on each ADD_VIDEO_TO_HISTORY
export function* watchAddVideo(): any {
  yield takeEvery(ADD_VIDEO_TO_HISTORY, addVideo);
}

function* videosSaga() {
  yield [
    watchAddVideo()
  ];
}

export default videosSaga;
