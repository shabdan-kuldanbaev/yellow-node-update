import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isFormDataSent: false,
  err: '',
};

const handlers = {
  [actionTypes.SEND_FORM_DATA_SUCCESS]: (state) => ({
    ...state,
    isFormDataSent: true,
    err: '',
  }),
  [actionTypes.SEND_FORM_DATA_FAILED]: (state, { payload }) => ({
    ...state,
    isFormDataSent: true,
    err: payload,
  }),
  [actionTypes.SET_IS_FORM_DATA_SENT]: (state, { payload }) => ({
    ...state,
    isFormDataSent: payload,
    err: '',
  }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
