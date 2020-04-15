import { actionTypes } from './actionTypes';

export const getPost = payload => ({
  type: actionTypes.GET_POST_PENDING,
  payload,
});

export const loadPosts = payload => ({
  type: actionTypes.LOAD_POSTS_PENDING,
  payload,
});

export const setTotalCount = payload => ({
  type: actionTypes.SET_TOTAL_POSTS_COUNT,
  payload,
});

export const setLimit = payload => ({
  type: actionTypes.SET_LIMIT,
  payload,
});
