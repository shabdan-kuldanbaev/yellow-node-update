import { actionTypes } from 'actions/actionTypes';

const initialState = {
  scrollOfAddedFooter: {},
  duck: null,
  isDuckLoaded: false,
  isHomepageVisit: false,
  isFirstHomepageVisit: false,
};

const handlers = {
  [actionTypes.SET_SCROLL_OF_ADDED_FOOTER]: (state, { payload }) => ({ ...state, scrollOfAddedFooter: payload }),
  [actionTypes.SET_DUCK]: (state, { payload }) => ({ ...state, duck: payload, isDuckLoaded: !!payload }),
  [actionTypes.SET_DUCK_PENDING]: (state) => ({ ...state, isDuckLoaded: false }),
  DEFAULT: (state) => state,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
