import { actionTypes } from './actionTypes';

export const setBlogStatus = (payload) => ({
  type: actionTypes.SET_BLOG_STATUS,
  payload,
});

export const setFirstVisit = (payload) => ({
  type: actionTypes.SET_FIRST_VISIT_OF_BLOG,
  payload,
});

export const findArticles = (payload) => ({
  type: actionTypes.FIND_ARTICLES_PENDING,
  payload,
});

export const clearFoundArticles = (payload) => ({
  type: actionTypes.CLEAR_FOUND_ARTICLES,
  payload,
});
