import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import { Header } from '.';
import AppBar from 'material-ui/AppBar';
import { Mode } from '../App/constants';
import Avatar from '../Avatar';
import Search from '../Search';
import { User } from '../User/model';
import { Link } from 'react-router-dom';

test('renders the logo and nav items for mode = Default', () => {
    const props = {mode: Mode.Default, dispatch: () => {}, history: {}, user: {} as User, users: [] as User[]};
    const wrapper: ShallowWrapper = shallow(<Header {...props} />);
    const appBar: ShallowWrapper = wrapper.find(AppBar);
    expect(appBar).toHaveLength(1);
    expect(appBar.props()).toHaveProperty('title', <Link to={`/`} className="title">Olipie</Link>);
    expect(appBar.props()).toHaveProperty('showMenuIconButton', false);
});

test('renders the logo, search bar and profile icon for mode = Watch', () => {
    const props = {mode: Mode.Watch, dispatch: () => {}, history: {}, user: {} as User, users: [] as User[]};
    const wrapper: ShallowWrapper = shallow(<Header {...props} />);
    const appBar = wrapper.find(AppBar);
    const children = appBar.children();
    console.log(children);
    expect(appBar).toHaveLength(1);
    expect(appBar.props()).toHaveProperty('title', <Link to={`/`} className="title">Olipie</Link>);
    expect(appBar.props()).toHaveProperty('showMenuIconButton', false);
    expect((appBar.props().iconElementRight as any).type).toEqual(Avatar);
    expect(children.find(Search)).toHaveLength(1);
});
