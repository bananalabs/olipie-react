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

export interface User {
    name: string;
    color: string;
}

export interface Props {
    users: User[];
}

export class Nav extends React.Component<Props, {}> {

  render() {
    const profiles = this.props.users.map((user) => {
        return(
          <MenuItem
            key={user.name}
            primaryText={user.name}
            leftIcon={<EditIcon/>}
          />
        );
    });
    return (
        <div>
            <IconButton tooltip="Monitor">
                <MonitorIcon color={white}/>
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
            >
              <MenuItem value="General" primaryText="General" />
              <Divider/>
              <MenuItem
                primaryText="Profiles"
                rightIcon={<ArrowDropRight />}
                menuItems={profiles}
              />
            </IconMenu>
        </div>
    );
  }
}

export default Nav;