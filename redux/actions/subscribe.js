import { actionTypes } from './actionTypes';

export const subscribe = (payload) => ({
  type: actionTypes.SUBSCRIBE_PENDING,
  payload,
});

export const blogSubscribe = (payload) => ({
  type: actionTypes.BLOG_SUBSCRIBE_START,
  payload,
});
