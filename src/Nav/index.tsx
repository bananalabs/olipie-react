/* global gapi */

import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MonitorIcon from 'material-ui/svg-icons/action/visibility';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { white } from 'material-ui/styles/colors';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { User } from '../User/model';

export interface Props {
    users: User[];
    onMonitor: () => void;
    history: any;
}

export class Nav extends React.Component<Props, {}> {

  constructor(props: Props) {
      super(props);
      this._onMenuSelect = this._onMenuSelect.bind(this);
  }

  _onMenuSelect(event: any, value: string) {
      switch (value) {
        default:
            return;          
      }
  }

  _SignOut = () => {
    localStorage.setItem('olipie-account', null);
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        this.props.history.push('/');
    })
  }

  render() {
    const profiles = this.props.users.map((user) => {
        return(
          <a key={user.name} href={`/user/${user.name}`}>
            <MenuItem
                key={user.name}
                primaryText={user.name}
                leftIcon={<EditIcon/>}
            />
          </a>
        );
    });
    return (
        <div>
            <IconButton tooltip="Monitor" onClick={this.props.onMonitor}>
                <a href="/monitor">
                    <MonitorIcon color={white}/>
                </a>
            </IconButton>
            <IconMenu
                autoWidth={true}
                iconButtonElement={
                    <IconButton tooltip="Settings">
                        <SettingsIcon color={white}/>
                    </IconButton>
                }
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onChange={this._onMenuSelect}
            >
              <a href="/settings" style={{textDecoration: 'none'}}>
                <MenuItem value="General" primaryText="General"/>
              </a>
              <Divider/>
              <MenuItem
                primaryText="Profiles"
                rightIcon={<ArrowDropRight />}
                menuItems={profiles}
              />
              <a href="/" onClick={this._SignOut} style={{textDecoration: 'none'}}>
                <MenuItem value="Sign Out" primaryText="Sign Out"/>
              </a>
            </IconMenu>
        </div>
    );
  }
}

export default Nav;