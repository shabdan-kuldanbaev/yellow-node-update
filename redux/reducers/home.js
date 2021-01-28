import { actionTypes } from 'actions/actionTypes';

const initialState = {
  scrollOfAddedFooter: {},
  duck: null,
  isHomepageVisit: false,
  isFirstHomepageVisit: false,
  photos: null,
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
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
