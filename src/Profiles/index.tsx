import * as React from 'react';
import Avatar from '../Avatar';
import { Props as AvatarProps } from '../Avatar';
import './Profiles.css';
import { connect } from 'react-redux';
import { User, selectUsers } from '../User/model';
import { createStructuredSelector }  from 'reselect';
import { AppState } from '../App/model';

export interface Props {
    users: User[];
}

export class Profiles extends React.Component<Props, {}> {

  renderUsers(users: User[]) {
    return users.map((user: User) => {
      const props: AvatarProps = {
        name: user.name,
        color: user.profileColor,
        small: false,
        showName: true
      };
      return <div key={user.name} className="avatar"><Avatar {...props}/></div>;
    });
  }

  renderPlus() {
    const props: AvatarProps = {
      name: '+',
      color: 'gray',
      small: false,
      showName: false
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
  users: selectUsers()
}) as any;

export default connect(mapStateToProps)(Profiles);