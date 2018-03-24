import Canvas from './Canvas';

import React from 'react';
import { shallow } from 'enzyme';

import PRESETS from '../constants/presets';

const preset = PRESETS[0];

describe('Canvas', () => {
  it('should render', () => {
    const props = {
      grid: preset.grid,
      width: 10,
      height: 10,
      cellSize: 10,
      cellColor: '#FFF000',
      showGrid: true,
    };
    const wrapper = shallow(<Canvas {...props} />);
    const instance = wrapper.instance();

    // face canvas
    const canvas = document.createElement('canvas');
    instance.canvas = canvas;

    const canvasDom = wrapper.find('canvas');
    const spy = jest.spyOn(instance, 'setContext');
    const drawGrid = jest.spyOn(instance, 'drawGrid');

    instance.registerDom(canvas);
    instance.onResize();

    expect(drawGrid).toHaveBeenCalled();

    expect(canvasDom.props().width).toBe(
      (props.grid.length * props.cellSize).toString(),
    );
    expect(canvasDom.props().height).toBe(
      (props.grid[0].length * props.cellSize).toString(),
    );
    expect(spy).toHaveBeenCalled();

    instance.registerDom(null);
  });
});
