
import * as React from 'react';
import './Videos.css';
import YouTube from 'react-youtube';

/* https://www.googleapis.com/youtube/v3/search?q=surfing
                                                &maxResults=25
                                                &part=snippet
                                                &key='AIzaSyAuaxL8IrHIvVIdqpiLRaHCFBCIS8zWP8A'/ */

export interface Props {
  videos: string[];
  flag?: (video: string) => {};
}

class Videos extends React.Component<any, any> {

  constructor(props: {}) {
    super(props);
    this._onReady = this._onReady.bind(this);
  }

  _onReady(event: any) {
    event.target.pauseVideo();
  }

  renderVideos() {
    const self = this;
    const videos = this.props.videos;
    const opts = {width: '100%', height: '50%', playsinline: false};
    return videos.map((video: string, index: number) => {
      return (
            <YouTube
                key={video}
                videoId={video}
                opts={opts}
                onReady={self._onReady}
            />
      );
    });
  }

  render() {
    const videos = this.renderVideos();
    return (
      <div className="container">
          {videos}
      </div>);
  }
}

export default Videos;
