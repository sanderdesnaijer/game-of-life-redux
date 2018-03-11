// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { getRows } from '../reducers/grid';

import { isPlaying, getFps } from '../reducers/gameState';
import { createEmptyGrid, gotoNextFrame } from '../actions/actions';
import Canvas from './Canvas';

const enhance = connect(
  store => ({
    rows: getRows(store),
    isPlaying: isPlaying(store),
    fps: getFps(store)
  }),
  {
    createEmptyGrid,
    gotoNextFrame
  }
);

type Props = {
  isPlaying: boolean
};

type State = {
  isPlaying: boolean
};

class Game extends React.Component<Props, State> {
  context: null;

  constructor(props) {
    super(props);

    this.state = {
      isPlaying: props.isPlaying
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaying } = nextProps;
    if (this.props.isPlaying !== isPlaying) {
      this.setState({
        isPlaying
      });
    }
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    const { isPlaying } = nextState;
    if (this.state.isPlaying !== isPlaying) {
      this.setState({
        isPlaying
      });
      return isPlaying ? this.start() : this.stop();
    }
  }

  componentDidMount() {
    this.start();

    this.props.createEmptyGrid();
  }

  componentWillUnmount() {
    this.stop();
  }

  updateTime = newTime => {
    if (this.state.isPlaying) {
      const fpsInterval = 1000 / this.props.fps;

      window.requestAnimationFrame(this.updateTime);

      this.now = newTime;
      this.elapsed = this.now - this.then;
      // if enough time has elapsed, draw the next frame

      if (this.elapsed > fpsInterval) {
        this.then = this.now - this.elapsed % fpsInterval;

        // draw stuff here
        this.update();
      }
    }
  };

  update = () => {
    this.props.gotoNextFrame();
  };

  stop = () => {
    this.setState({
      isPlaying: false
    });
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
