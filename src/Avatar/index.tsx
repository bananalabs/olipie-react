import * as React from 'react';
import MAvatar  from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import './Avatar.css';
import { white } from 'material-ui/styles/colors';
import AddUser from '../User/Add';
import { User } from '../User/model';

export interface Props {
    user?: User;
    small: boolean;
    showName: boolean;
    addUser?: (user: {}) => void;
    onClick?: (user: {}) => void;
}

export interface State {
    showDialog: boolean;
}

export class Avatar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showDialog: false
        };
        this._openDialog = this._openDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this._addUser = this._addUser.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    _openDialog() {
        this.setState({ showDialog: true });
    }

    _closeDialog() {
        this.setState({ showDialog: false });
    }

    _addUser(user: {}) {
        this._closeDialog();
        const addUser = this.props.addUser as (user: {}) => void;
        addUser(user);
    }

    _onClick() {
        this.props.addUser ? this._openDialog() :
        this.props.onClick ? this.props.onClick(this.props.user || {}) :
        console.log('Missing callback for onClick');
    }
      
    render() {
        const letter = this.props.user ?
                       this.props.user.name.charAt(0).toUpperCase() :
                       '+';
        const color = this.props.user ?
                      this.props.user.profileColor :
                      'gray';
        return (
            <div>
                <div className="avatar" id={`${letter}-${color}`}>
                    <MAvatar
                        color={white}
                        backgroundColor={color}
                        size={this.props.small ? 40 : 120}
                        onClick={this._onClick}
                    >
                    {letter}
                    </MAvatar>
                    <p className="a-name">
                        {this.props.showName && this.props.user && this.props.user.name}
                    </p>
                </div>
                <Dialog
                  title="Add User"
                  modal={false}
                  open={this.state.showDialog}
                  onRequestClose={this._closeDialog}
                  style={{width: '30%', textAlign: 'center', marginLeft: '35%'}}
                >
                    <AddUser addUser={this._addUser} showTitle={false}/>
                </Dialog>
            </div>
        );
    }
}

export default Avatar;