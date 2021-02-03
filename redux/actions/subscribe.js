import { actionTypes } from './actionTypes';

export const subscribe = (payload) => ({
  type: actionTypes.SUBSCRIBE_PENDING,
  payload,
});

export const clearMessage = (payload) => ({
  type: actionTypes.CLEAR_MESSAGE,
  payload,
});

export const getSubscriber = (payload) => ({
  type: actionTypes.FETCH_SUBSCRIBER_PENDING,
  payload,
});

export const setIsSubscribed = (payload) => ({
  type: actionTypes.SET_IS_SUBSCRIBED,
  payload,
});
