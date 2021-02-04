import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  message: '',
  isSubscribed: false,
  error: null,
};

const handlers = {
  [actionTypes.SUBSCRIBE_PENDING]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [actionTypes.SUBSCRIBE_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    message: payload,
  }),
  [actionTypes.SUBSCRIBE_FAILED]: (state, { payload: { data } }) => ({
    ...state,
    isLoading: false,
    message: data,
    error: true,
  }),
  [actionTypes.CLEAR_MESSAGE]: (state) => ({
    ...state,
    message: '',
  }),
  [actionTypes.SET_IS_SUBSCRIBED]: (state, { payload }) => ({ ...state, isSubscribed: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
