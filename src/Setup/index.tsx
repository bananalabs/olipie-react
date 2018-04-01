import * as React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui';
import './Setup.css';
import '../User/User.css';
import AddUser from '../User/AddUser';
import AddSettings from '../Settings/AddSettings';
import Paper from 'material-ui/Paper';

export interface Props {
}

export interface State {
    stepIndex: number;
}

export class Setup extends React.Component<Props, State> {

  constructor(props: Props) {
      super(props);
      this.state = {
        stepIndex: 0,
      };
  }  
  
  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="user-edit">
            <Paper className="user-paper" zDepth={2}>
              <h2 className="user-title">Add User</h2>
              <AddUser done={this.handleNext}/>
            </Paper>
          </div>
        );
      case 1:
        return <AddSettings done={this.handleNext}/>;
      default:
        return '';
    }
  }

  render() {
    const {stepIndex} = this.state;
    const contentStyle = {margin: '0 12px', width: '100%', maxWidth: '100%'};

    return (
      <div>
        <h4 className="setup-title">Welcome. You are just 2 steps away from fun and safe video watching.</h4>
        <div>
            <Stepper 
              activeStep={stepIndex}
              style={{maxWidth: '400px', marginLeft: '37%'}}
            >
                <Step>
                    <StepLabel>Add User(s)</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Add safe search filters</StepLabel>
                </Step>
            </Stepper>
            <div style={contentStyle}>
                {this.getStepContent(stepIndex)}
            </div>
        </div>
      </div>
    );
  }
}

export default Setup;