import * as React from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import RaisedButton from 'material-ui/RaisedButton';
import AddUser from '../User/Add';

export interface Props {
    title: string;
    filter: string;
    setFilter: (keywords: string) => void;
    addProfile: (profile: object) => void;
    done: () => void;
}

export interface State {
    addProfile: boolean;
    keywords: string;
}

export class GeneralSettings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            addProfile: false,
            keywords: this.props.filter
        };
        this._setFilter = this._setFilter.bind(this);
        this._setKeywords = this._setKeywords.bind(this);
        this._showAddProfile = this._showAddProfile.bind(this);
        this._addProfile = this._addProfile.bind(this);
        this._onDone = this._onDone.bind(this);
    }

    _setFilter(event: any) {
        this.setState({ keywords: event.target.value });
        this.props.setFilter(event.target.value);
    }

    _setKeywords(event: any) {
        this.setState({ keywords: event.target.value });
    }

    _showAddProfile(event: any) {
        this.setState({ addProfile: true });
    }

    _addProfile(profile: object) {
        this.setState({ addProfile: false });
        this.props.addProfile(profile);
    }

    _onDone() {
        this.props.done();
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
                 value={this.state.keywords}
                 onChange={this._setKeywords}
                 onBlur={this._setFilter}
                />
                {
                    this.state.addProfile ?
                    <AddUser addUser={this._addProfile}/> :
                    <div className="profile">
                        <RaisedButton
                         label="Add Profile"
                         primary={true}
                         onClick={this._showAddProfile}
                        />
                        <div style={{marginTop: '20px'}}>
                            <RaisedButton
                             label="DONE WITH SETTINGS"
                             backgroundColor='#FF7043'
                             labelColor='white'
                             onClick={this._onDone}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default GeneralSettings;