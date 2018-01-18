import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export interface Props {
    showTitle: boolean;
    addUser: (user: object) => void;
}

export interface State {
    name: string;
    profileColor: string;
    kid: boolean;
}

export class AddUser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            name: '',
            profileColor: '',
            kid: true
        };
        this._addUser = this._addUser.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onProfileColorChange = this._onProfileColorChange.bind(this);
        this._onKidChange = this._onKidChange.bind(this);
    }

    _onNameChange(event: any) {
        this.setState({name: event.target.value})
    }

    _onProfileColorChange(event: any, index: number, value: string) {
        this.setState({profileColor: value})
    }

    _onKidChange(event: any) {
        this.setState({kid: !this.state.kid})
    }

    _addUser(event: object) {
        this.props.addUser(this.state);
    }

    render() {
        return(
            <div className="profile">
                {this.props.showTitle && <h4 className="caption">Add Profile</h4>}
                    <TextField
                     value={this.state.name}
                     onChange={this._onNameChange}
                     hintText="Name"
                    />
                <br/>
                <SelectField
                    style={{textAlign: 'left'}}
                    floatingLabelText="Profile Color"
                    onChange={this._onProfileColorChange}
                    value={this.state.profileColor}
                >
                    <MenuItem value={'red'} primaryText={'red'}/>
                    <MenuItem value={'blue'} primaryText={'blue'}/>
                    <MenuItem value={'green'} primaryText={'green'}/>
                    <MenuItem value={'pink'} primaryText={'pink'}/>
                    <MenuItem value={'yellow'} primaryText={'yellow'}/>
                    <MenuItem value={'gray'} primaryText={'gray'}/>
                    <MenuItem value={'purple'} primaryText={'purple'}/>
                    <MenuItem value={'orange'} primaryText={'orange'}/>
                </SelectField>
                <br/>
                <br/>
                <Checkbox
                    label="Kid?"
                    className="check"
                    checked={this.state.kid}
                    onCheck={this._onKidChange}
                />
                <br/>
                <RaisedButton
                    label="Done"
                    primary={true}
                    className="button"
                    onClick={this._addUser}
                />
            </div>
        );
    }
}

export default AddUser;