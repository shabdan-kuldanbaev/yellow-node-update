import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isFormDataSent: false,
};

const handlers = {
  [actionTypes.SEND_FORM_DATA_SUCCESS]: (state) => ({
    ...state,
    isFormDataSent: true,
  }),
  [actionTypes.SEND_FORM_DATA_FAILED]: (state) => ({ ...state, isFormDataSent: false }),
  [actionTypes.SET_IS_FORM_DATA_SENT]: (state, { payload }) => ({ ...state, isFormDataSent: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
