import { actionTypes } from './actionTypes';

export const setMobileMenuState = (payload) => ({
  type: actionTypes.SET_MOBILE_MENU_STATE,
  payload,
});

export const setMobileCategoriesState = (payload) => ({
  type: actionTypes.SET_MOBILE_CATEGORIES_STATE,
  payload,
});
