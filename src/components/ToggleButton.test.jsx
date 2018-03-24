import ToggleButton from './ToggleButton';

import React from 'react';
import { shallow } from 'enzyme';

describe('ToggleButton', () => {
  it('should render', () => {
    const props = {
      isActive: true,
      onClick: jest.fn(),
      activeIcon: 'active-icon',
    };
    const wrapper = shallow(<ToggleButton {...props} />);
    wrapper.find('button').simulate('click');
    expect(wrapper.find('i').props().children).toBe(props.activeIcon);
    expect(props.onClick).toHaveBeenCalledWith(!props.isActive);
  });

  it('should render inactive', () => {
    const props = {
      isActive: false,
      onClick: jest.fn(),
      inActiveIcon: 'inactive-icon',
    };
    const wrapper = shallow(<ToggleButton {...props} />);
    expect(wrapper.find('i').props().children).toBe(props.inActiveIcon);
  });
});
