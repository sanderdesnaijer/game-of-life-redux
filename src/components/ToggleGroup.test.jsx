import ToggleGroup from './ToggleGroup';

import React from 'react';
import { shallow } from 'enzyme';

describe('ToggleGroup', () => {
  it('should render', () => {
    const props = {
      open: true,
    };
    const wrapper = shallow(<ToggleGroup {...props} />);
    const mainDiv = wrapper.find('div.toggle-group');
    expect(mainDiv.props().className).toMatch(/active/);
  });
  it('should onClick', () => {
    const props = {
      open: false,
    };
    const wrapper = shallow(<ToggleGroup {...props} />);
    wrapper.instance().onClick();
    expect(wrapper.state().open).toBe(true);
  });
});
