import * as React from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export interface Props {
    title: string;
    filter: (keywords: string) => void;
}

export interface State {
    addProfile: boolean;
}

export class Settings extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this._filter = this._filter.bind(this);
        this.state = {
            addProfile: true
        };
    }

    _filter(event: any) {
        this.props.filter(event.target.value);
    }

    render() {
        return(
            <div className="container">
                <h2 className="title">{this.props.title}</h2>
                <br/>
                <h4 className="caption">
                    Enter words to exclude from your child's search results
                </h4>
                <TextField
                 hintText="kill guns sexy poop"
                 onChange={this._filter}
                />
                {
                    this.state.addProfile ?
                    <div className="profile">
                        <h4 className="caption">Add Profile</h4>
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
                        <div>
                            <RaisedButton 
                             label="Add Another Profile"
                             primary={true}
                             className="button"
                            />
                            <RaisedButton
                             label="Done"
                             primary={true}
                             className="button"
                            />
                        </div>
                    </div> :
                    <div className="profile">
                        <h4 className="caption">
                            Would you like to add a profile?
                        </h4>
                        <RaisedButton label="Add Profile" primary={true}/>
                    </div>
                }

            </div>
        );
    }
}

export default Settings;