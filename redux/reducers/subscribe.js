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
  DEFAULT: (state) => state,
};

const subscribeReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};

export default subscribeReducer;
