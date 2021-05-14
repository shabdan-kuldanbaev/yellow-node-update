import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isFormDataSent: false,
  err: null,
};

const handlers = {
  [actionTypes.SEND_FORM_DATA_SUCCESS]: (state) => ({
    ...state,
    isFormDataSent: true,
    error: null,
  }),
  [actionTypes.SEND_FORM_DATA_FAILED]: (state, { payload }) => ({
    ...state,
    isFormDataSent: false,
    err: payload,
  }),
  [actionTypes.SET_IS_FORM_DATA_SENT]: (state, { payload }) => ({ ...state, isFormDataSent: payload }),
  [actionTypes.CLEAR_CONTACT_FORM_ERROR]: (state) => ({ ...state, err: null }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
