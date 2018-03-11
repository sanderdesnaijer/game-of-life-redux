import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { getRows, isPlaying, getFps } from '../reducers/grid';
import { createEmptyGrid, gotoNextFrame } from '../actions/actions';
import Canvas from './Canvas';
//import Game from '../helpers/game';

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

class Game extends Component {
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

  componentWillUpdate(nextProps, nextState) {
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
      playing: false
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
