import { actionTypes } from './actionTypes';

export const setMobileMenuState = (payload) => ({
  type: actionTypes.SET_MOBILE_MENU_STATE,
  payload,
});

export const setMobileCategoriesState = (payload) => ({
  type: actionTypes.SET_MOBILE_CATEGORIES_STATE,
  payload,
});

export const setMobileResolutions = (payload) => ({
  type: actionTypes.SET_MOBILE_RESOLUTION,
  payload,
});

export const setTabletResolutions = (payload) => ({
  type: actionTypes.SET_TABLET_RESOLUTION,
  payload,
});

export const setPageLoading = (payload) => ({
  type: actionTypes.SET_PAGE_LOADING,
  payload,
});

export const setFullResolution = (payload) => ({
  type: actionTypes.SET_FULL_RESOLUTION,
  payload,
});
