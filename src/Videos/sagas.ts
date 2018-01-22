import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_VIDEOS, ADD_VIDEO_TO_HISTORY } from './constants';
import { setVideos } from './actions';
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

export function* getVideos(action: {type: string, user: User}) {
  try {
    const videos = yield call(fetch.get, `${url}?user=${action.user.id}`);
    yield put(setVideos(videos));
  } catch (err) {
    console.log(err);
  }
}

// watcher Saga: spawn a new getUsers task on each ADD_VIDEO_TO_HISTORY
export function* watchAddVideo(): any {
  yield takeEvery(ADD_VIDEO_TO_HISTORY, addVideo);
}

// watcher Saga: spawn a new getUsers task on each ADD_VIDEO_TO_HISTORY
export function* watchGetVideos(): any {
  yield takeEvery(GET_VIDEOS, getVideos);
}

function* videosSaga() {
  yield [
    watchAddVideo(),
    watchGetVideos()
  ];
}

export default videosSaga;
