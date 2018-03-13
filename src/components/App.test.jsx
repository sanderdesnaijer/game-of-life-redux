import App from './App';

import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  test('should render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
  });
});
