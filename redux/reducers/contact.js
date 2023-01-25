import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isFormDataSent: false,
  error: null,
  isPending: false,
};

const handlers = {
  [actionTypes.SEND_FORM_DATA_PENDING]: (state) => ({
    ...state,
    isPending: true,
    error: null,
    isFormDataSent: false,
  }),
  [actionTypes.SEND_FORM_DATA_SUCCESS]: (state) => ({
    ...state,
    isFormDataSent: true,
    error: null,
    isPending: false,
  }),
  [actionTypes.SEND_FORM_DATA_FAILED]: (state, { payload }) => ({
    ...state,
    isFormDataSent: false,
    error: payload,
    isPending: false,
  }),
  [actionTypes.SET_IS_FORM_DATA_SENT]: (state, { payload }) => ({ ...state, isFormDataSent: payload }),
  [actionTypes.CLEAR_CONTACT_FORM_ERROR]: (state) => ({ ...state, error: null }),
  DEFAULT: (state) => state,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
