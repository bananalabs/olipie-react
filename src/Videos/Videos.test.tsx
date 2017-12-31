import * as React from 'react';
import { shallow } from 'enzyme';
import Videos from '.';
import { Props } from '.';
import YouTube from 'react-youtube';

test('renders YouTube videos', () => {
    const props: Props = {videos: ['2g811Eo7K8U', '2g811Eo7K8U']};
    const wrapper = shallow(<Videos {...props} />);
    const videos = wrapper.find(YouTube);
    const video = videos.get(0);
    expect(videos).toHaveLength(2);
    expect(video.props.videoId).toEqual('2g811Eo7K8U');
});