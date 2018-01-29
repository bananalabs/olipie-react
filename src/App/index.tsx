// tslint:disable-next-line
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header';
import { AppState, selectMode } from './model';
import { setCurrentAccount } from './actions';
import { Mode } from './constants';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
// import Setup from '../Setup';
import Content from '../Content';
import Profiles from '../Profiles';
import EditProfile from '../User/EditUser';
import { getUsers } from '../User/actions';
import Settings from '../Settings/EditSettings';
import Setup from '../Setup';
import Watch from '../Watch';
import { createStructuredSelector }  from 'reselect';
import Monitor from '../Monitor/index';
import Auth from '../Auth';

export interface Props {
  mode: Mode;
  dispatch: (action: any) => void;
  history: any;
}

export class App extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  checkAccount() {
    // Check if local storage has account id
    const accountId = localStorage.getItem('olipie-account');
    if (!accountId ||
         accountId === 'null' ||
         accountId === 'undefined'
       ) {
      // Redirect user to login page
      this.props.history.push('/login');
    } else {
      // Set current account, get users for this account
      this.props.dispatch(setCurrentAccount({accountId: accountId}));
      this.props.dispatch(getUsers({accountId: accountId}));
    }
  }

  componentWillMount() {
    this.checkAccount();
  }

  render(): JSX.Element {
    const routes = (
      <Switch>
        <Route
         exact={true}
         path="/"
         component={this.props.mode === Mode.LoggedOut ? Auth : Profiles}
        />
        <Route path="/login" component={Auth} />
        <Route path="/setup" component={Setup} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/watch" component={Watch} />
        <Route path="/monitor" component={Monitor} />
        <Route path="/settings" component={Settings} />
        <Route path="/user/:username" component={EditProfile} />
      </Switch>
    );
    return(
      <MuiThemeProvider>
        <div>
          <Header mode={this.props.mode} history={this.props.history}/>
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