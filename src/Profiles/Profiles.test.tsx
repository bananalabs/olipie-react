import * as React from 'react';
import { shallow } from 'enzyme';
import { Profiles } from '.';
import Avatar from '../Avatar';
import { User } from '../User/model';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { ReactElement } from 'react';

/* const muiTheme = getMuiTheme();

export const MuiMountWithContext = (node: ReactElement<any>) => mount(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: {} },
}); */

test('renders Avatars for user profiles', () => {
    const users = [
        { id: '1', name: 'U1', profileColor: 'red', kid: true, admin: false },
        { id: '2', name: 'U2', profileColor: 'green', kid: true, admin: false }
    ];
    const dispatch = (action: {}) => {};
    const wrapper = shallow(<Profiles accountId={'1'} users={users} dispatch={dispatch}/>); 
    expect(wrapper.find(Avatar)).toHaveLength(3);
});

test('renders Avatars with the right name, color', () => {
    const users = [
        { id: '1', name: 'U1', profileColor: 'purple', kid: true, admin:false }
    ];
    const dispatch = (action: {}) => {};
    const wrapper = shallow(<Profiles accountId={'1'} users={users} dispatch={dispatch}/>); 
    const avatar = wrapper.find(Avatar).get(0);
    expect(avatar.props.name).toEqual('U1');
    expect(avatar.props.color).toEqual('purple');
});

test('renders Avatar to add profile', () => {
    const users: User[] = [];
    const dispatch = (action: {}) => {};
    const wrapper = shallow(<Profiles accountId={'1'} users={users} dispatch={dispatch}/>); 
    const avatar = wrapper.find(Avatar).get(0);
    expect(avatar.props.color).toEqual('gray');
    expect(avatar.props.name).toEqual('+');
});