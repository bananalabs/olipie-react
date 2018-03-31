import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { AppState } from '../App/model';
import Videos from '../Videos';
import { updateVideo, setVideos } from '../Videos/actions';
import { Video, selectVideos } from '../Videos/model';
import { selectCurrentUser } from '../App/model';
import { addVideoToHistory } from '../Videos/actions';
import { User } from '../User/model';

export interface Props {
    videos: Video[];
    user: User;
    dispatch: (action: any) => void;
    history: any;
}

export class Monitor extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._flag = this._flag.bind(this);
    this._onPlay = this._onPlay.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setVideos({videos: []}));
  }

  _flag(video: Video, flagged: boolean) {
      this.props.dispatch(updateVideo({video: {...video, flagged: flagged}}));
  }

  _onPlay(video: Video) {
    this.props.dispatch(addVideoToHistory({user: this.props.user, video: video}));
    this.props.history.push('/play/' + video.id);
  }

  render() {
      return (
        <Videos
          videos={this.props.videos}
          onFlag={this._flag}
          onPlay={this._onPlay}
        />
      );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  videos: selectVideos(),
  user: selectCurrentUser()
}) as any;

export default connect(mapStateToProps)(Monitor);