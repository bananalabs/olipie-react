// tslint:disable-next-line
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header';
import { AppState, selectMode } from './model';
import { setAccount } from './actions';
import { Mode } from './constants';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getUsers } from '../User/actions';
import Content from '../Content';
import Profiles from '../Profiles';
import Settings from '../Settings';
import { createStructuredSelector }  from 'reselect';

export interface Props {
  mode: Mode;
  dispatch: (action: any) => void;
}

/* const users = [
  {name: 'Nayan', color: 'blue'},
  {name: 'Pranav', color: 'red'}
]; */

export class App extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    // Check if local storage has account id
    // yes - get users by account id, set mode = default, set accountId
    this.props.dispatch(setAccount('e822b031-b60e-4f30-859f-ad5ca6cec2d6'));
    this.props.dispatch(getUsers('e822b031-b60e-4f30-859f-ad5ca6cec2d6'));
    // no - go to login page
    // once user signs in, create account, add admin user to account
    // '08a61300-d083-49e6-9bb4-ac8438259dfc'
  }

  render(): JSX.Element {
    const routes = (
      <Switch>
        <Route
         exact={true}
         path="/"
         component={this.props.mode === Mode.NewUser ? Settings : Profiles}
        />
        <Route path="/profiles" component={Profiles} />
      </Switch>
    );
    /* const videos = ['2g811Eo7K8U', '2g811Eo7K8U', '2g811Eo7K8U',
                    '2g811Eo7K8U', '2g811Eo7K8U', '2g811Eo7K8U',
                    '2g811Eo7K8U', '2g811Eo7K8U']; */
    return(
      <MuiThemeProvider>
        <div>
          <Header mode={this.props.mode}/>
          <Content children={routes}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  mode: selectMode()
}) as any;

export default withRouter(connect(mapStateToProps)(App));