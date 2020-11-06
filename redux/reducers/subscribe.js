import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  error: {},
};

const handlers = {
  [actionTypes.SUBSCRIBE_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.SUBSCRIBE_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [actionTypes.SUBSCRIBE_FAILED]: (state, { payload }) => ({
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
