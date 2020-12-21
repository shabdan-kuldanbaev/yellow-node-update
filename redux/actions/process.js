import { actionTypes } from './actionTypes';

export const getJSON = (payload) => ({
  type: actionTypes.GET_JSON_PENDING,
  payload,
});
