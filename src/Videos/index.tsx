
import * as React from 'react';
import './Videos.css';
import YouTube from 'react-youtube';
import FlatButton from 'material-ui/FlatButton';
import FlagIcon from 'material-ui/svg-icons/av/not-interested';
import { fullWhite } from 'material-ui/styles/colors';
import { Video } from './model';

export interface Props {
  videos: Video[];
  onFlag?: (video: Video, flagged: boolean) => void;
  onPlay?: (video: Video) => void;
}

class Videos extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this._onReady = this._onReady.bind(this);
  }

  _onReady(event: any) {
    event.target.pauseVideo();
  }

  renderVideos() {
    const videos = this.props.videos;
    const opts = {
      width: '100%',
      height: '50%',
      playsinline: false,
      playerVars: {rel: 0}
    };
    return videos.map((video: Video, index: number) => {
      let hover = video.flagged ? 'rgb(0, 188, 212)' : 'red';
      let buttonColor = video.flagged ? 'red' : 'rgb(0, 188, 212)';
      return (
          <div key={video.id}>
            <YouTube
                videoId={video.id}
                opts={opts}
                onReady={this._onReady}
                onPlay={() => { this.props.onPlay({ id: video.id, flagged: false }); }}
            />
            {this.props.onFlag &&
              <div className="monitor">
                  <span className="flag" id={video.id}>
                    <FlatButton
                        backgroundColor={buttonColor}
                        hoverColor={hover}
                        icon={<FlagIcon color={fullWhite}/>}
                        onClick={(event) => {
                          this.props.onFlag(video, !video.flagged);
                        }}
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
