import { actionTypes } from 'actions/actionTypes';

const initialState = {
  message: '',
  isContactsSent: false,
};

const handlers = {
  [actionTypes.SEND_EMAIL_PENDING]: (state) => ({ ...state }),
  [actionTypes.SEND_EMAIL_SUCCESS]: (state) => ({
    ...state,
    isContactsSent: true,
  }),
  [actionTypes.SEND_EMAIL_FAILED]: (state) => ({ ...state, isContactsSent: false }),
  [actionTypes.SET_IS_CONTACTS_SENT]: (state, { payload }) => ({ ...state, isContactsSent: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
