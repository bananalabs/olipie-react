// tslint:disable-next-line
import * as React from 'react';
// import { connect } from 'react-redux';
// import { Switch, Route, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header';
import { Mode } from './constants';
// import Profiles from '../Profiles';
import Videos from '../Videos';

export interface Props {
  // app?: AppState;
  // dispatch?: any;
}

/* const users = [
  {name: 'Nayan', color: 'blue'},
  {name: 'Pranav', color: 'red'}
]; */

class App extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    /* const routes =
      <Switch>
        <Route exact path='/' component={Projects} />
        <Route path='/projects' component={Projects} />
        <Route path='/codebrowser/:projectId' component={CodeBrowser} />
        <Route path='/editor/:projectId' component={Editor} />
        <Route path='/mapper' component={Mapper} />
      </Switch>; */
    const videos = ['2g811Eo7K8U', '2g811Eo7K8U', '2g811Eo7K8U',
                    '2g811Eo7K8U', '2g811Eo7K8U', '2g811Eo7K8U',
                    '2g811Eo7K8U', '2g811Eo7K8U'];
    return(
      <MuiThemeProvider>
        <div>
          <Header mode={Mode.Default}/>
          <Videos videos={videos}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

/* const mapStateToProps = (state: any, ownProps: Props): Props =>
    createStructuredSelector({app: selectApp()}) as any;

export default withRouter(connect(mapStateToProps, null)(App)); */

export default App;
