import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import { Header } from '.';
import AppBar from 'material-ui/AppBar';
import { User } from '../User/model';

test('renders the logo and nav items', () => {
    const props = {dispatch: () => {}, history: {}, user: {} as User, users: [] as User[], showSearchBar: false};
    const wrapper: ShallowWrapper = shallow(<Header {...props} />);
    const appBar: ShallowWrapper = wrapper.find(AppBar);
    expect(appBar.props()).toHaveProperty('showMenuIconButton', false);
});