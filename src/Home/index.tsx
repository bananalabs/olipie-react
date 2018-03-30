import * as React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Profiles from '../Profiles';

export interface Props {
}

export interface State {
}

export class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
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
            <Profiles/>
        </React.Fragment>
      );
  }
}

/* const mapStateToProps = (state: AppState): Props => createStructuredSelector({
}) as any;

export default connect(mapStateToProps)(Home); */

export default Home;