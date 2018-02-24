import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Nav from '../Nav';
import { User, selectUsers } from '../User/model';
import { Mode } from '../App/constants';
import Avatar from '../Avatar';
import Search from '../Search';
import { AppState, selectMode, selectCurrentUser } from '../App/model';
import { logout } from '../Auth/actions';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getVideos } from '../Search/actions';
import { getVideos as getHistory } from '../Videos/actions';
import './Header.css';
import { Link } from 'react-router-dom';
import { setCurrentUser } from '../App/actions';

export interface Props {
  mode: Mode;
  user: User;
  users: User[];
  dispatch: (action: any) => void;
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
    this._onSignOut = this._onSignOut.bind(this);
  }

  _onSearch(val: string): void {
    this.props.dispatch(getVideos(val));
  }

  _onTitleClick(event: object): void {
    this.props.dispatch(setCurrentUser({user: null}));
  }

  _onMonitorClick(): void {
    console.log('');
  }

  _onAvatarClick(user: User): void {
    this.props.dispatch(getHistory({user: user, flagged: false}));
  }

  _onSignOut(): void {
    this.props.dispatch(logout());
  }

  render() {
    switch (this.props.mode) {
      case Mode.Child:
        // search bar & profile icon
        return (
          <AppBar
            title={<Link to={`/`} className="header-title" onClick={this._onTitleClick}>Olipie</Link>}
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
            {this.props.user && 
              <Search
               style={styles.search}
               search={this._onSearch}
              />
            }
          </AppBar>
        );
      case Mode.Adult:
        // search bar, monitor, settings, profile
        return(
          <AppBar
            title={<Link to={`/`} className="header-title" onClick={this._onTitleClick}>Olipie</Link>}
            showMenuIconButton={false}
            iconElementRight={
              <div style={{display: 'inline-block'}}>
                <span style={{float: 'left', marginRight: '10px'}}>
                <Nav 
                  users={this.props.users}
                  onMonitor={this._onMonitorClick}
                  onSignOut={this._onSignOut}
                />
                </span>
                <span style={{float: 'left'}}>
                  <Avatar
                    user={this.props.user}
                    small={true}
                    showName={false}
                  />
                </span>
              </div>}
          >
            {this.props.user && 
              <Search
                style={styles.search}
                search={this._onSearch}
              />
            }
          </AppBar>
        );
      default:
        // just logo
        return (
          <AppBar
            title={<Link to={`/`} className="header-title" onClick={this._onTitleClick}>Olipie</Link>}
            showMenuIconButton={false}
          />
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