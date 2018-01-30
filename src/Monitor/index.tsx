// this is a container
// Render Videos with callback to monitor
// This page is restricted to the admin user and requires login

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
import Auth from '../Auth';
import Dialog from 'material-ui/Dialog';

export interface Props {
    accountId: string;
    users: User[];
    videos: Video[];
    dispatch: (action: any) => void;
    history: any;
}

export interface State {
    showLogin: boolean;
    flagVideos: boolean;
}

export class Monitor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this._monitor = this._monitor.bind(this);
    this._flag = this._flag.bind(this);
    this._unlock = this._unlock.bind(this);
    this.state = {
        showLogin: true,
        flagVideos: false
    };
  }

  componentDidMount() {
    this.setState({showLogin: true});
    this.props.dispatch(setVideos({videos: []}));
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({flagVideos: this.state.flagVideos});
  }

  _flag(video: Video, flagged: boolean) {
      this.props.dispatch(updateVideo({video: {...video, flagged: flagged}}));
  }

  _unlock() {
    // Admin user validated, go ahead and show videos
    this.setState({showLogin: false});
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
      return <div key={user.name} className="avatar"><Avatar {...props}/></div>;
    });
  }

  render() {
      const login: any = 
        this.state.showLogin ?
          (
            <Dialog
              modal={true}
              open={this.state.showLogin}
            >
              <Auth done={this._unlock}/>
            </Dialog>
          ) :
          <div/>;
      const display: any = 
        !this.state.showLogin && this.state.flagVideos ?
        <Videos videos={this.props.videos} onFlag={this._flag} /> :
        (
          <div>
            <h2 className="m-caption">Who would you like to monitor?</h2>
            <div className="p-container">
                <div className="icons">
                    {this.props.users && this.renderUsers(this.props.users)}
                </div>
            </div>
          </div>
        );
      return (
        <div>
          {login}
          {display}
        </div>
      );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
  users: selectUsers(),
  videos: selectVideos()
}) as any;

export default connect(mapStateToProps)(Monitor);