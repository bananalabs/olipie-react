import * as React from 'react';
import Avatar from '../Avatar';
import { Props as AvatarProps } from '../Avatar';
import './Profiles.css';

export interface User {
    name: string;
    color: string;
}

export interface Props {
    users: User[];
}

export class Profiles extends React.Component<Props, {}> {

  renderUsers(users: User[]) {
    return users.map((user: User) => {
      const props: AvatarProps = {
        name: user.name,
        color: user.color,
        small: false
      };
      return <div key={user.name} className="avatar"><Avatar {...props}/></div>;
    });
  }

  renderPlus() {
    const props: AvatarProps = {
      name: '+',
      color: 'gray',
      small: false
    };
    return <div key={'plus'} className="avatar"><Avatar {...props}/></div>;
  }

  render() {
    return (
      <div className="container">
        <div className="icons">
            {this.renderUsers(this.props.users)}
            {this.renderPlus()}
        </div>
      </div>
    );
  }
}

export default Profiles;
