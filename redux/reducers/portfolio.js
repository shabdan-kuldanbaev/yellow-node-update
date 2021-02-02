import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  project: {},
  error: {},
};

const handlers = {
  [actionTypes.GET_PROJECT_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.GET_PROJECT_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    project: payload,
  }),
  [actionTypes.GET_PROJECT_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
