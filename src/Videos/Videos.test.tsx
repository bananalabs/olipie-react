import * as React from 'react';
import { shallow } from 'enzyme';
import Videos from '.';
import { Props } from '.';
import YouTube from 'react-youtube';
import FlatButton from 'material-ui/FlatButton';

test('renders YouTube videos', () => {
    const props: Props = {videos: ['2g811Eo7K8U', '2g811Eo7K8U']};
    const wrapper = shallow(<Videos {...props} />);
    const videos = wrapper.find(YouTube);
    const video = videos.get(0);
    expect(videos).toHaveLength(2);
    expect(video.props.videoId).toEqual('2g811Eo7K8U');
});

test('renders flag button if flag callback is in props', () => {
    const props: Props = {
      videos: ['2g811Eo7K8U'],
      flag: (video: string) => {}
    };
    const wrapper = shallow(<Videos {...props} />);
    expect(wrapper.find(FlatButton)).toHaveLength(1);
});

test('does not render flag button if flag callback is not in props', () => {
    const props: Props = {
      videos: ['2g811Eo7K8U']
    };
    const wrapper = shallow(<Videos {...props} />);
    expect(wrapper.find(FlatButton)).toHaveLength(0);
});