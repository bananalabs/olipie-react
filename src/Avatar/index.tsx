import * as React from 'react';
import MAvatar  from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import './Avatar.css';
import { white } from 'material-ui/styles/colors';
import AddUser from '../User/Add';

export interface Props {
    name: string;
    color: string;
    small: boolean;
    showName: boolean;
    addUser?: (user: {}) => void;
}

export interface State {
    showDialog: boolean;
}

// eslint-disable-next-line
// const Avatar: React.SFC<Props> = (props: Props) => {
export class Avatar extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showDialog: false
        };
        this._openDialog = this._openDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this._addUser = this._addUser.bind(this);
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
      
    render() {
        const letter = this.props.name.charAt(0).toUpperCase();
        return (
            <div>
                <div className="avatar" id={`${letter}-${this.props.color}`}>
                    <MAvatar
                        color={white}
                        backgroundColor={this.props.color}
                        size={this.props.small ? 40 : 120}
                        onClick={this._openDialog}
                    >
                    {letter}
                    </MAvatar>
                    <p className="name">{this.props.showName && this.props.name}</p>
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
};

export default Avatar;