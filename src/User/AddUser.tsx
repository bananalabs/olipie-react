import * as React from 'react';
import { AppState, selectAccount } from '../App/model';
import { addUser } from '../User/actions';
import { User } from '../User/model';
import AddEditForm from './AddEditForm';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';

export interface Props {
  accountId: string;
  dispatch: (action: any) => void;
}

export class AddUser extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
    this._addUser = this._addUser.bind(this);
  }

  _addUser(user: User): void {
    this.props.dispatch(addUser({accountId: this.props.accountId, user: user}));
  }

  render() {
    return (
        <AddEditForm title="Add User" onDone={this._addUser}/>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
}) as any;

export default connect(mapStateToProps)(AddUser);