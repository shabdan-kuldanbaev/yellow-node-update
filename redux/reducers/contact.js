import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isLoading: false,
  error: {},
  companyPeoplePhoto: {},
  officePhoto: {},
};

const handlers = {
  [actionTypes.SEND_EMAIL_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.SEND_EMAIL_SUCCESS]: (state) => ({
    ...state,
    isLoading: false,
  }),
  [actionTypes.SEND_EMAIL_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    companyPeoplePhoto: payload,
  }),
  [actionTypes.LOAD_COMPANY_PEOPLE_PHOTO_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.LOAD_OFFICE_PHOTO_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.LOAD_OFFICE_PHOTO_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    officePhoto: payload,
  }),
  [actionTypes.LOAD_OFFICE_PHOTO_FAILED]: (state, { payload }) => ({
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
