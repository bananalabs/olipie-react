/* global gapi */

import * as React from 'react';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import UserIcon from 'material-ui/svg-icons/social/person';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { white } from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { User } from '../User/model';

export interface Props {
    users: User[];
    onSignOut: () => void;
}

export interface State {
    open: boolean;
}

export class Nav extends React.Component<Props, State> {

  constructor(props: Props) {
      super(props);
      this._onMenuSelect = this._onMenuSelect.bind(this);
      this._onSignout = this._onSignout.bind(this);
      this.state = {
          open: false
      };
  }

  _onMenuSelect(open: boolean) {
      this.setState({open: open});
  }

  _onSignout(event: object) {
    this.setState({open: false});
    this.props.onSignOut();
  }

  render() {
    const profiles = this.props.users.map((user) => {
        return(
          <Link key={user.name} to={`/user/${user.name}`}>
            <MenuItem
                key={user.name}
                primaryText={user.name}
                leftIcon={<EditIcon/>}
                onClick={() => this.setState({open: false})}
            />
          </Link>
        );
    });
    return (
        <div>
            <IconMenu
                open={this.state.open}
                autoWidth={true}
                iconButtonElement={
                    <IconButton tooltip="My Account">
                        <UserIcon color={white}/>
                    </IconButton>
                }
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestChange={this._onMenuSelect}
            >
              <Link to={`/settings`} style={{textDecoration: 'none'}}>
                <MenuItem
                  value="General"
                  primaryText="General Settings"
                  onClick={() => this.setState({open: false})}
                />
              </Link>
              <Divider/>
              <MenuItem
                primaryText="Profiles"
                rightIcon={<ArrowDropRight />}
                menuItems={profiles}
              />
              <Link to={`/`} onClick={this._onSignout} style={{textDecoration: 'none'}}>
                <MenuItem value="Sign Out" primaryText="Sign Out"/>
              </Link>
            </IconMenu>
        </div>
    );
  }
}

export default Nav;