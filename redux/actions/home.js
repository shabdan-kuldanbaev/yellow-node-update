import { actionTypes } from './actionTypes';

export const setScrollOfAddedFooter = (payload) => ({
  type: actionTypes.SET_SCROLL_OF_ADDED_FOOTER,
  payload,
});

export const setHomepageVisit = (payload) => ({
  type: actionTypes.SET_HOMEPAGE_VISIT,
  payload,
});

export const setFirstHomepageVisit = (payload) => ({
  type: actionTypes.SET_FIRST_HOMEPAGE_VISIT,
  payload,
});
