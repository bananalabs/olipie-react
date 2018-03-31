
import * as React from 'react';
import './Videos.css';
import YouTube from 'react-youtube';
import { AppState } from '../App/model';
import { selectRelatedVideos } from './model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getRelatedVideos } from './actions';
import { selectCurrentUser } from '../App/model';
import { User } from '../User/model';
import { addVideoToHistory } from '../Videos/actions';

export interface Props {
  relatedVideos: any[];
  user: User;
  dispatch: any;
  history: any;
  match: any;
}

class Play extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._onPlay = this._onPlay.bind(this);
    this.props.dispatch(getRelatedVideos({videoId: this.props.match.params.id}));
  }

  _onPlay(id: string) {
    this.props.dispatch(addVideoToHistory({
      user: this.props.user, video: {id: id, flagged: false}
    }));
    this.props.history.push('/play/' + id);
  }

  render() {
    const opts = {
      width: '100%',
      height: '100%',
      playsinline: false,
      playerVars: {rel: 0}
    };
    const relatedVideos = this.props.relatedVideos.map((v) => {
      return  (
        <div key={v.id.videoId} className="play-recommended__video">
          <YouTube
            videoId={v.id.videoId}
            opts={opts}
            onPlay={(ev: any) => {
              ev.target.pauseVideo();
              this._onPlay(v.id.videoId);
            }}
          />
        </div>
      );
    });
    return (
      <div className="play">
          <div className="play-video">
            <YouTube 
              videoId={this.props.match.params.id}
              opts={{playerVars: {autoplay: 1, rel: 0}}}
            />
          </div>
          <div className="play-recommended">{relatedVideos}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
    user: selectCurrentUser(),
    relatedVideos: selectRelatedVideos(),
}) as any;

export default connect(mapStateToProps)(Play);
