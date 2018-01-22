
import * as React from 'react';
import './Videos.css';
import YouTube from 'react-youtube';
import FlatButton from 'material-ui/FlatButton';
import FlagIcon from 'material-ui/svg-icons/av/not-interested';
import { fullWhite } from 'material-ui/styles/colors';
import { Video } from './model';

export interface Props {
  videos: Video[];
  flag?: (video: Video) => void;
  onPlay?: (video: Video) => void;
}

class Videos extends React.Component<any, any> {

  constructor(props: {}) {
    super(props);
    this._onReady = this._onReady.bind(this);
    this._flag = this._flag.bind(this);
  }

  _onReady(event: any) {
    event.target.pauseVideo();
  }

  _flag(event: any) {
      this.props.flag(event.target.id);
  }

  renderVideos() {
    const self = this;
    const videos = this.props.videos;
    const opts = {width: '100%', height: '50%', playsinline: false};
    return videos.map((video: Video, index: number) => {
      return (
          <div key={video.id}>
            <YouTube
                videoId={video.id}
                opts={opts}
                onReady={self._onReady}
                onPlay={() => {
                  this.props.onPlay({id: video.id, flagged: false})}
                }
            />
            {this.props.flag &&
              <div className="monitor">
                  <span className="flag" id={video.id}>
                    <FlatButton
                        backgroundColor="rgb(0, 188, 212)"
                        hoverColor="red"
                        icon={<FlagIcon color={fullWhite}/>}
                        onClick={self._flag}
                    />
                  </span>
              </div>
            }
          </div>
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
