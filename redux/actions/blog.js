import { actionTypes } from './actionTypes';

export const findArticles = (payload) => ({
  type: actionTypes.FIND_ARTICLES_PENDING,
  payload,
});

export const clearFoundArticles = (payload) => ({
  type: actionTypes.CLEAR_FOUND_ARTICLES,
  payload,
});

export const clearSearchMessage = (payload) => ({
  type: actionTypes.CLEAR_SEARCH_MESSAGE,
  payload,
});
