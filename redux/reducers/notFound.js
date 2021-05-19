import { actionTypes } from 'actions/actionTypes';

const initialState = {
  animation: null,
  error: {},
};

const handlers = {
  [actionTypes.GET_JSON_NOT_FOUND_SUCCESS]: (state, { payload }) => ({
    ...state,
    animation: payload,
  }),
  [actionTypes.GET_JSON_NOT_FOUND_FAILED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
