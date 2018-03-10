import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRows, isPlaying } from '../reducers/grid';
import { createEmptyGrid, gotoNextFrame } from '../actions/actions';
import Canvas from './Canvas';
//import Game from '../helpers/game';

const enhance = connect(
  store => ({
    rows: getRows(store),
    isPlaying: isPlaying(store)
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

  update = () => {
    if (this.state.isPlaying) {
      this.props.gotoNextFrame();
      window.requestAnimationFrame(this.update);
    }
  };

  stop = () => {
    this.setState({
      playing: false
    });
  };

  start = () => {
    window.requestAnimationFrame(this.update);
  };

  render() {
    return <Canvas />;
  }
}

export default enhance(Game);
