import Button from './Button';

import React from 'react';
import { shallow } from 'enzyme';

describe('Button', () => {
  it('should render', () => {
    const props = {
      active: true,
    };
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.props().className).toBe('input input--button active');
  });
  it('should handle props', () => {
    const props = {
      icon: 'test-icon',
      disabled: true,
    };
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper.find('button').props().disabled).toBeTruthy();
    expect(wrapper.find('i').props().children).toBe(props.icon);
  });
});
