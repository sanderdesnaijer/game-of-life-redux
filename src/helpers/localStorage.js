const storageKey = 'game-of-life-state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageKey, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
