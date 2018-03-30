import * as React from 'react';
import {shallow} from 'enzyme';
import Nav from '.';
import MonitorIcon from 'material-ui/svg-icons/action/visibility';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconMenu from 'material-ui/IconMenu';
import { white } from 'material-ui/styles/colors';

test('renders icons for Monitor and Settings', () => {
    const users: any = [
        {name: 'Nayan', color: 'blue'},
        {name: 'Pranav', color: 'red'}
    ];
    const settings =
        <IconButton tooltip="Settings">
            <SettingsIcon color={white}/>
        </IconButton>;
    const wrapper = shallow(<Nav users={users} onSignOut={() => {}}/>); 
    expect(wrapper.find(MonitorIcon)).toHaveLength(1);
    expect(wrapper.find(IconMenu).props()).toHaveProperty(
        'iconButtonElement', settings);
});