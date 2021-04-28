import { actionTypes } from 'actions/actionTypes';

const initialState = {
  project: {},
  error: {},
};

const handlers = {
  [actionTypes.GET_PROJECT_SUCCESS]: (state, { payload }) => ({
    ...state,
    project: payload,
  }),
  [actionTypes.GET_PROJECT_FAILED]: (state, { payload }) => ({
    ...state,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
