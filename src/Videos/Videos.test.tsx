import * as React from 'react';
import { shallow } from 'enzyme';
import Videos from '.';
import { Video } from './model';
import { GET_VIDEOS, SET_VIDEOS, ADD_VIDEO_TO_HISTORY } from './constants';
import { getVideos, setVideos, addVideoToHistory } from './actions';
import { addVideo, getVideos as getVideosSaga } from './sagas';
import reducer from './reducer';
import { Props } from '.';
import YouTube from 'react-youtube';
import FlatButton from 'material-ui/FlatButton';
import { User } from '../User/model';
import { call } from 'redux-saga/effects';
import * as fetch from '../utils/fetch';

const url: string = 'http://localhost:3030/video';

test('renders YouTube videos', () => {
    const props: Props = {videos: [
        {id: '2g811Eo7K8U', flagged: false}, 
        {id: '2g811Eo7K8U', flagged: true}
    ]};
    const wrapper = shallow(<Videos {...props} />);
    const videos = wrapper.find(YouTube);
    const video = videos.get(0);
    expect(videos).toHaveLength(2);
    expect(video.props.videoId).toEqual('2g811Eo7K8U');
});

test('renders flag button if flag callback is in props', () => {
    const props: Props = {
      videos: [{id: '2g811Eo7K8U', flagged: false}],
      flag: (video: Video) => {}
    };
    const wrapper = shallow(<Videos {...props} />);
    expect(wrapper.find(FlatButton)).toHaveLength(1);
});

test('does not render flag button if flag callback is not in props', () => {
    const props: Props = {
        videos: [{id: '2g811Eo7K8U', flagged: false}],
    };
    const wrapper = shallow(<Videos {...props} />);
    expect(wrapper.find(FlatButton)).toHaveLength(0);
});

test('Action SET_VIDEOS should return the correct type', () => {
    const videos: Video[] = [];
    const expectedResult = {
        type: SET_VIDEOS,
        videos: videos
    };
    expect(setVideos(videos)).toEqual(expectedResult);
});

test('Action GET_VIDEOS should return the correct type', () => {
    const user: User = {id: '1', name: 'U1', profileColor: 'red', admin: false, kid: false};
    const expectedResult = {
        type: GET_VIDEOS,
        user: user
    };
    expect(getVideos(user)).toEqual(expectedResult);
});

test('Reducer should handle the setVideos action correctly', () => {
    const videos = [{
        id: '1',
        flagged: true
    }];
    const expectedResult = videos; 
    const actual = reducer([] as Video[], setVideos(videos));
    expect(actual).toEqual(expectedResult);
  });

test('Action ADD_VIDEO_TO_HISTORY should return the correct type', () => {
    const video: Video = {id: '1', flagged: false};
    const user: User = {id: '1', name: 'U1', profileColor: 'blue', admin: false, kid: true};
    const expectedResult = {
        type: ADD_VIDEO_TO_HISTORY,
        user: user,
        video: video
    };
    expect(addVideoToHistory(user, video)).toEqual(expectedResult);
});

test('addVideo saga should invoke fetch.post', () => {
    const video: Video = {id: '1', flagged: false};
    const user: User = {id: '1', name: 'U1', profileColor: 'blue', admin: false, kid: true};
    const gen = addVideo({type: ADD_VIDEO_TO_HISTORY, user: user, video: video});
    expect(gen.next().value).toEqual(call(fetch.post, url, {userId: user.id, ...video}));
});

test('getVideos saga should invoke fetch.get', () => {
    const user: User = {id: '1', name: 'U1', profileColor: 'blue', admin: false, kid: true};
    const gen = getVideosSaga({type: GET_VIDEOS, user: user});
    expect(gen.next().value).toEqual(call(fetch.get, `${url}?user=${user.id}`));
});