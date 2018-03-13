// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { getRows } from '../reducers/grid';

import { isPlaying, getFps, getDirection } from '../reducers/gameState';
import {
  createEmptyGrid,
  gotoNextFrame,
  gotoPreviousFrame,
} from '../actions/actions';
import Canvas from './Canvas';

const enhance = connect(
  store => ({
    rows: getRows(store),
    isPlaying: isPlaying(store),
    fps: getFps(store),
    direction: getDirection(store),
  }),
  {
    createEmptyGrid,
    gotoNextFrame,
    gotoPreviousFrame,
  },
);

type Props = {
  isPlaying: boolean,
};

class Game extends React.Component<Props, State> {
  context: null;

  componentWillReceiveProps(nextProps) {
    const { isPlaying } = nextProps;
    if (this.props.isPlaying !== isPlaying) {
      this.setState({
        isPlaying,
      });

      if (isPlaying) {
        this.start();
      }
    }
  }

  componentDidMount() {
    this.start();

    this.props.createEmptyGrid();
  }

  componentWillUnmount() {
    //  this.stop();
  }

  updateTime = newTime => {
    if (this.props.isPlaying) {
      const fpsInterval = 1000 / this.props.fps;

      window.requestAnimationFrame(this.updateTime);

      this.now = newTime;
      this.elapsed = this.now - this.then;
      // if enough time has elapsed, draw the next frame

      if (this.elapsed > fpsInterval) {
        this.then = this.now - this.elapsed % fpsInterval;

        // update frame
        this.update();
      }
    }
  };

  update = () => {
    const { direction } = this.props;
    if (direction === 'forwards') {
      this.props.gotoNextFrame();
    } else {
      this.props.gotoPreviousFrame();
    }
  };

  start = () => {
    this.then = window.performance.now();
    window.requestAnimationFrame(this.updateTime);
  };

  render() {
    return <Canvas />;
  }
}

export default enhance(Game);
