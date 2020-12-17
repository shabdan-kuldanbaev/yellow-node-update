import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  status: false,
  error: null,
};

const handlers = {
  [actionTypes.SUBSCRIBE_PENDING]: (state) => ({
    ...state,
    isLoading: true,
    status: false,
  }),
  [actionTypes.SUBSCRIBE_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
    status: true,
  }),
  [actionTypes.SUBSCRIBE_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: true,
  }),
  [actionTypes.BLOG_SUBSCRIBE_START]: (state) => ({ ...state, status: false }),
  [actionTypes.BLOG_SUBSCRIBE_SUCCESS]: (state) => ({ ...state, status: true }),
  [actionTypes.BLOG_SUBSCRIBE_ERROR]: (state) => ({ ...state, error: true }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
