import * as React from 'react';
import {shallow} from 'enzyme';
import Nav from '.';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MonitorIcon from 'material-ui/svg-icons/action/visibility';

test('renders icons for Monitor and Settings', () => {
    const wrapper = shallow(<Nav/>); 
    expect(wrapper.find(SettingsIcon)).toHaveLength(1);
    expect(wrapper.find(MonitorIcon)).toHaveLength(1);
});