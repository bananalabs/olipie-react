import * as React from 'react';
import { shallow } from 'enzyme';
import Settings, { Props } from './General';
import TextField from 'material-ui/TextField';
import AddUser from '../User/Add';
import RaisedButton from 'material-ui/RaisedButton';

test('renders the title', () => {
    const props: Props = {
        title: 'Test Title',
        filter: '',
        setFilter: (val) => {},
        addProfile: (profile) => {},
        done: () => {}
    };
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper.text()).toContain('Test Title');
})

test('renders a text field to enter filter keywords', () => {
    const props: Props = {
        title: 'Test Title',
        filter: '',
        setFilter: (val) => {},
        addProfile: (profile) => {},
        done: () => {}

    };
    const wrapper = shallow(<Settings {...props} />);
    expect(wrapper.find(TextField)).toHaveLength(1);
})

test('renders Add Profile button if state.addProfile = false', () => {
    const props: Props = {
        title: 'Test Title',
        filter: '',
        setFilter: (val) => {},
        addProfile: (profile) => {},
        done: () => {}
    };
    const wrapper = shallow(<Settings {...props} />);
    wrapper.instance().setState({addProfile: false});
    expect(wrapper.find(AddUser)).toHaveLength(0);
    expect(wrapper.find(RaisedButton)).toHaveLength(1);
})

test('renders AddUser if state.addProfile = true', () => {
    const props: Props = {
        title: 'Test Title',
        filter: '',
        setFilter: (val) => {},
        addProfile: (profile) => {},
        done: () => {}
    };
    const wrapper = shallow(<Settings {...props} />);
    wrapper.setState({addProfile: true});
    expect(wrapper.find(AddUser)).toHaveLength(1);
})