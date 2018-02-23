import * as React from 'react';
import './User.css';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

export interface Props {
}

export interface State {
}

export class UserRole extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return(
            <div className="user-container">
                <h2 className="user-title">What would you like to do?</h2>
                <RadioButtonGroup 
                    name="userRole"
                    defaultSelected="adult"
                    className="user-role__radiogroup">
                    <RadioButton
                        value="child"
                        label="Watch Videos"
                        className="user-role__radio"
                    />
                    <RadioButton
                        value="adult"
                        label="Watch and Monitor videos"
                        className="user-role__radio"
                    />
                </RadioButtonGroup>
            </div>
        );
    }
}

export default UserRole;