import { actionTypes } from 'actions/actionTypes';

const initialState = {
  scrollOfAddedFooter: {},
  duck: null,
  err: null,
};

const handlers = {
  [actionTypes.SET_SCROLL_OF_ADDED_FOOTER]: (state, { payload }) => ({ ...state, scrollOfAddedFooter: payload }),
  [actionTypes.SET_DUCK_PENDING]: (state) => ({ ...state }),
  [actionTypes.SET_DUCK_SUCCESS]: (state, { payload }) => ({ ...state, duck: payload }),
  [actionTypes.SET_DUCK_FAILED]: (state, { payload }) => ({ ...state, err: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
