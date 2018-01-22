import * as React from 'react';
import { AppState } from '../App/model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import Videos from '../Videos';
import { selectVideos, Video } from '../Videos/model';
import { selectCurrentUser } from '../App/model';
import { addVideoToHistory, getVideos } from '../Videos/actions';
import { User } from '../User/model';

export interface Props {
    videos: Video[];
    user: User;
    dispatch: (action: any) => void;
}

export class Watch extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._onPlay = this._onPlay.bind(this);
    this.props.dispatch(getVideos(this.props.user));
  }

  _onPlay(video: Video) {
      this.props.dispatch(addVideoToHistory(this.props.user, video));
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