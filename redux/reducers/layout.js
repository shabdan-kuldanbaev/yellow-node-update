import { actionTypes } from 'actions/actionTypes';

const initialState = {
  isMobileMenuOpened: false,
  isMobileCategotiesOpened: false,
  isMobileResolutions: null,
  isTabletResolutions: null,
  isPageLoading: false,
  isFullResolution: false,
};

const handlers = {
  [actionTypes.SET_MOBILE_MENU_STATE]: (state, { payload }) => ({ ...state, isMobileMenuOpened: payload }),
  [actionTypes.SET_MOBILE_CATEGORIES_STATE]: (state, { payload }) => ({ ...state, isMobileCategotiesOpened: payload }),
  [actionTypes.SET_MOBILE_RESOLUTION]: (state, { payload }) => ({ ...state, isMobileResolutions: payload }),
  [actionTypes.SET_TABLET_RESOLUTION]: (state, { payload }) => ({ ...state, isTabletResolutions: payload }),
  [actionTypes.SET_PAGE_LOADING]: (state, { payload }) => ({ ...state, isPageLoading: payload }),
  [actionTypes.SET_FULL_RESOLUTION]: (state, { payload }) => ({ ...state, isFullResolution: payload }),
  DEFAULT: (state) => state,
};

const layoutReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

export default layoutReducer;
