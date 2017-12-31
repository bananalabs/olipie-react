import * as React from 'react';
import { shallow } from 'enzyme';
import Profiles from '.';
import Avatar from '../Avatar';
import { User } from '.';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import { ReactElement } from 'react';

/* const muiTheme = getMuiTheme();

export const MuiMountWithContext = (node: ReactElement<any>) => mount(node, {
    context: { muiTheme },
    childContextTypes: { muiTheme: {} },
}); */

test('renders Avatars for user profiles', () => {
    const users = [
        { name: 'U1', color: 'red' } ,
        { name: 'U2', color: 'green' }
    ];
    const wrapper = shallow(<Profiles users={users}/>); 
    expect(wrapper.find(Avatar)).toHaveLength(3);
});

test('renders Avatars with the rigt name, letter, color', () => {
    const users = [
        { name: 'U1', color: 'purple' }
    ];
    const wrapper = shallow(<Profiles users={users}/>); 
    const avatar = wrapper.find(Avatar).get(0);
    expect(avatar.props.name).toEqual('U1');
    expect(avatar.props.backgroundColor).toEqual('purple');
    expect(avatar.props.letter).toEqual('U');
});

test('renders Avatar to add profile', () => {
    const users: User[] = [];
    const wrapper = shallow(<Profiles users={users}/>); 
    const avatar = wrapper.find(Avatar).get(0);
    expect(avatar.props.backgroundColor).toEqual('gray');
    expect(avatar.props.letter).toEqual('+');
});