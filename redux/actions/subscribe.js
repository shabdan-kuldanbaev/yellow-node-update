import { actionTypes } from './actionTypes';

export const subscribe = (payload) => ({
  type: actionTypes.SUBSCRIBE_PENDING,
  payload,
});
