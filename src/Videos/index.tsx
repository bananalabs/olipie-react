
import * as React from 'react';
import './Videos.css';
import YouTube from 'react-youtube';
import FlatButton from 'material-ui/FlatButton';
import FlagIcon from 'material-ui/svg-icons/av/not-interested';
import { fullWhite } from 'material-ui/styles/colors';

/* https://www.googleapis.com/youtube/v3/search?q=surfing
                                                &maxResults=25
                                                &part=snippet
                                                &key='AIzaSyAuaxL8IrHIvVIdqpiLRaHCFBCIS8zWP8A'/ */

export interface Props {
  videos: string[];
  flag?: (video: string) => void;
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
    return videos.map((video: string, index: number) => {
      return (
          <div key={video}>
            <YouTube
                videoId={video}
                opts={opts}
                onReady={self._onReady}
            />
            <div className="monitor">
                <span className="name">Cat Falling</span>
                { this.props.flag && 
                  <span className="flag" id={video}>
                    <FlatButton
                        backgroundColor="rgb(0, 188, 212)"
                        hoverColor="red"
                        icon={<FlagIcon color={fullWhite}/>}
                        onClick={self._flag}
                    />
                  </span>
                }
            </div>
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
