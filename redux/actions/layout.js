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

export const setFullResolution = (payload) => ({
  type: actionTypes.SET_FULL_RESOLUTION,
  payload,
});

export const fetchLayoutData = (payload) => ({
  type: actionTypes.SET_PAGE_READY_TO_DISPLAY_PENDING,
  payload,
});

export const setPageReadyToDisplay = (payload) => ({
  type: actionTypes.SET_PAGE_READY_TO_DISPLAY,
  payload,
});

export const setFirstPageLoaded = (payload) => ({
  type: actionTypes.SET_FIRST_PAGE_LOADED,
  payload,
});
