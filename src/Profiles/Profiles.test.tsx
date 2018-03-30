import * as React from 'react';
import { shallow } from 'enzyme';
import { Profiles } from '.';
import Avatar from '../Avatar';

test('renders Avatars for user profiles', () => {
    const users = [
        { id: '1', name: 'U1', profileColor: 'red', kid: true, admin: false },
        { id: '2', name: 'U2', profileColor: 'green', kid: true, admin: false }
    ];
    const dispatch = (action: {}) => {};
    const wrapper = shallow(<Profiles accountId={'1'} users={users} dispatch={dispatch} history={{a: 0}} monitor={false}/>); 
    expect(wrapper.find(Avatar)).toHaveLength(3);
});

test('renders Avatars with the right name, color', () => {
    const users = [
        { id: '1', name: 'U1', profileColor: 'purple', kid: true, admin:false }
    ];
    const dispatch = (action: {}) => {};
    const wrapper = shallow(<Profiles accountId={'1'} users={users} dispatch={dispatch} history={{a: 0}} monitor={false}/>); 
    const avatar = wrapper.find(Avatar).get(0);
    expect(avatar.props.user.name).toEqual('U1');
    expect(avatar.props.user.profileColor).toEqual('purple');
});