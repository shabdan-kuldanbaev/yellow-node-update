import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isModelLoaded: true, // TODO false
  scrollOfAddedFooter: {},
};

const handlers = {
  [actionTypes.SET_MODEL_LOADING]: (state, { payload }) => ({ ...state, isModelLoaded: payload }),
  [actionTypes.SET_SCROLL_OF_ADDED_FOOTER]: (state, { payload }) => ({ ...state, scrollOfAddedFooter: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
