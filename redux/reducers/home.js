import { actionTypes } from 'actions/actionTypes';
import { getDocumentFields } from 'utils/helper';

const initialState = {
  scrollOfAddedFooter: {},
  duck: null,
  isHomepageVisit: false,
  isFirstHomepageVisit: false,
  photos: null,
  portfolio: null,
  isLoading: false,
  error: null,
};

const handlers = {
  [actionTypes.SET_SCROLL_OF_ADDED_FOOTER]: (state, { payload }) => ({ ...state, scrollOfAddedFooter: payload }),
  [actionTypes.SET_DUCK]: (state, { payload }) => ({ ...state, duck: payload }),
  [actionTypes.SET_HOMEPAGE_VISIT]: (state, { payload }) => ({ ...state, isHomepageVisit: payload }),
  [actionTypes.SET_FIRST_HOMEPAGE_VISIT]: (state, { payload }) => ({ ...state, isFirstHomepageVisit: payload }),
  [actionTypes.LOAD_PHOTOS_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.LOAD_PHOTOS_SUCCESS]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    photos: payload,
  }),
  [actionTypes.LOAD_PHOTOS_FAILED]: (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
  [actionTypes.FETCH_HOMEPAGE_DATA_PENDING]: (state) => ({ ...state, isLoading: true }),
  [actionTypes.FETCH_HOMEPAGE_DATA_SUCCESS]: (state, { payload }) => {
    const { portfolioBlock, photoGalleryBlock } = getDocumentFields(
      payload,
      ['portfolioBlock', 'photoGalleryBlock'],
    );

    return ({
      ...state,
      isLoading: false,
      photos: photoGalleryBlock,
      portfolio: portfolioBlock,
    });
  },
  [actionTypes.FETCH_HOMEPAGE_DATA_FAILED]: (state, { payload }) => ({
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
