import ACTIONS from '../constants/actions';

const initialState = {
  playing: false,
  fps: 10
};

export const getFps = store => store.gameStateReducer.fps;
export const isPlaying = store => store.gameStateReducer.playing;

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
    default: {
      return state;
    }
  }
};

export default gameStateReducer;
