import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Nav from '../Nav';
import { User, selectUsers } from '../User/model';
import Search from '../Search';
import { AppState, selectCurrentUser, selectShowSearch } from '../App/model';
import { logout } from '../Auth/actions';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { getVideos } from '../Search/actions';
import { getVideos as getHistory } from '../Videos/actions';
import './Header.css';
import { Link } from 'react-router-dom';
import { setCurrentUser, showSearchBar } from '../App/actions';
import Avatar from '../Avatar';

export interface Props {
  user: User;
  users: User[];
  showSearchBar: boolean;
  dispatch: (action: any) => void;
}

export interface State {
}

const styles = {
  search: {
    position: 'absolute',
    marginLeft: '40%',
    marginTop: '12px'
  }
};

export class Header extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this._onSearch = this._onSearch.bind(this);
    this._onTitleClick = this._onTitleClick.bind(this);
    this._onAvatarClick = this._onAvatarClick.bind(this);
    this._onSignOut = this._onSignOut.bind(this);
  }

  _onSearch(val: string): void {
    this.props.dispatch(getVideos(val));
  }

  _onTitleClick(event: object): void {
    this.props.dispatch(showSearchBar({show: false}));
    this.props.dispatch(setCurrentUser({user: null}));
  }

  _onAvatarClick(user: User): void {
    this.props.dispatch(getHistory({user: user, flagged: false}));
  }

  _onSignOut(): void {
    this.props.dispatch(logout());
  }

  render() {
    return(
          <AppBar
            title={<Link to={`/`} className="header-title" onClick={this._onTitleClick}>Olipie</Link>}
            showMenuIconButton={false}
            iconElementRight={
              <div style={{display: 'inline-block'}}>
                <span style={{float: 'left', marginRight: '10px'}}>
                  {this.props.user ?
                    <Link to={`/watch`} style={{textDecoration: 'none'}}>
                      <Avatar
                        user={this.props.user}
                        small={true}
                        showName={false}
                      />
                    </Link> :
                    <Nav 
                      users={this.props.users}
                      onSignOut={this._onSignOut}
                    />
                  }
                </span>
              </div>}
          >
            {this.props.showSearchBar && 
              <Search
                style={styles.search}
                search={this._onSearch}
              />
            }
          </AppBar>
        );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  users: selectUsers(),
  user: selectCurrentUser(),
  showSearchBar: selectShowSearch()
}) as any;

export default connect(mapStateToProps)(Header);