import * as React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Profiles from '../Profiles';
import { showSearchBar, setCurrentUser } from '../App/actions';
import { connect } from 'react-redux';

export interface Props {
    dispatch: any;
    history: any;
}

export interface State {
    monitor: boolean;
}

export class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this._selectMode = this._selectMode.bind(this);
    this.state = {
        monitor: false
    };
    this.props.dispatch(showSearchBar({show: false}));
    this.props.dispatch(setCurrentUser({user: null}));
  }

  _selectMode(event: object, value: undefined): void {
      this.setState({
          monitor: value === 'monitor'
      });
  }

  render() {
      return(
        <React.Fragment>
            <RadioButtonGroup 
                name="selectMode"
                defaultSelected="watch"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '50%',
                    marginTop: '5%',
                    marginLeft: '32%'
                }}
                onChange={this._selectMode}
            >
                <RadioButton
                    value="watch"
                    label="Watch"
                    className="home-mode__option"
                    style={{display: 'inline-block'}}
                />
                <RadioButton
                    value="monitor"
                    label="Monitor"
                    className="home-mode__option"
                    style={{display: 'inline-block'}}
                />
            </RadioButtonGroup>
            <Profiles monitor={this.state.monitor} history={this.props.history}/>
        </React.Fragment>
      );
  }
}

export default connect()(Home);