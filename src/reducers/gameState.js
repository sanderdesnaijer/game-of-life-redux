import ACTIONS from '../constants/actions';

const initialState = {
  playing: false,
  fps: 20,
  totalFrames: 0,
  currentFrame: 0,
  direction: 'forwards',
};

export const getFps = store => store.gameStateReducer.fps;
export const isPlaying = store => store.gameStateReducer.playing;
export const getCurrentFrame = store => store.gameStateReducer.currentFrame;
export const getDirection = store => store.gameStateReducer.direction;

const gameStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_PLAY: {
      const { playing } = action.payload;
      if (state.currentFrame === 0 && state.direction === 'backwards') {
        return state;
      }
      return {
        ...state,
        playing,
      };
    }
    case ACTIONS.CHANGE_FPS: {
      const { fps } = action.payload;
      return {
        ...state,
        fps,
      };
    }
    case ACTIONS.CHANGE_PLAY_DIRECTION: {
      const direction =
        state.direction === 'forwards' ? 'backwards' : 'forwards';

      return {
        ...state,
        direction,
      };
    }
    case ACTIONS.NEXT_FRAME: {
      const nextFrame = state.currentFrame + 1;
      return {
        ...state,
        currentFrame: nextFrame,
        totalFrames: nextFrame,
      };
    }
    case ACTIONS.PREV_FRAME: {
      const nextFrame = state.currentFrame - 1;
      if (nextFrame > 0) {
        return {
          ...state,
          currentFrame: nextFrame,
          totalFrames: nextFrame,
        };
      }

      return {
        ...state,
        direction: 'forwards',
        currentFrame: 0,
        totalFrames: 0,
        playing: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default gameStateReducer;
