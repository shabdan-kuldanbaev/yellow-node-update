import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  works: [],
  project: {},
  error: {},
};

const handlers = {
  [actionTypes.LOAD_WORKS_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.LOAD_WORKS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    works: payload,
  }),
  [actionTypes.LOAD_WORKS_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
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
