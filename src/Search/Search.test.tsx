import * as React from 'react';
import { shallow } from 'enzyme';
import Search from '.';
import { Props } from '.';
import SearchBar from 'material-ui-search-bar';
import { stub } from 'sinon';

const searchCallback = stub();

test('renders a search bar', () => {
    const props: Props = {search: searchCallback, style: {}};
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.find(SearchBar)).toHaveLength(1);
});

test('onSearchChange sets state to search text', () => {
    const props: Props = {search: searchCallback, style: {}};
    const wrapper = shallow(<Search {...props} />);
    (wrapper.instance() as Search).onSearchChange('abcd');
    expect(wrapper.state().searchText).toEqual('abcd');
});

test('onRequestSearch invokes search callback', () => {
    const props: Props = {search: searchCallback, style: {}};
    const wrapper = shallow(<Search {...props} />);
    (wrapper.instance() as Search).onRequestSearch();
    expect(searchCallback.callCount).toEqual(1);
});
