import * as React from 'react';
import TextField from 'material-ui/TextField';
import './Settings.css';
import { RaisedButton, Paper } from 'material-ui';

export interface Props {
    filter: string;
    setFilter: (keywords: string) => void;
    done: () => void;
}

export interface State {
    keywords: string;
}

export class GeneralSettings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            keywords: this.props.filter
        };
        this._setKeywords = this._setKeywords.bind(this);
        this._onDone = this._onDone.bind(this);
    }

    _setKeywords(event: any) {
        this.setState({ keywords: event.target.value });
    }

    _onDone() {
        this.props.setFilter(this.state.keywords);
        this.props.done();
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
                    <RaisedButton
                     label="Done"
                     primary={true}
                     onClick={this._onDone}
                    />
                </Paper>
            </div>
        );
    }
}

export default GeneralSettings;