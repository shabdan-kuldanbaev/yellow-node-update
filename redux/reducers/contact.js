import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  message: '',
  isContactsSent: false,
};

const handlers = {
  [actionTypes.SEND_EMAIL_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.SEND_EMAIL_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
    isContactsSent: true,
  }),
  [actionTypes.SEND_EMAIL_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.SET_IS_CONTACTS_SENT]: (state, { payload }) => ({ ...state, isContactsSent: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
