import * as React from 'react';
import { AppState, selectAccount } from '../App/model';
import { updateUser } from '../User/actions';
import { User, selectUsers, findUser } from '../User/model';
import AddEditForm from './AddEditForm';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import Paper from 'material-ui/Paper';

export interface Props {
  accountId: string;
  users: User[];
  dispatch: (action: any) => void;
  match: any;
}

export class EditUser extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._editUser = this._editUser.bind(this);
  }

  _editUser(user: User): void {
    this.props.dispatch(updateUser({user: user}));
  }

  render() {
    if (!this.props.users.length) { return <div/>; }
    const userName: string = this.props.match.params.username;
    const user: User = findUser(this.props.users, userName);
    return (
      <div className="user-edit">
        <Paper className="user-paper" zDepth={2}>
          <h2 className="user-title">Edit User</h2>
          <AddEditForm title="Edit User" onDone={this._editUser} user={user} doneLink="/"/>
        </Paper>
      </div>
          
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
  users: selectUsers()
}) as any;

export default connect(mapStateToProps)(EditUser);