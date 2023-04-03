import { useReducer } from 'react';

const reducer = (stateHandler) => (state) => {
  if (typeof stateHandler === 'function') {
    stateHandler(!state);
  }

  return !state;
};

function useToggle(initialState, stateHandler) {
  const [isEnabled, toggle] = useReducer(reducer(stateHandler), !!initialState);

  return [isEnabled, toggle];
}

export default useToggle;
