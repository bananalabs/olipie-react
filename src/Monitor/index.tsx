// this is a container
// props - user, user's video history
// Render Videos with callback to monitor

import * as React from 'react';
import Avatar from '../Avatar';
import { Props as AvatarProps } from '../Avatar';
import './Monitor.css';
import { connect } from 'react-redux';
import { User, selectUsers } from '../User/model';
import { createStructuredSelector }  from 'reselect';
import { AppState, selectAccount } from '../App/model';
import { setMode, setCurrentUser } from '../App/actions';
import Videos from '../Videos';
import { getVideos, updateVideo, setVideos } from '../Videos/actions';
import { Video, selectVideos } from '../Videos/model';
import { Mode } from '../App/constants';

export interface Props {
    accountId: string;
    users: User[];
    videos: Video[];
    dispatch: (action: any) => void;
    history: any;
}

export interface State {
    flagVideos: boolean;
}

export class Monitor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this._monitor = this._monitor.bind(this);
    this._flag = this._flag.bind(this);
    this.state = {
        flagVideos: false
    };
  }

  componentDidMount() {
    this.props.dispatch(setVideos({videos: []}));
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({flagVideos: this.state.flagVideos});
  }

  _flag(video: Video, flagged: boolean) {
      this.props.dispatch(updateVideo({video: {...video, flagged: flagged}}));
  }

  _monitor(user: User) {
    this.props.dispatch(setCurrentUser({user: user}));
    this.props.dispatch(setMode({mode: Mode.Monitor}));
    this.props.dispatch(getVideos({user: user}));
    this.setState({flagVideos: true});
  }

  renderUsers(users: User[]) {
    return users.filter((user) => {
      return user.kid == true;
    }).map((user) => {
      const props: AvatarProps = {
        user: user,
        small: false,
        showName: true,
        onClick: this._monitor
      };
      return <div key={user.name} className="monitor-avatar"><Avatar {...props}/></div>;
    });
  }

  render() {
      const display: any = 
      this.state.flagVideos ?
      <Videos videos={this.props.videos} onFlag={this._flag} /> :
      (
        <div>
          <h2 className="monitor-caption">Who would you like to monitor?</h2>
          <div className="monitor-container">
              <div className="monitor-icons">
                  {this.props.users && this.renderUsers(this.props.users)}
              </div>
          </div>
        </div>
      );
      return display;
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
  users: selectUsers(),
  videos: selectVideos()
}) as any;

export default connect(mapStateToProps)(Monitor);