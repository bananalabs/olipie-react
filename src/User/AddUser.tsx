import * as React from 'react';
import { AppState, selectAccount } from '../App/model';
import { addUser } from '../User/actions';
import { User } from '../User/model';
import AddEditForm from './AddEditForm';
import { connect } from 'react-redux';
import { createStructuredSelector }  from 'reselect';
import { RaisedButton } from 'material-ui';

export interface Props {
  accountId: string;
  dispatch: (action: any) => void;
  done: () => void;
}

export interface State {
  showForm: boolean;
}

export class AddUser extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this._addUser = this._addUser.bind(this);
    this.state = {
      showForm: true
    };
  }

  _addUser(user: User): void {
    this.props.dispatch(addUser({accountId: this.props.accountId, user: user}));
    this.setState({showForm: false});
  }

  render() {
    return (
        <div>
          {this.state.showForm && 
           <AddEditForm title="Add User" onDone={this._addUser} doneLink="#"/>
          }
          {!this.state.showForm && 
            <div style={{textAlign: 'center'}}>
              <span>
                <RaisedButton
                  label="Add Another?"
                  primary={true}
                  className="button"
                  onClick={(event) => {this.setState({ showForm: true }); }}
                />
              </span>
                <RaisedButton
                  label="Done"
                  secondary={true}
                  className="button"
                  onClick={(event) => this.props.done()}
                />
            </div>
          }
        </div>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  accountId: selectAccount(),
}) as any;

export default connect(mapStateToProps)(AddUser);