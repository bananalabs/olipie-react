import * as React from 'react';
import Avatar from '../Avatar';
import { Props as AvatarProps } from '../Avatar';
import './Profiles.css';
import { connect } from 'react-redux';
import { User, selectUsers } from '../User/model';
import { addUser } from '../User/actions';
import { createStructuredSelector }  from 'reselect';
import { AppState, selectAccount } from '../App/model';
import { setCurrentUser, showSearchBar } from '../App/actions';
import { getVideos } from '../Videos/actions';

export interface Props {
    accountId: string;
    users: User[];
    monitor: boolean;
    dispatch: (action: any) => void;
    history: any;
}

export class Profiles extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._addUser = this._addUser.bind(this);
    this._watch = this._watch.bind(this);
    this._monitor = this._monitor.bind(this);
  }

  _addUser(user: User) {
    this.props.dispatch(addUser({accountId: this.props.accountId, user: user}));
  }

  _watch(user: User) {
    this.props.dispatch(setCurrentUser({user: user}));
    this.props.dispatch(showSearchBar({show: true}));
    this.props.history.push('/watch?history=true');
  }

  _monitor(user: User) {
    this.props.dispatch(setCurrentUser({user: user}));
    this.props.dispatch(showSearchBar({show: false}));
    this.props.dispatch(getVideos({user: user}));
    this.props.history.push('/monitor');
  }

  renderUsers(users: User[]) {
    return users.map((user: User) => {
      const props: AvatarProps = {
        user: user,
        small: false,
        showName: true,
        onClick: this.props.monitor ? this._monitor : this._watch
      };
      return <div key={user.name} className="profiles-avatar"><Avatar {...props}/></div>;
    });
  }

  renderPlus() {
    const props: AvatarProps = {
      small: false,
      showName: false,
      addUser: this._addUser
    };
    return <div key={'plus'} className="profiles-avatar"><Avatar {...props}/></div>;
  }

  render() {
    return (
      <div className="profiles-container">
        <div className="profiles-icons">
            {this.props.users && this.renderUsers(this.props.users)}
            {this.renderPlus()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
  users: selectUsers()
}) as any;

export default connect(mapStateToProps)(Profiles);