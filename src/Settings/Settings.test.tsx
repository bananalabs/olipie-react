import * as React from 'react';
import { shallow } from 'enzyme';
import Settings, { Props } from './General';
import TextField from 'material-ui/TextField';
import AddUser from '../User/Add';
import RaisedButton from 'material-ui/RaisedButton';
import { SET_FILTER, SET_FILTER_SUCCESS, UPDATE_FILTER } from './constants';
import { setFilter, updateFilter, setFilterSuccess } from './actions';
import reducer from './reducer';
import { Settings as SettingsModel } from './model';


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
    expect(wrapper.find(RaisedButton)).toHaveLength(2);
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

test('Action SET_FILTER should return the correct type', () => {
    const expectedResult = {
        type: SET_FILTER,
        payload: {
            accountId: '1',
            keywords: 'violence'
        }
    };
    expect(setFilter({accountId: '1', keywords: 'violence'})).toEqual(expectedResult);
  });

test('Action UPDATE_FILTER should return the correct type', () => {
    const expectedResult = {
        type: UPDATE_FILTER,
        payload: {
            accountId: '1',
            keywords: 'violence'
        }
    };
    expect(updateFilter({accountId: '1', keywords: 'violence'})).toEqual(expectedResult);
  });

test('Action SET_FILTER_SUCCESS should return the correct type', () => {
    const expectedResult = {
        type: SET_FILTER_SUCCESS,
        payload: {keywords: 'violence'}
    };
    expect(setFilterSuccess({keywords: 'violence'})).toEqual(expectedResult);
  });
  
  test('Reducer should handle the setFilterSuccess action correctly', () => {
    const expectedResult = {filter: 'violence'}; 
    const actual = reducer({} as SettingsModel,
                           setFilterSuccess({keywords: 'violence'}));
    expect(actual).toEqual(expectedResult);
  });