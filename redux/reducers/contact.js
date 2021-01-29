import { actionTypes } from 'actions/actionTypes';
import { getDocumentFields } from 'utils/helper';

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
  [actionTypes.FETCH_CONTACT_DATA_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.FETCH_CONTACT_DATA_SUCCESS]: (state, { payload }) => {
    const { peoplePhotoBlock, companyPhotoBlock } = getDocumentFields(
      payload,
      ['peoplePhotoBlock', 'companyPhotoBlock'],
    );

    return ({
      ...state,
      isLoading: false,
      officePhoto: companyPhotoBlock,
      companyPeoplePhoto: peoplePhotoBlock,
    });
  },
  [actionTypes.FETCH_CONTACT_DATA_FAILED]: (state, { payload }) => ({
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
