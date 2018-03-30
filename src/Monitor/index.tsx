import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { AppState } from '../App/model';
import Videos from '../Videos';
import { updateVideo, setVideos } from '../Videos/actions';
import { Video, selectVideos } from '../Videos/model';

export interface Props {
    videos: Video[];
    dispatch: (action: any) => void;
}

export class Monitor extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._flag = this._flag.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(setVideos({videos: []}));
  }

  _flag(video: Video, flagged: boolean) {
      this.props.dispatch(updateVideo({video: {...video, flagged: flagged}}));
  }

  render() {
      return (
        <Videos videos={this.props.videos} onFlag={this._flag} />
      );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  videos: selectVideos()
}) as any;

export default connect(mapStateToProps)(Monitor);