import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_VIDEOS, GET_RELATED_VIDEOS, ADD_VIDEO_TO_HISTORY, UPDATE_VIDEO } from './constants';
import { setVideos, setRelatedVideos } from './actions';
import * as fetch from '../utils/fetch';
import { User } from '../User/model';
import { Video } from './model';
import { logout } from '../Auth/actions';

// const url: string = 'https://ifyuionwk9.execute-api.us-west-1.amazonaws.com/dev/video';
const url: string = 'http://localhost:3030/video';
const relatedVideosUrl: string = 
  'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAuaxL8IrHIvVIdqpiLRaHCFBCIS8zWP8A';

export function* addVideo(action: {type: string, payload: {user: User, video: Video}}) {
  try {
    yield call(fetch.post, url, {userId: action.payload.user.id, ...action.payload.video});
  } catch (err) {
    console.log(err);
    yield put(logout());
  }
}

export function* getVideos(action: {type: string,
     payload: {user: User, flagged?: boolean}}) {
  try {
    const flaggedVal = action.payload.flagged ? 1 : 0;
    const getUrl = action.payload.flagged !== undefined ? 
                   `${url}?user=${action.payload.user.id}&flagged=${flaggedVal}` :
                   `${url}?user=${action.payload.user.id}`;
    const videos = yield call(fetch.get, getUrl);
    yield put(setVideos({videos: videos}));
  } catch (err) {
    console.log(err);
    yield put(logout());
  }
}

export function* getRelatedVideos(action: {type: string,
    payload: {videoId: string}}) {
    try {
      const getUrl = 
        `${relatedVideosUrl}&relatedToVideoId=${action.payload.videoId}&type=video&maxResults=25`;
      const videos = yield call(fetch.get, getUrl);
      yield put(setRelatedVideos({videos: videos}));
    } catch (err) {
      console.log(err);
      yield put(logout());
    }
  }

export function* updateVideo(action: {type: string, payload: {video: Video}}) {
  try {
    yield call(fetch.update, url, action.payload.video);
  } catch (err) {
    console.log(err);
    yield put(logout());
  }
}

// watcher Saga: spawn a new addVideo task on each ADD_VIDEO_TO_HISTORY
export function* watchAddVideo(): any {
  yield takeEvery(ADD_VIDEO_TO_HISTORY, addVideo);
}

// watcher Saga: spawn a new getVideos task on each GET_VIDEOS
export function* watchGetVideos(): any {
  yield takeEvery(GET_VIDEOS, getVideos);
}

// watcher Saga: spawn a new getVideos task on each GET_RELATED_VIDEOS
export function* watchGetRelatedVideos(): any {
  yield takeEvery(GET_RELATED_VIDEOS, getRelatedVideos);
}

// watcher Saga: spawn a new getUsers task on each UPDATE_VIDEO
export function* watchUpdateVideo(): any {
  yield takeEvery(UPDATE_VIDEO, updateVideo);
}

function* videosSaga() {
  yield [
    watchAddVideo(),
    watchGetVideos(),
    watchGetRelatedVideos(),
    watchUpdateVideo()
  ];
}

export default videosSaga;
