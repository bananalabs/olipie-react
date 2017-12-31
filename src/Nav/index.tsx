import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MonitorIcon from 'material-ui/svg-icons/action/visibility';
import { white } from 'material-ui/styles/colors';

const Nav = () => {
 return (
    <div>
        <IconButton tooltip="Monitor"><MonitorIcon color={white}/></IconButton>
        <IconButton tooltip="Settings"><SettingsIcon color={white}/></IconButton>
    </div>
 );
};

export default Nav;