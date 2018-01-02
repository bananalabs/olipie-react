import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Header from '.';
import AppBar from 'material-ui/AppBar';
import Nav from '../Nav';
import { Mode } from './constants';
import Avatar from '../Avatar';
import Search from '../Search';

test('renders the logo and nav items for mode = Default', () => {
    const users = [
        {name: 'Nayan', color: 'blue'},
        {name: 'Pranav', color: 'red'}
    ];
    const props = {mode: Mode.Default};
    const wrapper: ShallowWrapper = shallow(<Header {...props} />);
    const appBar: ShallowWrapper = wrapper.find(AppBar);
    expect(appBar).toHaveLength(1);
    expect(appBar.props()).toHaveProperty('title', 'Olipie');
    expect(appBar.props()).toHaveProperty('showMenuIconButton', false);
    expect(appBar.props()).toHaveProperty(
        'iconElementRight', <Nav users={users}/>);
});

test('renders the logo, search bar and profile icon for mode = Watch', () => {
    const props = {mode: Mode.Watch};
    const wrapper = shallow(<Header {...props} />);
    const appBar = wrapper.find(AppBar);
    const children = appBar.children();
    console.log(children);
    expect(appBar).toHaveLength(1);
    expect(appBar.props()).toHaveProperty('title', 'Olipie');
    expect(appBar.props()).toHaveProperty('showMenuIconButton', false);
    expect((appBar.props().iconElementRight as any).type).toEqual(Avatar);
    expect(children.find(Search)).toHaveLength(1);
});
