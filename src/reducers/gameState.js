// @flow
import ACTIONS from '../constants/actions';

type State = {
  playing: boolean,
  fps: number,
  totalFrames: number,
  currentFrame: number,
  direction: 'forwards' | 'backwards',
  mode: 'insert-preset' | 'drag-add',
};

const initialState = {
  playing: false,
  fps: 20,
  totalFrames: 0,
  currentFrame: 0,
  direction: 'forwards',
  mode: 'drag-add',
  preset: [],
  activePreset: null,
  trail: 0,
};

export const getFps = store => store.gameStateReducer.fps;
export const isPlaying = store => store.gameStateReducer.playing;
export const getCurrentFrame = store => store.gameStateReducer.currentFrame;
export const getDirection = store => store.gameStateReducer.direction;
export const getMode = store => store.gameStateReducer.mode;
export const getPreset = store => store.gameStateReducer.preset;
export const getActivePreset = (store, id) =>
  store.gameStateReducer.activePreset === id;
export const getTrail = store => store.gameStateReducer.trail;

const gameStateReducer = (state: State = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_PLAY: {
      const { playing } = action.payload;
      if (state.currentFrame === 0 && state.direction === 'backwards') {
        return state;
      }
      const mode = playing ? 'playing' : 'drag-add';
      return {
        ...state,
        playing,
        mode,
        activePreset: null,
      };
    }
    case ACTIONS.TOGGLE_CELL: {
      return {
        ...state,
        playing: false,
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
        activePreset: null,
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
        activePreset: null,
      };
    }
    case ACTIONS.ACTIVATE_PRESET: {
      const { id, cells } = action.payload;
      return {
        ...state,
        activePreset: id,
        preset: cells,
        mode: 'insert-preset',
        playing: false,
      };
    }
    case ACTIONS.CHANGE_TRAIL: {
      const { trail } = action.payload;
      return {
        ...state,
        trail,
      };
    }
    default: {
      return state;
    }
  }
};

export default gameStateReducer;
