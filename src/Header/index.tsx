import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Nav from '../Nav';
import { User } from '../User/model';
import { Mode } from '../App/constants';
import Avatar from '../Avatar';
import Search from '../Search';
import { AppState, selectMode, selectCurrentUser } from '../App/model';
import { setMode } from '../App/actions';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getVideos } from '../Search/actions';

export interface Props {
  mode: Mode;
  user: User;
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
  }

  _onSearch(val: string): void {
    this.props.dispatch(getVideos(val));
  }

  _onTitleClick(event: object): void {
    (this.context).router.push('/');
  }

  _onMonitorClick(): void {
    this.props.dispatch(setMode(Mode.Monitor));
  }

  render() {
    const users: any = [
      {name: 'Nayan', profileColor: 'blue'},
      {name: 'Pranav', profileColor: 'red'}
    ];
    switch (this.props.mode) {
      case Mode.Default:
      case Mode.NewUser:
        return(
          <AppBar
            title="Olipie"
            onTitleTouchTap={this._onTitleClick}
            showMenuIconButton={false}
            iconElementRight={<Nav users={users} onMonitor={this._onMonitorClick}/>}
          />
        );
      case Mode.Watch:
        return (
          <AppBar
            title="Olipie"
            onTitleTouchTap={this._onTitleClick}
            showMenuIconButton={false}
            iconElementRight={
              <Avatar
                user={this.props.user}
                small={true}
                showName={false}
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
        return (
          <div/>
          /* <AppBar
            title="Olipie"
            showMenuIconButton={false}
            iconElementRight={<div><Nav/><Avatar/></div>}
          /> */
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
  user: selectCurrentUser()
}) as any;

export default connect(mapStateToProps)(Header);