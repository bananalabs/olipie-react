import * as React from 'react';
import TextField from 'material-ui/TextField';
import './Profiles.css';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export class Edit extends React.Component<{}, {}> {

    render() {
        return(
            <div className="edit">
                <h2 className="title">Edit Profile</h2>
                <br/>
                <TextField
                 hintText="Name"
                />
                <br/>
                <SelectField
                    style={{textAlign: 'left'}}
                    floatingLabelText="Profile Color"
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
                    defaultChecked={true}
                />
                <br/>
                <RaisedButton
                    label="Done"
                    primary={true}
                    className="button"
                />
            </div>
        );
    }
}

export default Edit;