// tslint:disable-next-line

/* global gapi */

import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header';
import { setCurrentAccount } from './actions';
import { AppState, selectAccount } from './model';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Content from '../Content';
import Profiles from '../Profiles';
import EditProfile from '../User/EditUser';
import { getUsers } from '../User/actions';
import Settings from '../Settings/EditSettings';
import Setup from '../Setup';
import Watch from '../Watch';
import Play from '../Videos/Play';
import Monitor from '../Monitor/index';
import Auth from '../Auth';
import Home from '../Home';
import { createStructuredSelector }  from 'reselect';

export interface Props {
  currentAccount: string;
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
    const self = this;
    gapi.load('auth2', function() {
      gapi.auth2.init({
          client_id: '690222534289-ptpq63a1qah7fhde94uc36lmjrbtku41.apps.googleusercontent.com'
      });
      self.checkAccount();
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.currentAccount && !nextProps.currentAccount) {
      this.checkAccount();
    }
  }

  render(): JSX.Element {
    const routes = (
      <Switch>
        <Route
         exact={true}
         path="/"
         component={Home}
        />
        <Route path="/login" component={Auth} />
        <Route path="/setup" component={Setup} />
        <Route path="/home" component={Home} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/watch" component={Watch} />
        <Route path="/play/:id" component={Play} />
        <Route path="/monitor" component={Monitor} />
        <Route path="/settings" component={Settings} />
        <Route path="/user/:username" component={EditProfile} />
      </Switch>
    );
    return(
      <MuiThemeProvider>
        <div>
          <Header/>
          <Content children={routes}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: AppState): Props => createStructuredSelector({
  currentAccount: selectAccount()
}) as any;

export default withRouter(connect(mapStateToProps)(App));