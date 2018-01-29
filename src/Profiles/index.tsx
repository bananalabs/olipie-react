import * as React from 'react';
import Avatar from '../Avatar';
import { Props as AvatarProps } from '../Avatar';
import './Profiles.css';
import { connect } from 'react-redux';
import { User, selectUsers } from '../User/model';
import { addUser } from '../User/actions';
import { createStructuredSelector }  from 'reselect';
import { AppState, selectAccount } from '../App/model';
import { setMode, setCurrentUser } from '../App/actions';
import { Mode } from '../App/constants';

export interface Props {
    accountId: string;
    users: User[];
    dispatch: (action: any) => void;
    history: any;
}

export class Profiles extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._addUser = this._addUser.bind(this);
    this._watch = this._watch.bind(this);
  }

  _addUser(user: User) {
    this.props.dispatch(addUser({accountId: this.props.accountId, user: user}));
  }

  _watch(user: User) {
    this.props.dispatch(setMode({mode: Mode.Watch}));
    this.props.dispatch(setCurrentUser({user: user}));
    this.props.history.push('/watch');
  }

  renderUsers(users: User[]) {
    return users.map((user: User) => {
      const props: AvatarProps = {
        user: user,
        small: false,
        showName: true,
        onClick: this._watch
      };
      return <div key={user.name} className="avatar"><Avatar {...props}/></div>;
    });
  }

  renderPlus() {
    const props: AvatarProps = {
      small: false,
      showName: false,
      addUser: this._addUser
    };
    return <div key={'plus'} className="avatar"><Avatar {...props}/></div>;
  }

  render() {
    return (
      <div className="p-container">
        <div className="icons">
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