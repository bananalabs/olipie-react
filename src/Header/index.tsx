import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Nav from '../Nav';
import { User, selectUsers } from '../User/model';
import { Mode } from '../App/constants';
import Avatar from '../Avatar';
import Search from '../Search';
import { AppState, selectMode, selectCurrentUser } from '../App/model';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getVideos } from '../Search/actions';
import { getVideos as getHistory } from '../Videos/actions';
import './Header.css';

export interface Props {
  mode: Mode;
  user: User;
  users: User[];
  dispatch: (action: any) => void;
  history: any;
}

export interface State {
}

const styles = {
  search: {
    position: 'absolute',
    marginLeft: '40%',
    marginTop: '8px'
  }
};

export class Header extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this._onSearch = this._onSearch.bind(this);
    this._onTitleClick = this._onTitleClick.bind(this);
    this._onMonitorClick = this._onMonitorClick.bind(this);
    this._onAvatarClick = this._onAvatarClick.bind(this);
  }

  _onSearch(val: string): void {
    this.props.dispatch(getVideos(val));
  }

  _onTitleClick(event: object): void {
    this.props.history.push('/');
  }

  _onMonitorClick(): void {
    console.log('');
  }

  _onAvatarClick(user: User): void {
    this.props.dispatch(getHistory({user: user, flagged: false}));
  }

  render() {
    switch (this.props.mode) {
      case Mode.Default:
      case Mode.NewUser:
        return(
          <AppBar
            title={<a href="/" className="title">Olipie</a>}
            onTitleTouchTap={this._onTitleClick}
            showMenuIconButton={false}
            iconElementRight={<Nav users={this.props.users} onMonitor={this._onMonitorClick}/>}
          />
        );
      case Mode.Watch:
        return (
          <AppBar
            title={<a href="/" className="title">Olipie</a>}
            onTitleTouchTap={this._onTitleClick}
            showMenuIconButton={false}
            iconElementRight={
              <Avatar
                user={this.props.user}
                small={true}
                showName={false}
                onClick={this._onAvatarClick}
              />
            }
          >
            <Search
             style={styles.search}
             search={this._onSearch}
            />
          </AppBar>
        );
      case Mode.Monitor:
        return(
          <AppBar
            title={<a href="/" className="title">Olipie</a>}
            onTitleTouchTap={this._onTitleClick}
            showMenuIconButton={false}
            iconElementRight={
              <div style={{display: 'inline-block'}}>
                <span style={{float: 'left', marginRight: '10px'}}>
                  <Nav users={this.props.users} onMonitor={this._onMonitorClick}/>
                </span>
                <span style={{float: 'left'}}>
                  <Avatar
                    user={this.props.user}
                    small={true}
                    showName={false}
                  />
                </span>
              </div>}
          />
        );
      default:
        // console.debug('Invalid Mode passed to Header - ' + this.props.mode);
        return (
          <div/>
        );
    }
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  mode: selectMode(),
  users: selectUsers(),
  user: selectCurrentUser()
}) as any;

export default connect(mapStateToProps)(Header);