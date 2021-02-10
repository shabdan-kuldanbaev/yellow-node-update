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

export const fetchPage = (payload) => ({
  type: actionTypes.FETCH_PAGE_PENDING,
  payload,
});

export const fetchBlogData = (payload) => ({
  type: actionTypes.FETCH_BLOG_DATA_PENDING,
  payload,
});

export const pageReadyToDisplay = (payload) => ({
  type: actionTypes.PAGE_READY_TO_DISPLAY_PENDING,
  payload,
});
