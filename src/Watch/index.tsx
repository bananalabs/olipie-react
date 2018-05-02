import * as React from 'react';
import { AppState } from '../App/model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import Videos from '../Videos';
import { selectVideos, Video } from '../Videos/model';
import { selectCurrentUser } from '../App/model';
import { addVideoToHistory, getVideos } from '../Videos/actions';
import { User } from '../User/model';
import * as queryString from 'query-string';

export interface Props {
    videos: Video[];
    user: User;
    dispatch: (action: any) => void;
    history: any;
    location: any;
}

export class Watch extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._onPlay = this._onPlay.bind(this);
    // Load user's video history if this page is not triggered by search
    if (queryString.parse(this.props.location.search).history === 'true') {
        this.props.dispatch(getVideos({user: this.props.user, flagged: false}));
    }
  }

  _onPlay(video: Video) {
      this.props.dispatch(addVideoToHistory({user: this.props.user, video: video}));
      this.props.history.push('/play/' + video.id);
  }

  render() {
      return (
          <Videos videos={this.props.videos} onPlay={this._onPlay}/>
      );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
    user: selectCurrentUser(),
    videos: selectVideos()
}) as any;

export default connect(mapStateToProps)(Watch);