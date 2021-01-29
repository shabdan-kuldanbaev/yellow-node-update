import { actionTypes } from 'actions/actionTypes';
import { getDocumentFields } from 'utils/helper';

const initialState = {
  isLoading: false,
  team: {},
  error: {},
  whatMakesSpecial: {},
  photoGallery: {},
};

const handlers = {
  [actionTypes.FETCH_COMPANY_DATA_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.FETCH_COMPANY_DATA_SUCCESS]: (state, { payload }) => {
    const { managementTeamBlock, photoGalleryBlock, whatMakesSpecialBlock } = getDocumentFields(
      payload,
      ['managementTeamBlock', 'photoGalleryBlock', 'whatMakesSpecialBlock'],
    );

    return ({
      ...state,
      isLoading: false,
      whatMakesSpecial: whatMakesSpecialBlock,
      team: managementTeamBlock,
      photoGallery: photoGalleryBlock,
    });
  },
  [actionTypes.FETCH_COMPANY_DATA_FAILED]: (state, { payload }) => ({
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
