import { put, call, takeEvery, select } from 'redux-saga/effects';
import { GET_VIDEOS } from './constants';
import { Video } from '../Videos/model';
import { setVideos } from '../Videos/actions';
import * as fetch from '../utils/fetch';
import { selectCurrentUser } from '../App/model';
import { selectFilter } from '../Settings/model';

const url: string = 'https://www.googleapis.com/youtube/v3/search?';
const videosUrl: string = 'https://ifyuionwk9.execute-api.us-west-1.amazonaws.com/dev/video';
const params: string = 'maxResults=30&part=snippet&key=AIzaSyAuaxL8IrHIvVIdqpiLRaHCFBCIS8zWP8A';

export function* getVideos(action: {type: string, keywords: string}) {
  try {
    const currentUser = yield select(selectCurrentUser());
    const filter = yield select(selectFilter());
    console.log(filter);
    // Exclude filter keywords from search for kid user
    const exclude = filter.replace(/,/g, ' ').replace(/\s\s+/g, ' ').split(' ').reduce(
        (acc: string, word: string) => `${acc} -${word}`, '');
    console.log(exclude);
    const newParams = currentUser.kid ?
                      `${params}&safeSearch=strict` :
                      params;
    console.log(`${url}q=${action.keywords}${exclude}&${newParams}`);
    console.log(encodeURIComponent(`${url}q=${action.keywords}${exclude}&${newParams}`));
    const results = yield call(fetch.get, `${url}q=${action.keywords}${exclude}&${newParams}`);
    const videos = results.map(
        (video: any) => { return {
            id: video.id.videoId,
            flagged: false,
            title: video.snippet.title }; }
    );
    // Remove flagged videos from search results
    const allVideos: Video[] = yield call(fetch.get, videosUrl);
    const filteredVideos = videos.filter((video: Video) => {
        const videoInHistory: Video = allVideos.find((v) => v.id === video.id);
        return videoInHistory ? videoInHistory.flagged == false : true;
    });
    yield put(setVideos({videos: filteredVideos}));
  } catch (err) {
    console.log(err);
  }
}

// watcher Saga: spawn a new getVideos task on each GET_VIDEOS
export function* watchGetVideos(): any {
    yield takeEvery(GET_VIDEOS, getVideos);
}

function* searchSaga() {
    yield [
        watchGetVideos()
    ];
}
  
export default searchSaga;
  