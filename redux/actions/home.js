import { actionTypes } from './actionTypes';

export const setModelLoading = (payload) => ({
  type: actionTypes.SET_MODEL_LOADING,
  payload,
});

export const setScrollOfAddedFooter = (payload) => ({
  type: actionTypes.SET_SCROLL_OF_ADDED_FOOTER,
  payload,
});
