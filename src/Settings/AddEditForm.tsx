import * as React from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import { RaisedButton, Paper } from 'material-ui';
import { Settings } from './model';

export interface Props {
    settings?: Settings;
    done: (settings: Settings) => void;
    doneLink: string;
}

export interface State {
    keywords: string;
}

export class AddEditForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            keywords: this.props.settings ? this.props.settings.filter : ''
        };
        this._setKeywords = this._setKeywords.bind(this);
        this._onDone = this._onDone.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.settings && nextProps.settings.filter !==
            this.state.keywords) {
            this.setState({keywords: nextProps.settings.filter});
        }
    }

    _setKeywords(event: any) {
        this.setState({ keywords: event.target.value });
    }

    _onDone() {
        this.props.done({filter: this.state.keywords});
    }

    render() {
        return(
            <div className="settings-container">
                <Paper className="settings-paper" zDepth={2}>
                    <h2 className="settings-title">Settings</h2>
                    <p className="caption">
                        Enter words to exclude from your child's search results
                    </p>
                    <TextField
                      hintText="kill guns sexy poop"
                      value={this.state.keywords}
                      onChange={this._setKeywords}
                    />
                    <br/>
                    <br/>
                    <a href={this.props.doneLink}>
                        <RaisedButton
                          label="Done"
                          primary={true}
                          onClick={this._onDone}
                        />
                    </a>
                </Paper>
            </div>
        );
    }
}

export default AddEditForm;