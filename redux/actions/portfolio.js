import { actionTypes } from './actionTypes';

export const getProject = (payload) => ({
  type: actionTypes.GET_PROJECT_PENDING,
  payload,
});
