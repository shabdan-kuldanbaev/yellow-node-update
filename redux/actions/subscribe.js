import { actionTypes } from './actionTypes';

export const subscribe = (payload) => ({
  type: actionTypes.SUBSCRIBE_PENDING,
  payload,
});

export const clearMessage = (payload) => ({
  type: actionTypes.CLEAR_MESSAGE,
  payload,
});
