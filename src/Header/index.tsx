import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Nav from '../Nav';
import { Mode } from './constants';
import Avatar from '../Avatar';
import Search from '../Search';

export interface Props {
  mode: Mode;
}

export interface State {
}

const styles = {
  search: {
    position: 'absolute',
    marginLeft: '40%',
    marginTop: '8px'
  }
};

export class Header extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search(val: string): void {
    // console.debug(val);
    val = '';
  }

  render() {
    switch (this.props.mode) {
      case Mode.Default:
        return(
          <AppBar
            title="Olipie"
            showMenuIconButton={false}
            iconElementRight={<Nav/>}
          />
        );
      case Mode.Watch:
        return (
          <AppBar
            title="Olipie"
            showMenuIconButton={false}
            iconElementRight={
              <Avatar
                color={'white'}
                backgroundColor={'red'}
                small={true}
                letter={'A'}
              />
            }
          >
            <Search style={styles.search} search={this.search}/>
          </AppBar>
        );
      case Mode.Monitor:
        return (
          <div/>
          /* <AppBar
            title="Olipie"
            showMenuIconButton={false}
            iconElementRight={<div><Nav/><Avatar/></div>}
          /> */
        );
      default:
        // console.debug('Invalid Mode passed to Header - ' + this.props.mode);
        return (
          <div/>
        );
    }
  }
}

export default Header;