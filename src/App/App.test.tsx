import * as React from 'react';
import { shallow } from 'enzyme';
import App from '.';
import Header from '../Header';

describe('<App />', () => {
    it('should render a Header', () => {
      const props = {mode: 0};
      const wrapper = shallow(<App {...props} />);
      expect(wrapper.find(Header)).toHaveLength(1);
    });
});
