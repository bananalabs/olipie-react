import * as React from 'react';
import { TextField,
         RaisedButton,
         Checkbox,
         SelectField,
         MenuItem } from 'material-ui';
import { User } from './model';
import './User.css';
import { Link } from 'react-router-dom';

export interface Props {
    title: string;
    user?: User;
    onDone: (user: object) => void;
    doneLink: string;
}

export interface State {
    name: string;
    profileColor: string;
    kid: boolean;
    error: string;
}

export class AddEditForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            name: (this.props.user && this.props.user.name) || '',
            profileColor: (this.props.user && this.props.user.profileColor) || '',
            kid: (this.props.user && this.props.user.kid) || true,
            error: ''
        };
        this._onDone = this._onDone.bind(this);
        this._onNameChange = this._onNameChange.bind(this);
        this._onProfileColorChange = this._onProfileColorChange.bind(this);
        this._onKidChange = this._onKidChange.bind(this);
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps !== this.props) {
            this.setState({
                name: (newProps.user && newProps.user.name) || this.state.name,
                profileColor: (newProps.user && newProps.user.profileColor) || this.state.profileColor,
                kid: (newProps.user && newProps.user.kid) || this.state.kid,
            });
        }
    }

    _onNameChange(event: any) {
        this.setState({name: event.target.value});
    }

    _onProfileColorChange(event: any, index: number, value: string) {
        this.setState({profileColor: value});
    }

    _onKidChange(event: any) {
        this.setState({kid: !this.state.kid});
    }

    _onDone(event: object) {
        if (!this.state.name) {
            this.setState({error: 'This field is required'});
        } else {
            const user: User = this.props.user || {} as User;
            const update = {...this.state};
            delete update.error;
            this.props.onDone({...user, ...update});
        }
    }

    render() {
        return(
            <form>
                <TextField
                    value={this.state.name}
                    onChange={this._onNameChange}
                    hintText="Name"
                    errorText={this.state.error}
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
                    className="user-check"
                    checked={this.state.kid}
                    onCheck={this._onKidChange}
                />
                <br/>
                <Link to={this.props.doneLink}>
                    <RaisedButton
                        label="Done"
                        primary={true}
                        className="user-button"
                        onClick={this._onDone}
                    />
                </Link>
            </form>
        );
    }
}

export default AddEditForm;