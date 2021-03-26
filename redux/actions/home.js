import { actionTypes } from './actionTypes';

export const setScrollOfAddedFooter = (payload) => ({
  type: actionTypes.SET_SCROLL_OF_ADDED_FOOTER,
  payload,
});

export const fetchDuck = () => ({
  type: actionTypes.SET_DUCK_PENDING,
});
