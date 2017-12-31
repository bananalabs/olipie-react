import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Avatar from '.';
import MAvatar from 'material-ui/Avatar';
import { Props } from '.';

let props: Props;
let wrapper: ShallowWrapper;
let icon: ShallowWrapper;

beforeEach(() => {
  props = {
    letter: 'A',
    color: 'white',
    backgroundColor: 'red',
    small: true,
    name: 'ABCD'
  }
  wrapper = shallow(<Avatar {...props} />);  
  icon = wrapper.find(MAvatar);
});

test('renders an icon of size 40 if small=true', () => {
    expect(icon.props()).toHaveProperty('size', 40);
});

test('renders an icon of size 120 if small=false', () => {
    props.small = false;
    wrapper = shallow(<Avatar {...props} />);  
    icon = wrapper.find(MAvatar);
    expect(icon.props()).toHaveProperty('size', 120);
});

test('renders an icon with class avatar', () => {
    expect((wrapper).hasClass('avatar')).toEqual(true);
});

test('renders an icon with provided color, backgroundColor', () => {
    expect(icon.props()).toHaveProperty('color', props.color);
    expect(icon.props()).toHaveProperty('backgroundColor', props.backgroundColor);
});

test('renders an icon with provided letter', () => {
    expect(wrapper.find(MAvatar).children().text()).toEqual(props.letter);
});

test('renders name if small=false', () => {
    props.small = false;
    wrapper = shallow(<Avatar {...props} />);  
    icon = wrapper.find(MAvatar);
    expect(wrapper.contains(<p className="name">{props.name}</p>)).toEqual(true);
});

test('does not render name if small=true', () => {
    props.small = true;
    wrapper = shallow(<Avatar {...props} />);  
    icon = wrapper.find(MAvatar);
    expect(wrapper.contains(<p>{props.name}</p>)).toEqual(false);
});
