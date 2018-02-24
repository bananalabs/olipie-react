import * as React from 'react';
import './User.css';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMode } from '../App/actions';
import { Mode } from '../App/constants';

export interface Props {
    dispatch: (action: any) => void;
}

export interface State {
    mode: Mode;
}

export class UserRole extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this._onDone = this._onDone.bind(this);
        this._onModeSelect = this._onModeSelect.bind(this);
        this.state = {
            mode: Mode.Adult
        };
    }

    _onModeSelect(event: object, value: string) {
        this.setState({mode: parseInt(value, 10)});
    }

    _onDone(event: object) {
        this.props.dispatch(setMode({mode: this.state.mode}));
    }

    render() {
        return (
            <div className="user-container">
                <h2 className="user-title">What would you like to do?</h2>
                <RadioButtonGroup
                    name="userRole"
                    defaultSelected={Mode.Adult.toString()}
                    className="user-role__radiogroup"
                    onChange={this._onModeSelect}
                >
                    <RadioButton
                        value={Mode.Child.toString()}
                        label="Watch Videos"
                        className="user-role__radio"
                    />
                    <RadioButton
                        value={Mode.Adult.toString()}
                        label="Watch and Monitor videos"
                        className="user-role__radio"
                    />
                </RadioButtonGroup>
                <br/>
                <br/>
                <Link to="/profiles">
                    <RaisedButton
                        label="Done"
                        primary={true}
                        onClick={this._onDone}
                        className="user-role__done"
                    />
                </Link>
            </div>
        );
    }
}

export default connect()(UserRole);