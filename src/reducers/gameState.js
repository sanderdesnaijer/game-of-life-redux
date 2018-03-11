import ACTIONS from '../constants/actions';

const initialState = {
  playing: false,
  fps: 20,
  totalFrames: 0,
  currentFrame: 0
};

export const getFps = store => store.gameStateReducer.fps;
export const isPlaying = store => store.gameStateReducer.playing;
export const getCurrentFrame = store => store.gameStateReducer.currentFrame;

const gameStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_PLAY: {
      const { playing } = action.payload;
      return {
        ...state,
        playing
      };
    }
    case ACTIONS.CHANGE_FPS: {
      const { fps } = action.payload;
      return {
        ...state,
        fps
      };
    }
    case ACTIONS.NEXT_FRAME: {
      const nextFrame = state.currentFrame + 1;
      return {
        ...state,
        currentFrame: nextFrame,
        totalFrames: nextFrame
      };
    }
    default: {
      return state;
    }
  }
};

export default gameStateReducer;
