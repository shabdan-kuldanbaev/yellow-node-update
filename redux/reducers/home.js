import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isModelLoaded: true, // TODO false
  scrollOfAddedFooter: {},
  duck: null,
  isHomepageVisit: false,
};

const handlers = {
  [actionTypes.SET_MODEL_LOADING]: (state, { payload }) => ({ ...state, isModelLoaded: payload }),
  [actionTypes.SET_SCROLL_OF_ADDED_FOOTER]: (state, { payload }) => ({ ...state, scrollOfAddedFooter: payload }),
  [actionTypes.SET_DUCK]: (state, { payload }) => ({ ...state, duck: payload }),
  [actionTypes.SET_HOMEPAGE_VISIT]: (state, { payload }) => ({ ...state, isHomepageVisit: payload }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
