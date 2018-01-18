import * as React from 'react';
import Avatar from '../Avatar';
import { Props as AvatarProps } from '../Avatar';
import './Profiles.css';
import { connect } from 'react-redux';
import { User, selectUsers } from '../User/model';
import { addUser } from '../User/actions';
import { createStructuredSelector }  from 'reselect';
import { AppState, selectAccount } from '../App/model';

export interface Props {
    accountId: string;
    users: User[];
    dispatch: (action: any) => void;
}

export class Profiles extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._addUser = this._addUser.bind(this);
  }

  renderUsers(users: User[]) {
    return users.map((user: User) => {
      const props: AvatarProps = {
        name: user.name,
        color: user.profileColor,
        small: false,
        showName: true,
        addUser: this._addUser
      };
      return <div key={user.name} className="avatar"><Avatar {...props}/></div>;
    });
  }

  _addUser(user: User) {
    this.props.dispatch(addUser(this.props.accountId, user));
  }

  renderPlus() {
    const props: AvatarProps = {
      name: '+',
      color: 'gray',
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
            {this.renderUsers(this.props.users)}
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